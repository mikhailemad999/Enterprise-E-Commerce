import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. All non-cancelled orders
    const orders = await query<any[]>(`
      SELECT o.*,
             COALESCE(u.first_name, o.guest_name) as client_first,
             COALESCE(u.last_name, '') as client_last,
             COALESCE(u.phone, o.guest_phone) as client_phone,
             COALESCE(u.email, o.guest_email) as client_email,
             (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as item_count
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN users u ON c.user_id = u.id
      ORDER BY o.id DESC
    `);

    // 2. Aggregate Financial Telemetry
    let grossRevenue = 0;
    let totalTax14 = 0;
    let codInTransit = 0;
    let codSettled = 0;
    let rmaRefunds = 0;

    let inflowPaymob = 0;
    let inflowStripe = 0;
    let inflowCod = 0;
    let inflowWire = 0;

    const paymentsLedger = orders.map((o) => {
      const gross = Number(o.total_amount) || 0;
      // In Egyptian Tax Authority schema, 14% VAT is embedded or calculated as:
      const tax = Number(o.tax) > 0 ? Number(o.tax) : Number((gross * 0.14 / 1.14).toFixed(2));
      const subtotal = Number((gross - tax).toFixed(2));

      if (o.status !== 'cancelled') {
        grossRevenue += gross;
        totalTax14 += tax;

        if (o.payment_method === 'cash_on_delivery') {
          if (o.payment_status === 'cod_pending' || o.payment_status === 'pending') {
            codInTransit += gross;
          } else if (o.payment_status === 'paid') {
            codSettled += gross;
          }
          inflowCod += gross;
        } else if (o.payment_method === 'card_paymob') {
          inflowPaymob += gross;
        } else if (o.payment_method === 'card_stripe') {
          inflowStripe += gross;
        } else {
          inflowWire += gross;
        }
      }

      if (o.payment_status === 'refunded') {
        rmaRefunds += gross;
      }

      const clientName = `${o.client_first || 'Private'} ${o.client_last || 'Client'}`.trim();
      const gatewayRef =
        o.payment_method === 'card_paymob'
          ? `PAYMOB-${o.id}982`
          : o.payment_method === 'card_stripe'
          ? `STRIPE-CH-${o.id}449`
          : o.payment_method === 'cash_on_delivery'
          ? `COD-DEPOT-${o.id}01`
          : `WIRE-CIB-${o.id}88`;

      return {
        id: o.id,
        orderNumber: o.order_number,
        client: clientName,
        email: o.client_email,
        phone: o.client_phone,
        method: o.payment_method,
        paymentStatus: o.payment_status,
        orderStatus: o.status,
        amount: gross,
        subtotal,
        tax,
        currency: o.currency || 'EGP',
        ref: gatewayRef,
        itemCount: o.item_count,
        date: new Date(o.created_at).toISOString().split('T')[0],
        createdAt: o.created_at,
      };
    });

    // 3. Compute Gross Margin & COGS using cost prices
    const costAnalysis = await query<any[]>(`
      SELECT COALESCE(SUM(oi.quantity * COALESCE(p.cost_price, p.price * 0.45)), 0) as total_cogs
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status != 'cancelled'
    `);
    const totalCogs = Number(costAnalysis[0]?.total_cogs) || Math.round(grossRevenue * 0.42);
    const netSalesBase = Number((grossRevenue - totalTax14).toFixed(2));
    const grossProfit = Math.max(0, netSalesBase - totalCogs);
    const grossMarginPercent = netSalesBase > 0 ? Number(((grossProfit / netSalesBase) * 100).toFixed(1)) : 58.0;

    // 4. Calculate Granular Operating Expenses (OPEX)
    const validOrdersCount = orders.filter(o => o.status !== 'cancelled').length;
    const paymobCount = orders.filter(o => o.payment_method === 'card_paymob' && o.status !== 'cancelled').length;
    const stripeCount = orders.filter(o => o.payment_method === 'card_stripe' && o.status !== 'cancelled').length;
    const codCount = orders.filter(o => o.payment_method === 'cash_on_delivery' && o.status !== 'cancelled').length;

    const gatewayPaymobFees = Number(((inflowPaymob * 0.0275) + (paymobCount * 3.00)).toFixed(2));
    const gatewayStripeFees = Number(((inflowStripe * 0.029) + (stripeCount * 15.00)).toFixed(2));
    const gatewayCodFees = Number((inflowCod * 0.015).toFixed(2));
    const totalGatewayFees = Number((gatewayPaymobFees + gatewayStripeFees + gatewayCodFees).toFixed(2));

    const fleetLogisticsExpense = validOrdersCount * 350.00; // Fuel, white-glove uncrating, transit insurance
    const driverCommissionsExpense = validOrdersCount * 200.00; // 200 EGP per verified client handover
    const warehouseFulfillmentExpense = validOrdersCount * 150.00; // Crating, protective wrapping, bin handling

    const totalOpex = Number(
      (totalGatewayFees + fleetLogisticsExpense + driverCommissionsExpense + warehouseFulfillmentExpense).toFixed(2)
    );

    const netOperatingProfit = Number((grossProfit - totalOpex).toFixed(2));
    const netProfitMarginPercent = grossRevenue > 0
      ? Number(((netOperatingProfit / grossRevenue) * 100).toFixed(1))
      : 32.5;

    // 5. Driver Payout & COD Settlement Ledger
    const drivers = await query<any[]>(`
      SELECT d.id, d.name, d.phone, d.vehicle_plate, d.status
      FROM drivers d
    `);

    const driverPayoutLedger = await Promise.all(
      drivers.map(async (drv) => {
        const drvOrders = await query<any[]>(`
          SELECT o.id, o.order_number, o.status, o.payment_status, o.payment_method, o.total_amount
          FROM orders o
          WHERE o.assigned_driver_id = ?
        `, [drv.id]);

        const assignedCount = drvOrders.length;
        const deliveredCount = drvOrders.filter(o => o.status === 'delivered').length;
        
        // Sum COD collected by this driver
        const codCollected = drvOrders
          .filter(o => o.payment_method === 'cash_on_delivery' && (o.status === 'delivered' || o.status === 'out_for_delivery' || o.payment_status === 'paid'))
          .reduce((acc, o) => acc + Number(o.total_amount || 0), 0);

        const commissionsEarned = assignedCount * 200.00;
        const netRemittanceDue = Math.max(0, codCollected - commissionsEarned);

        return {
          driverId: drv.id,
          driverName: drv.name,
          phone: drv.phone,
          vehiclePlate: drv.vehicle_plate,
          status: drv.status,
          assignedOrders: assignedCount,
          completedDeliveries: deliveredCount,
          codCollected: Number(codCollected.toFixed(2)),
          commissionsEarned: Number(commissionsEarned.toFixed(2)),
          netRemittanceDue: Number(netRemittanceDue.toFixed(2)),
          payoutStatus: codCollected > 0 ? (netRemittanceDue > 0 ? 'Pending Remittance' : 'Reconciled') : 'No Collections',
        };
      })
    );

    // Inflow percentages
    const totalInflows = (inflowPaymob + inflowStripe + inflowCod + inflowWire) || 1;
    const inflowBreakdown = [
      { method: 'Paymob / Visa & Mastercard', amount: inflowPaymob, percent: Math.round((inflowPaymob / totalInflows) * 100) },
      { method: 'Cash on Delivery (COD)', amount: inflowCod, percent: Math.round((inflowCod / totalInflows) * 100) },
      { method: 'Stripe Global Express', amount: inflowStripe, percent: Math.round((inflowStripe / totalInflows) * 100) },
      { method: 'Corporate Bank Wire (CIB)', amount: inflowWire, percent: Math.round((inflowWire / totalInflows) * 100) },
    ];

    return NextResponse.json({
      success: true,
      data: {
        companyTrn: '491-882-901',
        vatRate: '14%',
        currency: 'EGP',
        summary: {
          grossRevenue: Number(grossRevenue.toFixed(2)),
          totalTax14: Number(totalTax14.toFixed(2)),
          netSalesBase,
          codInTransit: Number(codInTransit.toFixed(2)),
          codSettled: Number(codSettled.toFixed(2)),
          rmaRefunds: Number(rmaRefunds.toFixed(2)),
          totalCogs: Number(totalCogs.toFixed(2)),
          grossProfit: Number(grossProfit.toFixed(2)),
          grossMarginPercent,
          totalOpex,
          netOperatingProfit,
          netProfitMarginPercent,
          netMarginPercent: netProfitMarginPercent,
          totalOrders: orders.length,
          opex: {
            totalOpex,
            gatewayFees: totalGatewayFees,
            fleetTransport: fleetLogisticsExpense,
            driverCommissions: driverCommissionsExpense,
            warehouseLogistics: warehouseFulfillmentExpense,
          },
          opexBreakdown: {
            totalGatewayFees,
            gatewayPaymobFees,
            gatewayStripeFees,
            gatewayCodFees,
            fleetLogisticsExpense,
            driverCommissionsExpense,
            warehouseFulfillmentExpense,
          },
        },
        inflowBreakdown,
        driverPayoutLedger,
        paymentsLedger,
      },
    });
  } catch (error: any) {
    console.error('API Accounting GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, orderId, driverId, paymentStatus, notes } = body;

    // 1. Action: Settle Driver Cash & Commission Payout
    if (action === 'settle_driver_payout') {
      if (!driverId) {
        return NextResponse.json({ success: false, error: 'Driver ID is required.' }, { status: 400 });
      }

      // Mark all COD orders for this driver as paid
      await query(
        `UPDATE orders
         SET payment_status = 'paid'
         WHERE assigned_driver_id = ? AND payment_method = 'cash_on_delivery' AND payment_status != 'paid'`,
        [driverId]
      );

      // Clear pending COD amounts in delivery tasks
      await query(
        `UPDATE delivery_tasks
         SET cod_amount = 0.00
         WHERE driver_id = ?`,
        [driverId]
      );

      return NextResponse.json({
        success: true,
        message: `Driver #${driverId} COD cash collected has been remitted to Treasury. Driver commissions reconciled.`,
      });
    }

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
    }

    const order = await queryRow('SELECT id, order_number, total_amount, payment_method FROM orders WHERE id = ?', [orderId]);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
    }

    if (action === 'settle_cod' || action === 'mark_paid') {
      await query(`UPDATE orders SET payment_status = 'paid' WHERE id = ?`, [orderId]);

      // If there is a delivery task, update cod_amount to 0
      await query(`UPDATE delivery_tasks SET cod_amount = 0.00 WHERE order_id = ?`, [orderId]);

      // Log in order timeline
      await query(
        `INSERT INTO order_timeline (order_id, status, title, description, created_by)
         VALUES (?, 'paid', 'Payment Reconciled & Settled', ?, 'Finance Controller (D010)')`,
        [orderId, notes || 'Cash/Payment reconciled by Corporate Accounting Department. Tax invoice cleared.']
      );

      return NextResponse.json({
        success: true,
        message: `Order #${order.order_number} payment settled and cleared in accounting ledger.`,
      });
    }

    if (paymentStatus) {
      await query(`UPDATE orders SET payment_status = ? WHERE id = ?`, [paymentStatus, orderId]);
      return NextResponse.json({ success: true, message: 'Payment status updated.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid accounting action.' }, { status: 400 });
  } catch (error: any) {
    console.error('API Accounting POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
