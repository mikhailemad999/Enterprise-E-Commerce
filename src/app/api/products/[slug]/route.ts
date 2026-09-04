import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const product = await queryRow(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ? OR p.id = ?`,
      [slug, isNaN(Number(slug)) ? -1 : Number(slug)]
    );

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // Warehouse stock breakdown
    const warehouseStock = await query(
      `SELECT inv.*, w.name as warehouse_name, w.code as warehouse_code, w.city as warehouse_city
       FROM inventory_stocks inv
       JOIN warehouses w ON inv.warehouse_id = w.id
       WHERE inv.product_id = ?`,
      [product.id]
    );

    // Reviews
    const reviews = await query(
      `SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC`,
      [product.id]
    );

    let images: string[] = [];
    try {
      images = typeof product.images_json === 'string' ? JSON.parse(product.images_json) : (product.images_json || []);
    } catch (e) {
      images = [];
    }

    let attributes: Record<string, any> = {};
    try {
      attributes = typeof product.attributes_json === 'string' ? JSON.parse(product.attributes_json) : (product.attributes_json || {});
    } catch (e) {
      attributes = {};
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        images,
        image: images[0] || '',
        attributes,
        price: Number(product.price),
        compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : null,
        warehouseStock,
        reviews,
      },
    });
  } catch (error: any) {
    console.error('API Single Product Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const existing = await queryRow(
      `SELECT id, name FROM products WHERE slug = ? OR id = ?`,
      [slug, isNaN(Number(slug)) ? -1 : Number(slug)]
    );

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const body = await request.json();
    const updates: string[] = [];
    const updateParams: any[] = [];

    if (body.price !== undefined) {
      updates.push('price = ?');
      updateParams.push(Number(body.price));
    }
    if (body.compare_at_price !== undefined) {
      updates.push('compare_at_price = ?');
      updateParams.push(body.compare_at_price === null || body.compare_at_price === '' ? null : Number(body.compare_at_price));
    }
    if (body.cost_price !== undefined) {
      updates.push('cost_price = ?');
      updateParams.push(body.cost_price === null || body.cost_price === '' ? null : Number(body.cost_price));
    }
    if (body.name !== undefined) {
      updates.push('name = ?');
      updateParams.push(body.name.trim());
    }
    if (body.sku !== undefined) {
      updates.push('sku = ?');
      updateParams.push(body.sku.trim().toUpperCase());
    }
    if (body.category_id !== undefined) {
      updates.push('category_id = ?');
      updateParams.push(Number(body.category_id));
    }
    if (body.material !== undefined) {
      updates.push('material = ?');
      updateParams.push(body.material);
    }
    if (body.dimensions !== undefined) {
      updates.push('dimensions = ?');
      updateParams.push(body.dimensions);
    }
    if (body.weight_kg !== undefined) {
      updates.push('weight_kg = ?');
      updateParams.push(Number(body.weight_kg));
    }
    if (body.short_description !== undefined) {
      updates.push('short_description = ?');
      updateParams.push(body.short_description);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      updateParams.push(body.description);
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?');
      updateParams.push(body.is_active ? 1 : 0);
    }
    if (body.is_featured !== undefined) {
      updates.push('is_featured = ?');
      updateParams.push(body.is_featured ? 1 : 0);
    }
    if (body.images !== undefined) {
      const imagesArray = Array.isArray(body.images) ? body.images.filter(Boolean) : [body.images].filter(Boolean);
      updates.push('images_json = ?');
      updateParams.push(JSON.stringify(imagesArray));
    }

    if (updates.length > 0) {
      updateParams.push(existing.id);
      await query(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`, updateParams);
    }

    const updated = await queryRow(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [existing.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      product: updated,
    });
  } catch (error: any) {
    console.error('API Products Slug PUT Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: { slug: string } }
) {
  return PUT(request, context);
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const product = await queryRow(
      `SELECT id, name FROM products WHERE slug = ? OR id = ?`,
      [slug, isNaN(Number(slug)) ? -1 : Number(slug)]
    );

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    // Check order references
    let hasOrders = false;
    try {
      const orderRefs = await query<any[]>('SELECT count(*) as count FROM order_items WHERE product_id = ?', [product.id]);
      hasOrders = orderRefs[0]?.count > 0;
    } catch (e) {}

    if (hasOrders) {
      await query('UPDATE products SET is_active = FALSE WHERE id = ?', [product.id]);
      return NextResponse.json({
        success: true,
        action: 'archived',
        message: `Product "${product.name}" has client order references. Deactivated and archived from active catalog.`,
      });
    } else {
      await query('DELETE FROM inventory_stocks WHERE product_id = ?', [product.id]);
      await query('DELETE FROM product_variants WHERE product_id = ?', [product.id]);
      try {
        await query('DELETE FROM reviews WHERE product_id = ?', [product.id]);
      } catch (e) {}
      await query('DELETE FROM products WHERE id = ?', [product.id]);

      return NextResponse.json({
        success: true,
        action: 'deleted',
        message: `Product "${product.name}" permanently deleted.`,
      });
    }
  } catch (error: any) {
    console.error('API Products Slug DELETE Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

