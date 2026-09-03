import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      task_id,
      order_id,
      driver_id,
      otp_code,
      signature_data,
      proof_photo_url,
      cod_collected,
    } = body;

    const task = await queryRow(
      `SELECT dt.*, o.otp_code as expected_otp, o.total_amount, o.order_number
       FROM delivery_tasks dt
       JOIN orders o ON dt.order_id = o.id
       WHERE dt.id = ?`,
      [task_id]
    );

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }

    // OTP verification
    if (task.expected_otp && task.expected_otp.trim() !== (otp_code || '').trim()) {
      return NextResponse.json({
        success: false,
        error: `Invalid Handover OTP. Expected: ${task.expected_otp}`,
      }, { status: 400 });
    }

    // Mark delivery task as completed
    await query(
      `UPDATE delivery_tasks
       SET status = 'completed',
           signature_data = ?,
           proof_photo_url = ?,
           cod_collected = ?,
           completed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        signature_data || 'SIGNED',
        proof_photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        cod_collected ? 1 : 0,
        task_id,
      ]
    );

    // Update Order to DELIVERED and PAID
    await query(
      `UPDATE orders
       SET status = 'delivered',
           payment_status = 'paid'
       WHERE id = ?`,
      [order_id]
    );

    // Update Driver: release active order, increment completed deliveries
    await query(
      `UPDATE drivers
       SET active_order_id = NULL,
           status = 'available',
           completed_deliveries = completed_deliveries + 1
       WHERE id = ?`,
      [driver_id]
    );

    // Append to timeline
    await query(
      `INSERT INTO order_timeline (order_id, status, title, description, created_by)
       VALUES (?, 'delivered', 'Handover Completed & Verified', 'Handover confirmed via customer OTP verification and digital signature capture.', 'Driver Proof of Delivery Engine')`,
      [order_id]
    );

    return NextResponse.json({
      success: true,
      message: 'Proof of delivery submitted successfully.',
      order_number: task.order_number,
    });
  } catch (error: any) {
    console.error('API Driver POD POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
