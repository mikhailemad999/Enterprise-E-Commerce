import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const drivers = await query(`
      SELECT d.*, o.order_number, o.total_amount as active_order_total
      FROM drivers d
      LEFT JOIN orders o ON d.active_order_id = o.id
      ORDER BY d.id ASC
    `);

    const unassignedOrders = await query(`
      SELECT o.*,
             (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as item_count
      FROM orders o
      WHERE o.assigned_driver_id IS NULL AND o.status IN ('confirmed', 'processing', 'ready_for_dispatch')
      ORDER BY o.id ASC
    `);

    const activeDeliveries = await query(`
      SELECT dt.*, d.name as driver_name, d.phone as driver_phone, d.vehicle_plate,
             o.order_number, o.total_amount, o.status as order_status
      FROM delivery_tasks dt
      JOIN drivers d ON dt.driver_id = d.id
      JOIN orders o ON dt.order_id = o.id
      WHERE dt.status IN ('pending', 'accepted', 'in_transit', 'arrived')
      ORDER BY dt.route_order ASC
    `);

    return NextResponse.json({
      success: true,
      drivers,
      unassignedOrders,
      activeDeliveries,
    });
  } catch (error: any) {
    console.error('API Dispatch GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, driver_id } = body;

    const driver = await query(`SELECT name, phone, vehicle_plate FROM drivers WHERE id = ?`, [driver_id]);
    const driverName = driver[0]?.name || 'Courier';

    // Update order
    await query(
      `UPDATE orders
       SET assigned_driver_id = ?, status = 'out_for_delivery'
       WHERE id = ?`,
      [driver_id, order_id]
    );

    // Update driver
    await query(
      `UPDATE drivers
       SET active_order_id = ?, status = 'on_delivery'
       WHERE id = ?`,
      [order_id, driver_id]
    );

    // Update or insert delivery task
    await query(
      `UPDATE delivery_tasks
       SET driver_id = ?, status = 'in_transit'
       WHERE order_id = ?`,
      [driver_id, order_id]
    );

    // Append to timeline
    await query(
      `INSERT INTO order_timeline (order_id, status, title, description, created_by)
       VALUES (?, 'out_for_delivery', 'Dispatched with Courier', ?, 'Fleet Dispatch Controller')`,
      [order_id, `Courier ${driverName} assigned in vehicle ${driver[0]?.vehicle_plate || 'VIP Van'}. ETA ~20 mins.`]
    );

    return NextResponse.json({
      success: true,
      message: `Order #${order_id} dispatched to ${driverName} successfully.`,
    });
  } catch (error: any) {
    console.error('API Dispatch POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
