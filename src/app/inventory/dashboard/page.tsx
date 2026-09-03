'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Boxes, Building2, AlertTriangle, ArrowLeftRight, TrendingUp } from 'lucide-react';

export default function InventoryDashboardPage() {
  const [data, setData] = useState<any>({ inventory: [], warehouses: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/inventory');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalOnHand = data.inventory?.reduce((acc: number, item: any) => acc + (Number(item.quantity_on_hand) || 0), 0) || 0;
  const totalReserved = data.inventory?.reduce((acc: number, item: any) => acc + (Number(item.quantity_reserved) || 0), 0) || 0;

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D004 • MULTI-WAREHOUSE WMS
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Inventory Management Dashboard
          </h1>
        </div>

        <Link
          href="/inventory/transfers"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Inter-Warehouse Transfer</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Total Stock On Hand</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">{totalOnHand} Units</span>
          <span className="text-[11px] text-secondary mt-1 block">Across 3 Regional Hubs</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Stock Reserved</span>
          <span className="font-headline-lg text-3xl font-bold text-amber-600 block">{totalReserved} Units</span>
          <span className="text-[11px] text-secondary mt-1 block">Allocated to Active Orders</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Net Available to Sell</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">{totalOnHand - totalReserved} Units</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Ready for Customer Checkout</span>
        </div>
      </div>

      {/* Warehouse Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {data.warehouses?.map((wh: any) => (
          <div key={wh.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-bold text-sm text-on-surface">{wh.name}</h4>
                <span className="text-[11px] text-secondary font-mono">{wh.code} • {wh.governorate}</span>
              </div>
            </div>
            <p className="text-xs text-secondary">{wh.address}</p>
            <div className="pt-2 border-t border-surface-container flex justify-between text-xs">
              <span className="text-secondary">Capacity:</span>
              <span className="font-bold text-on-surface">{wh.capacity_units} Units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
