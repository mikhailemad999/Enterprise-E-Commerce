'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, TrendingUp, Target, Plus, ArrowUpRight } from 'lucide-react';

export default function SalesDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D006 • COMMERCIAL SALES DESK
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Sales & Client Commissions
          </h1>
        </div>

        <Link
          href="/sales/orders"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Commission</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Sales Today</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">69,000 EGP</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">2 Major Commissions</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Orders This Week</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">14</span>
          <span className="text-[11px] text-secondary mt-1 block">Zamalek & Palm Hills</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Monthly Target</span>
          <span className="font-headline-lg text-2xl font-bold text-primary block">85%</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">348,700 / 400,000 EGP</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Pending Confirmation</span>
          <span className="font-headline-lg text-2xl font-bold text-amber-600 block">1</span>
          <span className="text-[11px] text-secondary mt-1 block">Awaiting Bank Transfer Wire</span>
        </div>
      </div>

      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-md shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Recent Commissions</h3>
          <Link href="/sales/orders" className="text-xs text-primary uppercase font-semibold hover:underline">
            View All Orders →
          </Link>
        </div>
        <div className="divide-y divide-surface-container text-xs">
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <span className="font-mono font-bold text-on-surface">#LUM-2026-8891</span>
              <span className="text-secondary ml-2">Farida Mansour (Zamalek Penthouse)</span>
            </div>
            <span className="font-bold text-on-surface">50,500 EGP</span>
          </div>
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <span className="font-mono font-bold text-on-surface">#LUM-2026-8892</span>
              <span className="text-secondary ml-2">Sherif Aly (Palm Hills)</span>
            </div>
            <span className="font-bold text-on-surface">18,500 EGP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
