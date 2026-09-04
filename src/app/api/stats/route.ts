import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const revenueRow = await queryRow(`SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM orders WHERE status != 'cancelled'`);
    const ordersCountRow = await queryRow(`SELECT COUNT(*) as total_orders FROM orders`);
    const deliveredCountRow = await queryRow(`SELECT COUNT(*) as delivered_orders FROM orders WHERE status = 'delivered'`);
    const activeDeliveriesRow = await queryRow(`SELECT COUNT(*) as active_deliveries FROM delivery_tasks WHERE status IN ('pending', 'accepted', 'in_transit', 'arrived')`);
    const lowStockRow = await queryRow(`SELECT COUNT(*) as low_stock_count FROM inventory_stocks WHERE quantity_available <= reorder_point`);

    const totalRevenue = Number(revenueRow?.total_revenue) || 0;
    const totalOrders = Number(ordersCountRow?.total_orders) || 0;
    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // Revenue by category
    const categoryRevenue = await query(`
      SELECT c.name, COALESCE(SUM(oi.total_price), 0) as revenue
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY c.id
      ORDER BY revenue DESC
    `);

    // Top selling products
    const topProducts = await query(`
      SELECT p.id, p.name, p.sku, p.price, p.material,
             COALESCE(SUM(oi.quantity), 0) as units_sold,
             COALESCE(SUM(oi.total_price), 0) as total_sales
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id
      ORDER BY total_sales DESC
      LIMIT 5
    `);

    // Warehouse occupancy
    const warehouseStock = await query(`
      SELECT w.name, w.code, w.city,
             COALESCE(SUM(inv.quantity_on_hand), 0) as total_units,
             COALESCE(SUM(inv.quantity_reserved), 0) as reserved_units
      FROM warehouses w
      LEFT JOIN inventory_stocks inv ON w.id = inv.warehouse_id
      GROUP BY w.id
    `);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        aov,
        deliveredOrders: Number(deliveredCountRow?.delivered_orders) || 0,
        activeDeliveries: Number(activeDeliveriesRow?.active_deliveries) || 0,
        lowStockCount: Number(lowStockRow?.low_stock_count) || 0,
        categoryRevenue,
        topProducts,
        warehouseStock,
      },
    });
  } catch (error: any) {
    console.error('API Stats GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
