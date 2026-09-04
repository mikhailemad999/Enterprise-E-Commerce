import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || searchParams.get('cat');
    const search = searchParams.get('search') || searchParams.get('q');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort');
    const includeInactive = searchParams.get('include_inactive') === 'true' || searchParams.get('all') === 'true';

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug,
        COALESCE(SUM(inv.quantity_on_hand), 0) as total_stock,
        COALESCE(SUM(inv.quantity_available), 0) as total_available
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory_stocks inv ON p.id = inv.product_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (!includeInactive) {
      sql += ` AND p.is_active = TRUE`;
    }

    if (category) {
      sql += ` AND (c.slug = ? OR c.name LIKE ?)`;
      params.push(category, `%${category}%`);
    }

    if (search) {
      sql += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.material LIKE ? OR p.sku LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    if (featured === 'true' || featured === '1') {
      sql += ` AND p.is_featured = TRUE`;
    }

    sql += ` GROUP BY p.id`;

    if (sort === 'price_asc') {
      sql += ` ORDER BY p.price ASC`;
    } else if (sort === 'price_desc') {
      sql += ` ORDER BY p.price DESC`;
    } else if (sort === 'rating') {
      sql += ` ORDER BY p.rating DESC`;
    } else {
      sql += ` ORDER BY p.id ASC`;
    }

    const products = await query<any[]>(sql, params);

    // Format images safely
    const formatted = products.map((p) => {
      let images: string[] = [];
      try {
        images = typeof p.images_json === 'string' ? JSON.parse(p.images_json) : (p.images_json || []);
      } catch (e) {
        images = [];
      }
      return {
        ...p,
        images,
        image: images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        price: Number(p.price),
        compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : null,
        cost_price: p.cost_price ? Number(p.cost_price) : null,
        is_active: Boolean(p.is_active),
        is_featured: Boolean(p.is_featured),
      };
    });

    return NextResponse.json({ success: true, products: formatted });
  } catch (error: any) {
    console.error('API Products GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug: customSlug,
      sku: customSku,
      category_id,
      price,
      compare_at_price,
      cost_price,
      brand,
      material,
      dimensions,
      weight_kg,
      short_description,
      description,
      images,
      attributes,
      is_active,
      is_featured,
      initial_stocks, // object: { [warehouse_id]: quantity } or number
    } = body;

    if (!name || price === undefined || price === null || !category_id) {
      return NextResponse.json(
        { success: false, error: 'Name, Category, and Price are required fields.' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    let slug = customSlug
      ? customSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check slug uniqueness
    const existingSlug = await queryRow('SELECT id FROM products WHERE slug = ?', [slug]);
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Auto-generate SKU if not provided
    const sku = customSku
      ? customSku.trim().toUpperCase()
      : `LUM-${Date.now().toString().slice(-6)}`;

    // Format images JSON
    const imagesArray = Array.isArray(images)
      ? images.filter(Boolean)
      : typeof images === 'string' && images.trim().length > 0
      ? [images.trim()]
      : ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'];

    const imagesJson = JSON.stringify(imagesArray);
    const attributesJson = JSON.stringify(attributes || {});

    const insertResult: any = await query(
      `INSERT INTO products (
        name, slug, sku, short_description, description, price, compare_at_price,
        cost_price, category_id, brand, material, dimensions, weight_kg,
        is_active, is_featured, images_json, attributes_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        slug,
        sku,
        short_description || null,
        description || null,
        Number(price),
        compare_at_price ? Number(compare_at_price) : null,
        cost_price ? Number(cost_price) : null,
        Number(category_id),
        brand || 'Lumio Ateliers',
        material || null,
        dimensions || null,
        weight_kg ? Number(weight_kg) : 0.0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        is_featured ? 1 : 0,
        imagesJson,
        attributesJson,
      ]
    );

    const productId = insertResult.insertId;

    // Seed inventory_stocks for existing warehouses
    const warehouses = await query<any[]>('SELECT id FROM warehouses');
    for (const wh of warehouses) {
      let qty = 0;
      if (typeof initial_stocks === 'object' && initial_stocks !== null) {
        qty = Number(initial_stocks[wh.id]) || 0;
      } else if (typeof initial_stocks === 'number') {
        qty = initial_stocks;
      } else {
        qty = 5; // Default safe stock per warehouse
      }

      await query(
        `INSERT INTO inventory_stocks (product_id, warehouse_id, quantity_on_hand, quantity_reserved)
         VALUES (?, ?, ?, 0)
         ON DUPLICATE KEY UPDATE quantity_on_hand = VALUES(quantity_on_hand)`,
        [productId, wh.id, qty]
      );
    }

    const newProduct = await queryRow(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [productId]
    );

    return NextResponse.json({
      success: true,
      message: 'Product created successfully and allocated to regional warehouses.',
      product: {
        ...newProduct,
        price: Number(newProduct.price),
        compare_at_price: newProduct.compare_at_price ? Number(newProduct.compare_at_price) : null,
        images: imagesArray,
        image: imagesArray[0],
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('API Products POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required for update.' }, { status: 400 });
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (body.name !== undefined) {
      updates.push('name = ?');
      params.push(body.name.trim());
    }
    if (body.price !== undefined) {
      updates.push('price = ?');
      params.push(Number(body.price));
    }
    if (body.compare_at_price !== undefined) {
      updates.push('compare_at_price = ?');
      params.push(body.compare_at_price === null || body.compare_at_price === '' ? null : Number(body.compare_at_price));
    }
    if (body.cost_price !== undefined) {
      updates.push('cost_price = ?');
      params.push(body.cost_price === null || body.cost_price === '' ? null : Number(body.cost_price));
    }
    if (body.category_id !== undefined) {
      updates.push('category_id = ?');
      params.push(Number(body.category_id));
    }
    if (body.sku !== undefined) {
      updates.push('sku = ?');
      params.push(body.sku.trim().toUpperCase());
    }
    if (body.material !== undefined) {
      updates.push('material = ?');
      params.push(body.material);
    }
    if (body.dimensions !== undefined) {
      updates.push('dimensions = ?');
      params.push(body.dimensions);
    }
    if (body.weight_kg !== undefined) {
      updates.push('weight_kg = ?');
      params.push(Number(body.weight_kg));
    }
    if (body.brand !== undefined) {
      updates.push('brand = ?');
      params.push(body.brand);
    }
    if (body.short_description !== undefined) {
      updates.push('short_description = ?');
      params.push(body.short_description);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      params.push(body.description);
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(body.is_active ? 1 : 0);
    }
    if (body.is_featured !== undefined) {
      updates.push('is_featured = ?');
      params.push(body.is_featured ? 1 : 0);
    }
    if (body.images !== undefined) {
      const imagesArray = Array.isArray(body.images)
        ? body.images.filter(Boolean)
        : [body.images].filter(Boolean);
      updates.push('images_json = ?');
      params.push(JSON.stringify(imagesArray));
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields provided for update.' }, { status: 400 });
    }

    params.push(Number(id));
    await query(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`, params);

    const updated = await queryRow(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [Number(id)]
    );

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      product: updated,
    });
  } catch (error: any) {
    console.error('API Products PUT Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  return PUT(request);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch (e) {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required for deletion.' }, { status: 400 });
    }

    const productId = Number(id);

    // Check if product exists
    const product = await queryRow('SELECT id, name FROM products WHERE id = ?', [productId]);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    // Check if product is referenced in order_items
    let hasOrders = false;
    try {
      const orderRefs = await query<any[]>('SELECT count(*) as count FROM order_items WHERE product_id = ?', [productId]);
      hasOrders = orderRefs[0]?.count > 0;
    } catch (e) {
      // If order_items doesn't exist or errors, continue
    }

    if (hasOrders) {
      // Soft-delete / Archive to protect historical financial integrity
      await query('UPDATE products SET is_active = FALSE WHERE id = ?', [productId]);
      return NextResponse.json({
        success: true,
        action: 'archived',
        message: `Product "${product.name}" has associated client orders. It has been deactivated and archived from the public catalog without breaking order history.`,
      });
    } else {
      // Safe to permanently delete
      await query('DELETE FROM inventory_stocks WHERE product_id = ?', [productId]);
      await query('DELETE FROM product_variants WHERE product_id = ?', [productId]);
      try {
        await query('DELETE FROM reviews WHERE product_id = ?', [productId]);
      } catch (e) {}
      await query('DELETE FROM products WHERE id = ?', [productId]);

      return NextResponse.json({
        success: true,
        action: 'deleted',
        message: `Product "${product.name}" has been permanently removed from the catalog and inventory matrix.`,
      });
    }
  } catch (error: any) {
    console.error('API Products DELETE Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

