import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = `
      SELECT o.*, d.name as driver_name, d.phone as driver_phone, d.vehicle_plate
      FROM orders o
      LEFT JOIN drivers d ON o.assigned_driver_id = d.id
    `;
    const params: any[] = [];

    if (status && status !== 'all') {
      sql += ` WHERE o.status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY o.id DESC`;

    const orders = await query<any[]>(sql, params);

    // Attach items for each order
    for (const order of orders) {
      order.items = await query(`SELECT * FROM order_items WHERE order_id = ?`, [order.id]);
      try {
        order.shipping_address = typeof order.shipping_address_json === 'string'
          ? JSON.parse(order.shipping_address_json)
          : order.shipping_address_json;
      } catch (e) {
        order.shipping_address = {};
      }
    }

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error('API Orders GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_id,
      guest_email,
      guest_name,
      guest_phone,
      shipping_address,
      payment_method,
      items,
      subtotal,
      notes,
    } = body;

    const orderNumber = `LUM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const totalAmount = Number(subtotal) || 0;
    const paymentStatus = payment_method === 'cash_on_delivery' ? 'cod_pending' : 'paid';

    // Insert Order
    const orderInsertSql = `
      INSERT INTO orders (
        order_number, customer_id, guest_email, guest_name, guest_phone,
        status, payment_status, payment_method, subtotal, total_amount,
        shipping_address_json, warehouse_id, carrier_name, delivery_type,
        otp_code, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'Lumio Private Courier Fleet', 'own_fleet', ?, ?)
    `;

    const orderResult: any = await query(orderInsertSql, [
      orderNumber,
      customer_id || null,
      guest_email || 'client@lumio.com',
      guest_name || 'Client',
      guest_phone || '+20 100 000 0000',
      'confirmed',
      paymentStatus,
      payment_method || 'cash_on_delivery',
      totalAmount,
      totalAmount,
      JSON.stringify(shipping_address || {}),
      otpCode,
      notes || 'White-glove delivery requested.',
    ]);

    const orderId = orderResult.insertId;

    // Insert Order Items and decrement inventory
    if (Array.isArray(items)) {
      for (const item of items) {
        await query(
          `INSERT INTO order_items (order_id, product_id, product_name, sku, unit_price, quantity, total_price, image_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.productId || item.product_id || 1,
            item.name,
            item.sku || 'LUM-ITEM',
            Number(item.price),
            Number(item.quantity) || 1,
            Number(item.price) * (Number(item.quantity) || 1),
            item.image || '',
          ]
        );

        // Update inventory reserved quantity
        await query(
          `UPDATE inventory_stocks
           SET quantity_reserved = quantity_reserved + ?
           WHERE product_id = ? AND warehouse_id = 1`,
          [Number(item.quantity) || 1, item.productId || item.product_id || 1]
        );
      }
    }

    // Insert initial timeline entry
    await query(
      `INSERT INTO order_timeline (order_id, status, title, description, created_by)
       VALUES (?, 'confirmed', 'Order Placed & Authenticated', 'Order recorded via private checkout. Verification OTP issued.', 'OMS Core Engine')`,
      [orderId]
    );

    // Automatically create a pending delivery task for dispatch
    const destAddress = shipping_address
      ? `${shipping_address.street || ''}, ${shipping_address.apartment || ''}, ${shipping_address.city || 'Cairo'}`
      : 'Zamalek, Cairo';

    await query(
      `INSERT INTO delivery_tasks (
        order_id, driver_id, status, customer_name, customer_phone,
        delivery_address, cod_amount, otp_code
      ) VALUES (?, 1, 'pending', ?, ?, ?, ?, ?)`,
      [
        orderId,
        guest_name || 'Client',
        guest_phone || '+20 100 000 0000',
        destAddress,
        payment_method === 'cash_on_delivery' ? totalAmount : 0.00,
        otpCode,
      ]
    );

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        order_number: orderNumber,
        otp_code: otpCode,
        total_amount: totalAmount,
        status: 'confirmed',
      },
    });
  } catch (error: any) {
    console.error('API Orders POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
