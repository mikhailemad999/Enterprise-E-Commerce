'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Database,
  Cpu,
  Server,
  Zap,
  ShieldCheck,
  Truck,
  TrendingUp,
  RefreshCw,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';

export default function AdminMonitoringPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/monitoring');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Failed to fetch system monitoring metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    if (!autoRefresh) return;
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const formatEgp = (val: number) => {
    return `${new Intl.NumberFormat('en-US').format(val || 0)} EGP`;
  };

  const db = data?.database || { total: 0, active: 0, idle: 0, queue: 0, limit: 30 };
  const sys = data?.system || {
    uptimeSeconds: 0,
    nodeVersion: 'v20.x',
    platform: 'win32',
    memory: { rssMb: 0, heapUsedMb: 0, heapTotalMb: 0, heapUtilizationPercent: 0 },
  };
  const cache = data?.cache || { totalKeys: 0, hits: 0, misses: 0, hitRatePercent: 100 };
  const throughput = data?.throughput || {
    totalOrders: 0,
    orders24h: 0,
    orders1h: 0,
    inTransit: 0,
    pendingFulfillment: 0,
    grossGmv: 0,
    targetDailyCapacity: 1000,
    dailyLoadPercentage: 0,
  };
  const fleet = data?.fleet || {
    totalTasks: 0,
    tasksDelivered: 0,
    tasksInTransit: 0,
    tasksAssigned: 0,
    activeCouriers: 0,
    slaSuccessRate: 100,
  };
  const hubs = data?.regionalHubs || [];

  const formatUptime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-mono">
              SYSTEM OBSERVATORY • 1,000 ORDERS/DAY SCALE
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
              <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600" />
              Live Telemetry
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Platform Observability & Infrastructure Health
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-secondary select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-surface-container text-primary focus:ring-primary h-4 w-4"
            />
            <span>Auto-Refresh (5s)</span>
          </label>

          <button
            onClick={fetchMetrics}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh Metrics Now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          {lastRefreshed && (
            <span className="text-[11px] text-secondary font-mono">
              Updated: {lastRefreshed}
            </span>
          )}
        </div>
      </div>

      {/* Primary KPI Row: Scale & Concurrency Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* 1. Scale Target Gauge */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
              Target Scale (1,000 / Day)
            </span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl font-bold text-on-surface font-mono">
              {throughput.orders24h}
            </span>
            <span className="text-xs text-secondary font-mono">/ 1,000 daily capacity</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(throughput.dailyLoadPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-secondary font-mono pt-1">
            <span>Utilization: {throughput.dailyLoadPercentage}%</span>
            <span>Last 1h: +{throughput.orders1h} orders</span>
          </div>
        </div>

        {/* 2. MySQL Connection Pool Saturation */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
              MySQL Connection Pool
            </span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl font-bold text-on-surface font-mono">
              {db.active}
            </span>
            <span className="text-xs text-secondary font-mono">active / {db.limit} max limit</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                (db.active / db.limit) > 0.8 ? 'bg-rose-600' : 'bg-emerald-600'
              }`}
              style={{ width: `${Math.min((db.active / db.limit) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-secondary font-mono pt-1">
            <span>Idle in Pool: {db.idle}</span>
            <span>Backlog Queue: {db.queue}</span>
          </div>
        </div>

        {/* 3. Server Node.js Heap Utilization */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
              Node.js Memory Heap
            </span>
            <Cpu className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl font-bold text-on-surface font-mono">
              {sys.memory?.heapUsedMb}
            </span>
            <span className="text-xs text-secondary font-mono">MB / {sys.memory?.heapTotalMb} MB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(sys.memory?.heapUtilizationPercent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-secondary font-mono pt-1">
            <span>Heap Util: {sys.memory?.heapUtilizationPercent}%</span>
            <span>RSS: {sys.memory?.rssMb} MB</span>
          </div>
        </div>

        {/* 4. In-Memory Cache Efficiency */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
              In-Memory Cache Telemetry
            </span>
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl font-bold text-on-surface font-mono">
              {cache.hitRatePercent}%
            </span>
            <span className="text-xs text-secondary font-mono">cache hit ratio</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(cache.hitRatePercent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-secondary font-mono pt-1">
            <span>Cached Keys: {cache.totalKeys}</span>
            <span>Hits: {cache.hits} | Misses: {cache.misses}</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Logistics Fleet & Regional Hub Dispatching */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left: Regional Hub Routing Distribution */}
        <div className="lg:col-span-2 p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <h2 className="font-headline-sm text-sm font-bold uppercase text-on-surface">
                Automated Regional Dispatch Matrix
              </h2>
            </div>
            <span className="text-[10px] text-secondary font-mono uppercase">
              Heuristic Proximity Routing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {hubs.map((hub: any, idx: number) => (
              <div key={idx} className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <span className="text-[10px] uppercase font-bold text-secondary font-mono block">
                  {hub.hub_name}
                </span>
                <span className="font-mono text-xl font-bold text-on-surface block">
                  {hub.order_count} Orders
                </span>
                <span className="text-[11px] text-emerald-700 font-mono font-semibold block">
                  {formatEgp(hub.gmv)} GMV
                </span>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low/50 p-sm rounded-xl border border-surface-container text-xs space-y-1 text-secondary">
            <div className="flex items-center gap-1.5 font-semibold text-on-surface">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Courier Load Balancing</span>
            </div>
            <p className="text-[11px]">
              New orders are automatically routed to the nearest regional depot (Cairo West Hub, Cairo East Central Hub, Alex Maritime Hub) and assigned to active vetted drivers with capacity capping (maximum 15 concurrent parcels/courier).
            </p>
          </div>
        </div>

        {/* Right: Fleet Delivery Performance & SLA */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface-container pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <h2 className="font-headline-sm text-sm font-bold uppercase text-on-surface">
                  Fleet Delivery SLA
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {fleet.slaSuccessRate}% SLA
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">Active Field Drivers:</span>
                <span className="font-bold text-on-surface font-mono">{fleet.activeCouriers} Drivers</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">Delivered Packages:</span>
                <span className="font-bold text-emerald-700 font-mono">{fleet.tasksDelivered} Drops</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">In-Transit Drops:</span>
                <span className="font-bold text-amber-700 font-mono">{fleet.tasksInTransit} Parcels</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-secondary">Pending Hub Assignment:</span>
                <span className="font-bold text-primary font-mono">{fleet.tasksAssigned} Tasks</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-2.5 rounded-xl text-[11px] text-secondary">
            <span className="font-bold text-primary block uppercase text-[10px] mb-0.5">
              Financial Custody Guaranteed
            </span>
            All drivers are tracked in the real-time COD Remittance Ledger with automated 200 EGP commission credit upon client doorstep confirmation.
          </div>
        </div>
      </div>

      {/* Bottom Architecture Guarantees Card */}
      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h3 className="font-headline-sm text-sm font-bold uppercase text-on-surface">
            High-Concurrency Architecture Safeguards (1,000 Buyers / Day Ready)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-on-surface">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ACID Row Locking</span>
            </div>
            <p className="text-[11px] text-secondary">
              `SELECT ... FOR UPDATE` row-level locks prevent inventory overselling during simultaneous flashes.
            </p>
          </div>

          <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-on-surface">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sliding Window Limiter</span>
            </div>
            <p className="text-[11px] text-secondary">
              Protects order endpoints with a 60 req/min rolling window, mitigating denial-of-service and bot spam.
            </p>
          </div>

          <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-on-surface">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>In-Memory TTL Caching</span>
            </div>
            <p className="text-[11px] text-secondary">
              Caches catalog queries for 30s with instant cache invalidation upon product price or stock edits.
            </p>
          </div>

          <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-on-surface">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Double-Entry Reconciled</span>
            </div>
            <p className="text-[11px] text-secondary">
              Accrues 14% ETA VAT, COGS, gateway fees, fleet fuel, and driver commissions to guarantee zero discrepancies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
