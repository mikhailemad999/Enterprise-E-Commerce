'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Award, MapPin, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D012 • PRIVATE CLIENT ACCOUNT
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Client Private Folio
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase font-bold tracking-wider">
            Private Client Tier • 4,800 Points
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Commissioned Silhouettes</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">2</span>
          <span className="text-[11px] text-secondary mt-1 block">Zamalek Residence</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Live Delivery In Transit</span>
          <span className="font-headline-lg text-3xl font-bold text-primary block">1 Stop</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Karim (Van) • ETA: 14 Mins</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Private Atelier Credit</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">5,000 EGP</span>
          <span className="text-[11px] text-secondary mt-1 block">Applicable to Next Commission</span>
        </div>
      </div>

      {/* Active Commission Tracking Alert */}
      <div className="p-md bg-surface-container-low rounded-2xl border border-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-headline-sm text-base font-bold text-on-surface uppercase">
              Commission #LUM-2026-8891 Out for Delivery
            </h4>
            <p className="text-xs text-secondary">
              Handover Security OTP: <span className="font-mono font-bold text-primary">8492</span>
            </p>
          </div>
        </div>

        <Link
          href="/tracking/LUM-2026-8891"
          target="_blank"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <span>Live GPS Fleet Map</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
