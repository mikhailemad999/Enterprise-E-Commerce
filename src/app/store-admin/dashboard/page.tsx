'use client';

import React from 'react';
import Link from 'next/link';
import { Store, DollarSign, ShoppingBag, Boxes, Users, Bell, ArrowUpRight } from 'lucide-react';

export default function StoreAdminDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D002 • TENANT STORE OPERATIONS
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Store Admin Console
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-secondary">Currency: EGP (Egyptian Pound) • Egypt Tax: 14%</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Total Sales (MTD)</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">348,700 EGP</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">+18.4% vs last month</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Orders Dispatched</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">142</span>
          <span className="text-[11px] text-secondary mt-1 block">Cairo West & East Hubs</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Average Order Value</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">24,550 EGP</span>
          <span className="text-[11px] text-secondary mt-1 block">Architectural Silhouettes</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Private Clients</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">89</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Zamalek, New Cairo, Zayed</span>
        </div>
      </div>

      {/* Store Operations Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-sm">
          <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface flex items-center justify-between">
            <span>Store Configuration Status</span>
            <Link href="/store-admin/settings" className="text-xs text-primary font-semibold hover:underline">
              Configure →
            </Link>
          </h3>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Store Profile:</span>
              <span className="font-semibold text-on-surface">Lumio Egyptian Ateliers LLC</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Tax Registration (ETA):</span>
              <span className="font-mono text-on-surface">TRN-491-882-901</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Default Language:</span>
              <span className="font-semibold text-on-surface">English / Arabic (Bilingual)</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Payment Gateways:</span>
              <span className="font-semibold text-emerald-700">Cash on Delivery + Paymob Cards Active</span>
            </div>
          </div>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-sm">
          <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface flex items-center justify-between">
            <span>Department Staff Roles</span>
            <Link href="/store-admin/staff" className="text-xs text-primary font-semibold hover:underline">
              Manage Staff →
            </Link>
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Strict isolation policy is active. Every staff member is bound to one assigned department terminal with unique 6-digit numeric PIN authentication.
          </p>
          <div className="p-2.5 bg-surface-container-low rounded-xl text-xs font-mono text-secondary space-y-1">
            <div>• Active Staff Accounts: 12 members</div>
            <div>• Failed Login Threshold: 5 attempts</div>
            <div>• Inactivity Logout: 12 Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}
