import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const driverId = Number(searchParams.get('driver_id')) || 1;

    const driver = await queryRow(`SELECT * FROM drivers WHERE id = ?`, [driverId]);

    const tasks = await query(`
      SELECT dt.*, o.order_number, o.payment_method, o.total_amount, o.status as order_status,
             o.notes as order_notes
      FROM delivery_tasks dt
      JOIN orders o ON dt.order_id = o.id
      WHERE dt.driver_id = ?
      ORDER BY dt.route_order ASC, dt.id DESC
    `, [driverId]);

    // Attach items for each task
    for (const task of tasks) {
      task.items = await query(`SELECT * FROM order_items WHERE order_id = ?`, [task.order_id]);
    }

    return NextResponse.json({
      success: true,
      driver,
      tasks,
    });
  } catch (error: any) {
    console.error('API Driver Tasks GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { task_id, status, driver_id, lat, lng, speed } = body;

    if (task_id && status) {
      await query(`UPDATE delivery_tasks SET status = ? WHERE id = ?`, [status, task_id]);

      // If status changed to arrived, record in timeline
      const task = await queryRow(`SELECT order_id FROM delivery_tasks WHERE id = ?`, [task_id]);
      if (task && status === 'arrived') {
        await query(
          `INSERT INTO order_timeline (order_id, status, title, description, created_by)
           VALUES (?, 'out_for_delivery', 'Courier Arrived at Residence', 'Driver is at the delivery address with white-glove inspection.', 'Driver Mobile App')`,
          [task.order_id]
        );
      }
    }

    // Telemetry ping
    if (driver_id && lat && lng) {
      await query(
        `UPDATE drivers
         SET current_lat = ?, current_lng = ?, speed_kmh = ?
         WHERE id = ?`,
        [lat, lng, speed || 35, driver_id]
      );
    }

    return NextResponse.json({ success: true, message: 'Driver status updated' });
  } catch (error: any) {
    console.error('API Driver Tasks PATCH Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
