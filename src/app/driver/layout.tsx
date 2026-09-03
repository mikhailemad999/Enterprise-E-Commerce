'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ListOrdered,
  Navigation,
  CheckCircle2,
  DollarSign,
  Truck,
  Battery,
  Phone,
  Power,
} from 'lucide-react';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(true);

  const tabs = [
    { name: 'Manifest', href: '/driver', icon: ListOrdered },
    { name: 'Navigation', href: '/driver/navigation', icon: Navigation },
    { name: 'Proof of Delivery', href: '/driver/pod', icon: CheckCircle2 },
    { name: 'Earnings', href: '/driver/earnings', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-between antialiased selection:bg-white selection:text-black">
      {/* Mobile Device Container wrapper */}
      <div className="w-full max-w-md min-h-screen bg-[#1c1b1b] flex flex-col shadow-2xl relative border-x border-[#2c2b2b]">
        {/* Top Telemetry Header */}
        <header className="p-3 bg-[#141414] border-b border-[#2c2b2b] flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              KM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-white">Karim Mostafa</span>
                <span className="text-[10px] text-zinc-400 font-mono">ق م ر 8421</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <span className="flex items-center gap-0.5">
                  <Battery className="w-3 h-3 text-emerald-400" />
                  <span>94%</span>
                </span>
                <span>•</span>
                <span>Mercedes Sprinter VIP</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
              isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </button>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-3 pb-20 overflow-y-auto">{children}</main>

        {/* Bottom Tab Navigation Bar */}
        <nav className="fixed bottom-0 w-full max-w-md bg-[#141414]/95 backdrop-blur-md border-t border-[#2c2b2b] flex items-center justify-around py-2 z-30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
                  active ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-zinc-500'}`} />
                <span className="text-[10px] uppercase tracking-wider">{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
