'use client';

import React from 'react';
import Link from 'next/link';
import { Boxes, CheckSquare, PackageCheck, Truck, ArrowRight, AlertTriangle } from 'lucide-react';

export default function WarehouseDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D005 • FULFILLMENT OPERATIONS
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Warehouse Fulfillment Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-secondary">Active Hub: Cairo West Hub (Sheikh Zayed)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Orders to Pick</span>
          <span className="font-headline-lg text-3xl font-bold text-amber-600 block">3</span>
          <span className="text-[11px] text-secondary mt-1 block">Awaiting physical bin scan</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Orders to Pack</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">2</span>
          <span className="text-[11px] text-secondary mt-1 block">White-glove wood crating</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Incoming Stock</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">12 Units</span>
          <span className="text-[11px] text-secondary mt-1 block">From Fayoum Pottery Guild</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Crating Quality Audit</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">100%</span>
          <span className="text-[11px] text-secondary mt-1 block">Inspection verification</span>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <Link
          href="/warehouse/picking"
          className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container hover:border-primary/40 transition-all shadow-sm group flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">Pick Queue</h3>
              <p className="text-xs text-secondary">Verify aisle locations & scan barcode confirmation</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
        </Link>

        <Link
          href="/warehouse/packing"
          className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container hover:border-primary/40 transition-all shadow-sm group flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">Packing Station</h3>
              <p className="text-xs text-secondary">Generate shipping labels, packing slips & crating slips</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  );
}
