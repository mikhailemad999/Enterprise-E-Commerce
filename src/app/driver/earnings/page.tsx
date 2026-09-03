'use client';

import React from 'react';
import { DollarSign, Banknote, Award, CheckCircle2, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';

export default function DriverEarningsPage() {
  const completedDrops = [
    { id: 1, orderNumber: 'LUM-2026-8893', client: 'Nadia Fahmy', district: 'New Cairo', fee: 450, tip: 150, time: '11:40 AM' },
    { id: 2, orderNumber: 'LUM-2026-8891', client: 'Farida Mansour', district: 'Zamalek', fee: 550, tip: 200, time: '02:15 PM' },
  ];

  return (
    <div className="space-y-3 pb-6">
      {/* Earnings Overview Card */}
      <div className="p-4 bg-[#242323] rounded-xl border border-[#333232] shadow-sm">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block mb-1">
          Today&apos;s White-Glove Fleet Earnings
        </span>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-3xl font-bold text-white">1,350 <span className="text-sm font-normal text-zinc-400">EGP</span></h2>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2 Drops Completed</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#333232] text-xs">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase block">Base Delivery Fee</span>
            <span className="font-bold text-white">1,000 EGP</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase block">Client Gratuity (Tips)</span>
            <span className="font-bold text-emerald-400">350 EGP</span>
          </div>
        </div>
      </div>

      {/* Cash On Delivery Deposit Settlement Card */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase">
            <Banknote className="w-4 h-4" />
            <span>COD Cash in Custody to Deposit</span>
          </span>
          <span className="font-mono text-base font-bold text-white">18,500 EGP</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-snug">
          Collected cash to be reconciled and remitted at Cairo West Hub (Sheikh Zayed) at shift conclusion.
        </p>
      </div>

      {/* Performance Scorecard */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] space-y-2 text-xs">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block">
          Courier Service Scorecard
        </span>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-[#1c1b1b] rounded-lg">
            <span className="text-base font-bold text-amber-400 block">4.98 ★</span>
            <span className="text-[10px] text-zinc-400">Rating</span>
          </div>
          <div className="p-2 bg-[#1c1b1b] rounded-lg">
            <span className="text-base font-bold text-emerald-400 block">99.4%</span>
            <span className="text-[10px] text-zinc-400">On-Time</span>
          </div>
          <div className="p-2 bg-[#1c1b1b] rounded-lg">
            <span className="text-base font-bold text-white block">342</span>
            <span className="text-[10px] text-zinc-400">Lifetime</span>
          </div>
        </div>
      </div>

      {/* Completed Deliveries Ledger */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold px-1 block">
          Completed Drops Today
        </span>

        {completedDrops.map((drop) => (
          <div
            key={drop.id}
            className="p-3 bg-[#242323] rounded-xl border border-[#333232] flex items-center justify-between text-xs"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="font-semibold text-white">{drop.client}</h4>
              </div>
              <span className="text-[11px] text-zinc-400">{drop.district} • #{drop.orderNumber} • {drop.time}</span>
            </div>

            <div className="text-right">
              <span className="font-bold text-white block">+{drop.fee + drop.tip} EGP</span>
              <span className="text-[10px] text-zinc-400">Fee: {drop.fee} • Tip: {drop.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
