'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, CheckCircle2, Navigation, Clock, ShieldCheck, Banknote } from 'lucide-react';

export default function DriverDeliveriesPage() {
  const deliveries = [
    {
      id: 1,
      orderNumber: 'LUM-2026-8891',
      customer: 'Farida Mansour',
      phone: '+20 102 334 8812',
      address: '14 Hassan Sabry Street, Penthouse B, Zamalek, Cairo',
      items: 'Torso Ceramic Luminaire, Monolithic Travertine Plinth',
      cod: '0.00 EGP (Prepaid)',
      status: 'out_for_delivery',
      otpHint: '8492',
    },
    {
      id: 2,
      orderNumber: 'LUM-2026-8892',
      customer: 'Sherif Aly',
      phone: '+20 111 892 0019',
      address: 'Palm Hills Golf Views, Villa 124, 6th of October',
      items: 'Torso Ceramic Luminaire',
      cod: '18,500.00 EGP',
      status: 'assigned',
      otpHint: '3318',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-semibold block">
          D009 • PAGE 082
        </span>
        <h3 className="font-bold text-base text-white">Assigned Delivery Route</h3>
        <p className="text-xs text-zinc-400">Greater Cairo White-Glove Handover Schedule</p>
      </div>

      <div className="space-y-3">
        {deliveries.map((del, index) => (
          <div key={del.id} className="p-4 bg-[#242323] rounded-2xl border border-[#333232] space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">{del.customer}</h4>
                  <span className="font-mono text-[10px] text-zinc-400">#{del.orderNumber}</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-blue-500/20 text-blue-400">
                {del.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="text-xs space-y-1 text-zinc-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{del.address}</span>
              </div>
              <div className="p-2 bg-[#1c1b1b] rounded-lg text-[11px] text-zinc-400">
                <span className="font-semibold text-white">Crated Objects:</span> {del.items}
              </div>
              <div className="flex justify-between text-[11px] pt-1">
                <span className="text-zinc-400">Payment:</span>
                <span className="font-bold text-amber-400">{del.cod}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#333232]">
              <Link
                href="/driver/navigation"
                className="py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 hover:bg-zinc-200 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GPS Nav</span>
              </Link>
              <Link
                href="/driver/pod"
                className="py-2.5 bg-[#333232] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 hover:bg-[#444343] transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Handover (POD)</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
