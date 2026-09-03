'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Navigation, CheckCircle2, DollarSign, MapPin, ArrowRight } from 'lucide-react';

export default function DriverDashboardPage() {
  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="p-4 bg-[#242323] rounded-2xl border border-[#333232] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-semibold">
            D009 • COURIER OPERATIONAL PORTAL
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
            Active Shift
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Driver Dashboard</h2>
        <p className="text-xs text-zinc-400">Karim Mostafa • Mercedes Sprinter (ق م ر 8421)</p>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Today Deliveries</span>
          <span className="text-2xl font-bold text-white block mt-0.5">3</span>
          <span className="text-[10px] text-zinc-400">Greater Cairo Region</span>
        </div>
        <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Completed</span>
          <span className="text-2xl font-bold text-emerald-400 block mt-0.5">2</span>
          <span className="text-[10px] text-emerald-400">OTP Handover Verified</span>
        </div>
        <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Remaining Stops</span>
          <span className="text-2xl font-bold text-amber-400 block mt-0.5">1</span>
          <span className="text-[10px] text-zinc-400">Zamalek Penthouse</span>
        </div>
        <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Cash In Custody</span>
          <span className="text-xl font-bold text-white block mt-0.5">18,500</span>
          <span className="text-[10px] text-amber-400">EGP to remit to Depot</span>
        </div>
      </div>

      {/* Quick Access to Next Active Stop */}
      <div className="p-4 bg-white text-black rounded-2xl shadow-lg space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold block opacity-60">Next Priority Stop</span>
            <h4 className="font-bold text-base">Farida Mansour (Zamalek)</h4>
            <p className="text-xs text-zinc-700">14 Hassan Sabry Street, Penthouse B</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold uppercase">Stop #1</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href="/driver/navigation"
            className="py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Open GPS HUD</span>
          </Link>
          <Link
            href="/driver/pod"
            className="py-2.5 bg-zinc-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-300 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Handover (POD)</span>
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/driver/deliveries"
          className="w-full py-3 bg-[#242323] border border-[#333232] rounded-xl text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2e2d2d] transition-colors"
        >
          <span>View All Assigned Stops (Manifest)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
