import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrNum = params.id;
    const isNum = !isNaN(Number(idOrNum));

    const order = await queryRow(
      `SELECT o.*, d.name as driver_name, d.phone as driver_phone, d.vehicle_plate, d.vehicle_type,
              d.current_lat as driver_lat, d.current_lng as driver_lng, d.speed_kmh, d.battery_percent,
              w.name as warehouse_name, w.city as warehouse_city
       FROM orders o
       LEFT JOIN drivers d ON o.assigned_driver_id = d.id
       LEFT JOIN warehouses w ON o.warehouse_id = w.id
       WHERE ${isNum ? 'o.id = ? OR o.order_number = ?' : 'o.order_number = ?'}`,
      isNum ? [Number(idOrNum), idOrNum] : [idOrNum]
    );

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const items = await query(`SELECT * FROM order_items WHERE order_id = ?`, [order.id]);
    const timeline = await query(
      `SELECT * FROM order_timeline WHERE order_id = ? ORDER BY created_at ASC`,
      [order.id]
    );
    const task = await queryRow(
      `SELECT * FROM delivery_tasks WHERE order_id = ? ORDER BY id DESC LIMIT 1`,
      [order.id]
    );

    try {
      order.shipping_address = typeof order.shipping_address_json === 'string'
        ? JSON.parse(order.shipping_address_json)
        : order.shipping_address_json;
    } catch (e) {
      order.shipping_address = {};
    }

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        items,
        timeline,
        delivery_task: task,
      },
    });
  } catch (error: any) {
    console.error('API Order Detail Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrNum = params.id;
    const isNum = !isNaN(Number(idOrNum));
    const body = await request.json();
    const { status, payment_status, assigned_driver_id, timeline_title, timeline_desc } = body;

    const order = await queryRow(
      `SELECT id, order_number FROM orders WHERE ${isNum ? 'id = ? OR order_number = ?' : 'order_number = ?'}`,
      isNum ? [Number(idOrNum), idOrNum] : [idOrNum]
    );

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    let updates: string[] = [];
    let sqlParams: any[] = [];

    if (status) {
      updates.push('status = ?');
      sqlParams.push(status);
    }
    if (payment_status) {
      updates.push('payment_status = ?');
      sqlParams.push(payment_status);
    }
    if (assigned_driver_id !== undefined) {
      updates.push('assigned_driver_id = ?');
      sqlParams.push(assigned_driver_id || null);

      // If assigning driver, update delivery_tasks driver_id
      if (assigned_driver_id) {
        await query(`UPDATE delivery_tasks SET driver_id = ? WHERE order_id = ?`, [assigned_driver_id, order.id]);
        await query(`UPDATE drivers SET active_order_id = ?, status = 'on_delivery' WHERE id = ?`, [order.id, assigned_driver_id]);
      }
    }

    if (updates.length > 0) {
      sqlParams.push(order.id);
      await query(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`, sqlParams);
    }

    // Add timeline log if title is provided
    if (timeline_title) {
      await query(
        `INSERT INTO order_timeline (order_id, status, title, description, created_by)
         VALUES (?, ?, ?, ?, 'OMS Dispatcher')`,
        [order.id, status || 'updated', timeline_title, timeline_desc || 'Status updated by administrator.']
      );
    }

    return NextResponse.json({ success: true, message: 'Order updated successfully' });
  } catch (error: any) {
    console.error('API Order PATCH Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
