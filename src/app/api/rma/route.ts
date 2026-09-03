import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export async function GET() {
  try {
    const returns = await query(`
      SELECT r.*, o.order_number, o.created_at as order_date
      FROM returns_rma r
      JOIN orders o ON r.order_id = o.id
      ORDER BY r.id DESC
    `);
    return NextResponse.json({ success: true, returns });
  } catch (error: any) {
    console.error('API RMA GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, customer_name, customer_email, reason, items, refund_amount, refund_method } = body;

    const rmaNumber = `RMA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    await query(
      `INSERT INTO returns_rma (
        rma_number, order_id, customer_name, customer_email, status,
        reason, items_json, refund_amount, refund_method
      ) VALUES (?, ?, ?, ?, 'requested', ?, ?, ?, ?)`,
      [
        rmaNumber,
        order_id,
        customer_name || 'Client',
        customer_email || 'client@lumio.com',
        reason || 'Customer return request',
        JSON.stringify(items || []),
        Number(refund_amount) || 0,
        refund_method || 'original_payment',
      ]
    );

    return NextResponse.json({ success: true, rma_number: rmaNumber });
  } catch (error: any) {
    console.error('API RMA POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, restock_confirmed, notes } = body;

    const rma = await queryRow(`SELECT * FROM returns_rma WHERE id = ?`, [id]);
    if (!rma) {
      return NextResponse.json({ success: false, error: 'RMA record not found' }, { status: 404 });
    }

    await query(
      `UPDATE returns_rma
       SET status = ?, restock_confirmed = ?, notes = ?
       WHERE id = ?`,
      [status, restock_confirmed ? 1 : 0, notes || rma.notes, id]
    );

    // If restock is confirmed, add items back to inventory warehouse 1
    if (restock_confirmed && !rma.restock_confirmed) {
      try {
        const items = typeof rma.items_json === 'string' ? JSON.parse(rma.items_json) : rma.items_json;
        if (Array.isArray(items)) {
          for (const item of items) {
            if (item.product_id) {
              await query(
                `UPDATE inventory_stocks
                 SET quantity_on_hand = quantity_on_hand + ?
                 WHERE product_id = ? AND warehouse_id = 1`,
                [Number(item.qty) || 1, item.product_id]
              );
            }
          }
        }
      } catch (e) {
        console.error('Failed to parse RMA items for restock:', e);
      }
    }

    return NextResponse.json({ success: true, message: 'RMA updated successfully' });
  } catch (error: any) {
    console.error('API RMA PATCH Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
