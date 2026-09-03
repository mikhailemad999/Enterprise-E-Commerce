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
