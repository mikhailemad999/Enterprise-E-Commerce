'use client';

import React from 'react';
import Link from 'next/link';
import { Headphones, LifeBuoy, Clock, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

export default function SupportDashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D007 • CLIENT CONCIERGE & SUPPORT
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Customer Support Console
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Open Tickets</span>
          <span className="font-headline-lg text-3xl font-bold text-amber-600 block">2</span>
          <span className="text-[11px] text-secondary mt-1 block">Requires Concierge Follow-up</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Resolved Today</span>
          <span className="font-headline-lg text-3xl font-bold text-emerald-700 block">6</span>
          <span className="text-[11px] text-secondary mt-1 block">Average Response: 18 mins</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Client Satisfaction</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">4.96 ★</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Private Client Feedback</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Concierge Inquiries</span>
          <span className="font-headline-lg text-3xl font-bold text-primary block">3</span>
          <span className="text-[11px] text-secondary mt-1 block">Bespoke Residential Fit-Outs</span>
        </div>
      </div>

      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Urgent Client Requests</h3>
          <Link href="/support/tickets" className="text-xs text-primary uppercase font-semibold hover:underline">
            Manage All Tickets →
          </Link>
        </div>
        <div className="divide-y divide-surface-container text-xs">
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <span className="font-mono font-bold text-on-surface">#TCK-2026-001</span>
              <span className="text-secondary ml-2">Farida Mansour • Torso Luminaire shade care</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase text-[10px]">Open</span>
          </div>
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <span className="font-mono font-bold text-on-surface">#TCK-2026-002</span>
              <span className="text-secondary ml-2">Sherif Aly • White-glove delivery scheduling</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold uppercase text-[10px]">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
