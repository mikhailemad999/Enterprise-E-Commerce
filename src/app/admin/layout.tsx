'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Boxes,
  Truck,
  FileText,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Bell,
  Search,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Operational Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Multi-Warehouse WMS', href: '/admin/inventory', icon: Boxes },
    { name: 'Live Fleet Dispatch', href: '/admin/dispatch', icon: Truck },
    { name: 'OMS & E-Invoicing', href: '/admin/orders/1', icon: FileText },
    { name: 'Returns & RMA', href: '/admin/returns', icon: RotateCcw },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-on-surface antialiased">
      {/* Back Office Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-surface-container flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Logo Brand Header */}
          <div className="p-sm md:p-md border-b border-surface-container flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-base">
                L
              </div>
              <div>
                <span className="font-headline-sm text-base tracking-widest text-on-surface uppercase font-bold block">
                  LUMIO OMS
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-secondary -mt-1 block">
                  Back-Office Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="p-xs space-y-1">
            <span className="px-sm py-1.5 font-label-sm text-[10px] uppercase tracking-wider text-secondary block font-semibold">
              Management Modules
            </span>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-sm px-sm py-2 rounded-lg font-label-md text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'text-secondary hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-sm border-t border-surface-container space-y-sm">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container text-xs font-medium text-secondary transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>Customer Storefront</span>
            </span>
            <span className="text-[10px] text-outline uppercase font-mono">/</span>
          </Link>

          <Link
            href="/driver"
            target="_blank"
            className="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container text-xs font-medium text-secondary transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-primary" />
              <span>Driver Fleet App</span>
            </span>
            <span className="text-[10px] text-outline uppercase font-mono">/driver</span>
          </Link>

          <div className="flex items-center gap-sm pt-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">
              LN
            </div>
            <div className="text-xs">
              <span className="font-semibold text-on-surface block leading-tight">Layla Nour</span>
              <span className="text-[10px] text-secondary uppercase font-semibold">Super Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Back-Office Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-surface-container px-4 sm:px-margin flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Cairo Fleet Online • MySQL 8.0 Synchronized</span>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <span className="text-xs text-secondary hidden sm:inline">
              Host: 127.0.0.1:3306 (lumio_commerce)
            </span>
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-margin bg-surface">{children}</main>
      </div>
    </div>
  );
}
