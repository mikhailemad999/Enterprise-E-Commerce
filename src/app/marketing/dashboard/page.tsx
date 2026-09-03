'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, Ticket, Users, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D011 • GROWTH & EDITORIAL CAMPAIGNS
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Marketing & Curations Console
          </h1>
        </div>

        <Link
          href="/marketing/campaigns"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Private Campaign</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Active Curations</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">2</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Autumn Solstice & VIP Preview</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Total Reach</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">6,050</span>
          <span className="text-[11px] text-secondary mt-1 block">Cairo & Giza HNW Database</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Attributed Revenue</span>
          <span className="font-headline-lg text-2xl font-bold text-emerald-700 block">1,000,000 EGP</span>
          <span className="text-[11px] text-secondary mt-1 block">Conversion Rate: 3.6%</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Coupon Redemptions</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">52</span>
          <span className="text-[11px] text-secondary mt-1 block">LUMIO10 & ATELIERVIP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Active VIP Promotions</h3>
            <Link href="/marketing/coupons" className="text-xs text-primary uppercase font-semibold hover:underline">
              All Coupons →
            </Link>
          </div>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            <div className="pt-2 flex justify-between items-center">
              <div>
                <span className="font-mono font-bold text-primary text-sm">LUMIO10</span>
                <p className="text-secondary">10% Off Orders over 10,000 EGP</p>
              </div>
              <span className="font-mono text-secondary">38 Uses</span>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <div>
                <span className="font-mono font-bold text-primary text-sm">ATELIERVIP</span>
                <p className="text-secondary">5,000 EGP Credit for Orders over 35,000 EGP</p>
              </div>
              <span className="font-mono text-secondary">14 Uses</span>
            </div>
          </div>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Client Segments</h3>
          </div>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Zamalek & Garden City Diplomatic:</span>
              <span className="font-bold text-on-surface">42 Clients</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">New Cairo & Katameya Estates:</span>
              <span className="font-bold text-on-surface">68 Clients</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Sheikh Zayed & Palm Hills Villas:</span>
              <span className="font-bold text-on-surface">54 Clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
