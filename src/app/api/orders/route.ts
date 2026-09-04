import { NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';
import { routeOrderDestination } from '@/lib/dispatchEngine';
import { rateLimiter } from '@/lib/rateLimit';
import { memoryCache } from '@/lib/cache';

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
    // 1. Sliding window rate limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = rateLimiter.check(`order:${ip}`, 30, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many transaction requests. Please wait ${rateCheck.resetSeconds}s before retrying.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const customer_id = body.customer_id || body.customerId;
    const guest_email = body.guest_email || body.guestEmail;
    const guest_name = body.guest_name || body.guestName;
    const guest_phone = body.guest_phone || body.guestPhone;
    const shipping_address = body.shipping_address || body.shippingAddress;
    const payment_method = body.payment_method || body.paymentMethod || 'cash_on_delivery';
    const items = body.items || [];
    const notes = body.notes;

    let totalAmount = Number(body.total_amount || body.totalAmount || body.subtotal);
    if (!totalAmount && Array.isArray(items)) {
      totalAmount = items.reduce((acc: number, it: any) => acc + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    }

    const orderNumber = `LUM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const paymentStatus = payment_method === 'cash_on_delivery' ? 'cod_pending' : 'paid';

    // 2. Automated dispatch routing based on geographical destination
    const routing = routeOrderDestination(shipping_address || {});

    // 3. Atomic Transaction Execution
    const orderRecord = await withTransaction(async (conn) => {
      // A. Insert Order with regional routing
      const [orderResult]: any = await conn.execute(
        `INSERT INTO orders (
          order_number, customer_id, guest_email, guest_name, guest_phone,
          status, payment_status, payment_method, subtotal, total_amount,
          shipping_address_json, warehouse_id, carrier_name, delivery_type,
          assigned_driver_id, otp_code, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Lumio Private Courier Fleet', 'own_fleet', ?, ?, ?)`,
        [
          orderNumber,
          customer_id || 1,
          guest_email || 'client@lumio.com',
          guest_name || 'Client',
          guest_phone || '+20 100 000 0000',
          'confirmed',
          paymentStatus,
          payment_method,
          totalAmount,
          totalAmount,
          JSON.stringify(shipping_address || {}),
          routing.warehouseId,
          routing.driverId,
          otpCode,
          notes || 'White-glove delivery requested.',
        ]
      );

      const orderId = orderResult.insertId;

      // B. Insert Order Items & Atomically Reserve Stock
      if (Array.isArray(items)) {
        for (const item of items) {
          const prodId = item.productId || item.product_id || 1;
          const qty = Number(item.quantity) || 1;
          const unitPrice = Number(item.price) || 0;
          const totalPrice = unitPrice * qty;

          await conn.execute(
            `INSERT INTO order_items (order_id, product_id, product_name, sku, unit_price, quantity, total_price, image_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              orderId,
              prodId,
              item.name || 'Bespoke Atelier Creation',
              item.sku || 'LUM-ITEM',
              unitPrice,
              qty,
              totalPrice,
              item.image || '',
            ]
          );

          // Atomic stock reservation preventing race condition
          await conn.execute(
            `UPDATE inventory_stocks
             SET quantity_reserved = quantity_reserved + ?
             WHERE product_id = ? AND warehouse_id = ?`,
            [qty, prodId, routing.warehouseId]
          );
        }
      }

      // C. Record initial timeline milestone
      await conn.execute(
        `INSERT INTO order_timeline (order_id, status, title, description, created_by)
         VALUES (?, 'confirmed', 'Order Placed & Authenticated', 'Order recorded via private checkout. Verification OTP issued.', 'OMS Core Engine')`,
        [orderId]
      );

      // D. Automatically create active delivery task routed to assigned driver
      const destAddress = shipping_address
        ? `${shipping_address.street || ''}, ${shipping_address.apartment || ''}, ${shipping_address.city || 'Cairo'}`
        : 'Zamalek, Cairo';

      await conn.execute(
        `INSERT INTO delivery_tasks (
          order_id, driver_id, status, customer_name, customer_phone,
          delivery_address, cod_amount, otp_code
        ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?)`,
        [
          orderId,
          routing.driverId,
          guest_name || 'Client',
          guest_phone || '+20 100 000 0000',
          destAddress,
          payment_method === 'cash_on_delivery' ? totalAmount : 0.00,
          otpCode,
        ]
      );

      // E. Update Customer Lifetime Spend & VIP Tier Progression
      const effectiveCustId = customer_id || 1;
      const [spendRows]: any = await conn.execute(
        `SELECT COALESCE(SUM(total_amount), 0) as lifetime_spend
         FROM orders WHERE customer_id = ? AND status != 'cancelled'`,
        [effectiveCustId]
      );
      const lifetimeSpend = Number(spendRows[0]?.lifetime_spend) || 0;
      let newTier: 'Bronze' | 'Silver' | 'Gold' | 'Private Client' = 'Bronze';
      if (lifetimeSpend >= 100000) {
        newTier = 'Private Client';
      } else if (lifetimeSpend >= 50000) {
        newTier = 'Gold';
      } else if (lifetimeSpend >= 20000) {
        newTier = 'Silver';
      }

      await conn.execute(
        `UPDATE customers
         SET loyalty_points = loyalty_points + ?, tier = ?
         WHERE id = ?`,
        [Math.round(totalAmount / 10), newTier, effectiveCustId]
      );

      return {
        id: orderId,
        order_number: orderNumber,
        otp_code: otpCode,
        total_amount: totalAmount,
        status: 'confirmed',
        assignedDriver: routing.driverName,
        fulfillmentHub: routing.warehouseName,
      };
    });

    // Invalidate cached stats and financial aggregations
    memoryCache.invalidate('stats');
    memoryCache.invalidate('accounting');

    return NextResponse.json({
      success: true,
      orderId: orderRecord.id,
      orderNumber: orderRecord.order_number,
      dispatch: {
        hub: orderRecord.fulfillmentHub,
        driver: orderRecord.assignedDriver,
      },
      order: orderRecord,
    });
  } catch (error: any) {
    console.error('API Orders POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
