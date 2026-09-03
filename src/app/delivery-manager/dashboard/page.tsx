'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Navigation, Battery, Gauge, Banknote, ArrowRight } from 'lucide-react';

export default function DeliveryManagerDashboardPage() {
  const [data, setData] = useState<any>({ drivers: [], unassignedOrders: [], activeDeliveries: [] });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/dispatch');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D008 • FLEET DISPATCH & TELEMETRY
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Delivery Fleet Operations
          </h1>
        </div>

        <Link
          href="/delivery-manager/orders"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Navigation className="w-4 h-4" />
          <span>Dispatch Active Orders</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Active Couriers</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">{data.drivers?.length || 3}</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Zamalek, Maadi, New Cairo</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Unassigned Ready</span>
          <span className="font-headline-lg text-3xl font-bold text-amber-600 block">{data.unassignedOrders?.length || 1}</span>
          <span className="text-[11px] text-secondary mt-1 block">Awaiting Courier Allocation</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">COD In Custody</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">18,500 EGP</span>
          <span className="text-[11px] text-amber-600 mt-1 block">To Reconcile with Depot</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Failed Deliveries</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">0</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">100% Handover Rate</span>
        </div>
      </div>

      {/* Courier Quick List */}
      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Courier Telemetry Stream</h3>
          <Link href="/delivery-manager/drivers" className="text-xs text-primary uppercase font-semibold hover:underline">
            Manage Fleet →
          </Link>
        </div>

        <div className="divide-y divide-surface-container">
          {data.drivers?.map((d: any) => (
            <div key={d.id} className="py-3 flex items-center justify-between text-xs gap-sm">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-xs text-on-surface">
                  {d.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">{d.name}</h4>
                  <span className="text-secondary font-mono text-[11px]">{d.vehicle_plate} • {d.vehicle_type}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-secondary">
                <div className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                  <span>{d.speed_kmh} km/h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{d.battery_percent}%</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  d.status === 'on_delivery' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {d.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
