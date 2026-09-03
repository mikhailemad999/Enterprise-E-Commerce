import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const warehouses = await query(`SELECT * FROM warehouses ORDER BY id ASC`);
    const stocks = await query(`
      SELECT inv.*, p.name as product_name, p.sku as product_sku, p.price, p.material,
             w.name as warehouse_name, w.code as warehouse_code
      FROM inventory_stocks inv
      JOIN products p ON inv.product_id = p.id
      JOIN warehouses w ON inv.warehouse_id = w.id
      ORDER BY p.id ASC, inv.warehouse_id ASC
    `);

    const transfers = await query(`
      SELECT st.*, sw.name as source_name, tw.name as target_name
      FROM stock_transfers st
      JOIN warehouses sw ON st.source_warehouse_id = sw.id
      JOIN warehouses tw ON st.target_warehouse_id = tw.id
      ORDER BY st.id DESC
      LIMIT 10
    `);

    return NextResponse.json({
      success: true,
      warehouses,
      stocks,
      transfers,
    });
  } catch (error: any) {
    console.error('API Inventory GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, source_warehouse_id, target_warehouse_id, product_id, quantity, notes } = body;

    if (action === 'transfer') {
      const transferNumber = `TRF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      // Deduct from source warehouse
      await query(
        `UPDATE inventory_stocks
         SET quantity_on_hand = GREATEST(0, quantity_on_hand - ?)
         WHERE product_id = ? AND warehouse_id = ?`,
        [Number(quantity), product_id, source_warehouse_id]
      );

      // Add to target warehouse (insert if not exists)
      await query(
        `INSERT INTO inventory_stocks (product_id, warehouse_id, quantity_on_hand)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity_on_hand = quantity_on_hand + ?`,
        [product_id, target_warehouse_id, Number(quantity), Number(quantity)]
      );

      // Record transfer log
      await query(
        `INSERT INTO stock_transfers (transfer_number, source_warehouse_id, target_warehouse_id, status, items_json, notes)
         VALUES (?, ?, ?, 'completed', ?, ?)`,
        [
          transferNumber,
          source_warehouse_id,
          target_warehouse_id,
          JSON.stringify([{ product_id, quantity }]),
          notes || 'Internal stock replenishment between regional fulfillment hubs.',
        ]
      );

      return NextResponse.json({ success: true, message: 'Stock transfer completed', transfer_number: transferNumber });
    }

    if (action === 'adjust') {
      await query(
        `UPDATE inventory_stocks
         SET quantity_on_hand = ?
         WHERE product_id = ? AND warehouse_id = ?`,
        [Number(quantity), product_id, source_warehouse_id]
      );
      return NextResponse.json({ success: true, message: 'Stock adjusted successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('API Inventory POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
