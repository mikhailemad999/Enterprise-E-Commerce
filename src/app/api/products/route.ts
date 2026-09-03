import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || searchParams.get('cat');
    const search = searchParams.get('search') || searchParams.get('q');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort');

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug,
        COALESCE(SUM(inv.quantity_on_hand), 0) as total_stock,
        COALESCE(SUM(inv.quantity_available), 0) as total_available
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory_stocks inv ON p.id = inv.product_id
      WHERE p.is_active = TRUE
    `;
    const params: any[] = [];

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
      };
    });

    return NextResponse.json({ success: true, products: formatted });
  } catch (error: any) {
    console.error('API Products Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
