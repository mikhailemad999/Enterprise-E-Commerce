'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Truck,
  Building2,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Package,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatEgp = (amount: number) => {
    return `${new Intl.NumberFormat('en-US').format(amount || 0)} EGP`;
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-secondary">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-sm" />
        <p className="font-label-md text-xs uppercase tracking-wider">Aggregating Operational Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-0.5">
            Executive Command Console
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
            Operational Overview
          </h1>
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <Link
            href="/admin/products"
            className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
          >
            <Package className="w-4 h-4" />
            <span>Catalog & Pricing</span>
          </Link>
          <Link
            href="/admin/dispatch"
            className="px-sm py-2 bg-surface-container-high text-on-surface font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-surface-container-highest transition-colors shadow-sm"
          >
            <Truck className="w-4 h-4" />
            <span>Launch Dispatch Map</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="px-sm py-2 bg-surface-container-high text-on-surface font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-surface-container-highest transition-colors"
          >
            <Boxes className="w-4 h-4" />
            <span>Multi-Warehouse WMS</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Total Revenue */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Gross Commission Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-headline-sm text-2xl font-bold text-on-surface">
              {formatEgp(stats?.totalRevenue)}
            </h3>
            <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last monthly cycle</span>
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Average Order Value (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-headline-sm text-2xl font-bold text-on-surface">
              {formatEgp(stats?.aov)}
            </h3>
            <p className="text-[11px] text-secondary mt-1">
              High-ticket luxury architectural average
            </p>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Fleet Couriers In Transit</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-headline-sm text-2xl font-bold text-on-surface">
              {stats?.activeDeliveries} Active Drops
            </h3>
            <p className="text-[11px] text-blue-700 font-medium mt-1">
              Greater Cairo & Giza White-Glove
            </p>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Stock Reorder Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-headline-sm text-2xl font-bold text-amber-800">
              {stats?.lowStockCount} Silhouettes
            </h3>
            <p className="text-[11px] text-secondary mt-1">
              Below safety stock threshold
            </p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Warehouse Allocations & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Multi-Warehouse Status */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm space-y-md">
          <div className="flex items-center justify-between">
            <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Fulfillment Hub Capacity & Stock</span>
            </h3>
            <Link href="/admin/inventory" className="text-xs text-primary underline uppercase font-semibold">
              Manage Matrix
            </Link>
          </div>

          <div className="space-y-sm">
            {stats?.warehouseStock?.map((wh: any, idx: number) => {
              const maxCap = 250;
              const percent = Math.min(100, Math.round((Number(wh.total_units) / maxCap) * 100));
              return (
                <div key={idx} className="p-sm bg-surface-container-low rounded-lg border border-surface-container">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-semibold text-on-surface">{wh.name}</span>
                    <span className="font-medium text-secondary">{wh.total_units} Units On Hand ({wh.reserved_units} Reserved)</span>
                  </div>
                  {/* Bar */}
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-secondary mt-1">
                    <span>{wh.city} Hub ({wh.code})</span>
                    <span>{percent}% Allocated</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Selling Silhouettes */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm space-y-md">
          <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider">
            Top Commissioned Silhouettes
          </h3>

          <div className="space-y-sm">
            {stats?.topProducts?.map((prod: any, idx: number) => (
              <div key={prod.id} className="flex items-center justify-between text-xs py-1.5 border-b border-surface-container last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-bold text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="font-semibold text-on-surface">{prod.name}</h5>
                    <span className="text-[11px] text-secondary">{prod.sku} • {prod.material}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-on-surface block">{formatEgp(prod.total_sales)}</span>
                  <span className="text-[10px] text-secondary">{prod.units_sold} Units Commissioned</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
