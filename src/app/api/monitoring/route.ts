import { NextResponse } from 'next/server';
import { query, getPoolStats } from '@/lib/db';
import { memoryCache } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Process & System memory
    const mem = process.memoryUsage();
    const systemVitals = {
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        rssMb: Number((mem.rss / (1024 * 1024)).toFixed(2)),
        heapUsedMb: Number((mem.heapUsed / (1024 * 1024)).toFixed(2)),
        heapTotalMb: Number((mem.heapTotal / (1024 * 1024)).toFixed(2)),
        heapUtilizationPercent: Number(((mem.heapUsed / mem.heapTotal) * 100).toFixed(1)),
      },
    };

    // 2. Database Connection Pool Metrics
    const poolStats = getPoolStats();

    // 3. In-memory Cache Telemetry
    const cacheTelemetry = memoryCache.getTelemetry();

    // 4. Order velocity & throughput
    const orderMetrics = await query<any[]>(`
      SELECT 
        COUNT(*) AS total_orders,
        SUM(CASE WHEN created_at >= NOW() - INTERVAL 24 HOUR THEN 1 ELSE 0 END) AS orders_last_24h,
        SUM(CASE WHEN created_at >= NOW() - INTERVAL 1 HOUR THEN 1 ELSE 0 END) AS orders_last_1h,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders,
        SUM(CASE WHEN status = 'dispatched' THEN 1 ELSE 0 END) AS in_transit_orders,
        SUM(CASE WHEN status IN ('pending', 'confirmed') THEN 1 ELSE 0 END) AS pending_fulfillment,
        COALESCE(SUM(total_amount), 0) AS total_gross_gmv
      FROM orders
    `);

    // 5. Regional Fleet Delivery Tasks
    const taskMetrics = await query<any[]>(`
      SELECT 
        COUNT(*) AS total_tasks,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS tasks_delivered,
        SUM(CASE WHEN status = 'in_transit' THEN 1 ELSE 0 END) AS tasks_in_transit,
        SUM(CASE WHEN status IN ('pending', 'accepted') THEN 1 ELSE 0 END) AS tasks_assigned,
        COUNT(DISTINCT driver_id) AS active_couriers
      FROM delivery_tasks
    `);

    // 6. Regional Hub Breakdown
    const hubMetrics = await query<any[]>(`
      SELECT 
        CASE 
          WHEN LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%giza%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%zayed%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%october%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%zamalek%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%dokki%' THEN 'Cairo West Hub'
          WHEN LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%alex%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%smouha%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%gleem%' OR LOWER(CAST(shipping_address_json AS CHAR)) LIKE '%stanley%' THEN 'Alex Maritime Hub'
          ELSE 'Cairo East Central Hub'
        END AS hub_name,
        COUNT(*) AS order_count,
        COALESCE(SUM(total_amount), 0) AS gmv
      FROM orders
      GROUP BY hub_name
    `);

    const orderData = orderMetrics[0] || {};
    const taskData = taskMetrics[0] || {};
    const totalOrders = Number(orderData.total_orders) || 0;
    const deliveredOrders = Number(orderData.delivered_orders) || 0;
    const slaSuccessRate = totalOrders > 0 ? Number(((deliveredOrders / totalOrders) * 100).toFixed(1)) : 100;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        system: systemVitals,
        database: poolStats,
        cache: cacheTelemetry,
        throughput: {
          totalOrders,
          orders24h: Number(orderData.orders_last_24h) || 0,
          orders1h: Number(orderData.orders_last_1h) || 0,
          inTransit: Number(orderData.in_transit_orders) || 0,
          pendingFulfillment: Number(orderData.pending_fulfillment) || 0,
          grossGmv: Number(orderData.total_gross_gmv) || 0,
          targetDailyCapacity: 1000,
          dailyLoadPercentage: Number((((Number(orderData.orders_last_24h) || 0) / 1000) * 100).toFixed(1)),
        },
        fleet: {
          totalTasks: Number(taskData.total_tasks) || 0,
          tasksDelivered: Number(taskData.tasks_delivered) || 0,
          tasksInTransit: Number(taskData.tasks_in_transit) || 0,
          tasksAssigned: Number(taskData.tasks_assigned) || 0,
          activeCouriers: Number(taskData.active_couriers) || 0,
          slaSuccessRate,
        },
        regionalHubs: hubMetrics,
        security: {
          rateLimiting: 'Sliding Window (Active)',
          acidLocking: 'InnoDB Row-Level Exclusive',
          cacheTTL: '30s TTL with auto-invalidation',
        }
      },
    });
  } catch (error: any) {
    console.error('Monitoring API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal monitoring failure' },
      { status: 500 }
    );
  }
}
