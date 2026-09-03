'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Server,
  Users,
  Building2,
  Activity,
  CheckCircle2,
  FileText,
  Lock,
  ArrowUpRight,
  Database,
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const [stats, setStats] = useState({
    tenants: 4,
    activeUsers: 12,
    systemHealth: '99.98%',
    dbStatus: 'Connected (MySQL 8.0: 3306)',
    recentAuditCount: 28,
  });

  const tenants = [
    { id: 1, name: 'Lumio Cairo Flagship', domain: 'cairo.lumio.design', tier: 'Enterprise Plus', status: 'active', monthlyRevenue: '540,000 EGP' },
    { id: 2, name: 'Lumio Alexandria Port Atelier', domain: 'alex.lumio.design', tier: 'Enterprise Custom', status: 'active', monthlyRevenue: '310,000 EGP' },
    { id: 3, name: 'Lumio Giza Gallery & Hub', domain: 'giza.lumio.design', tier: 'Professional', status: 'active', monthlyRevenue: '185,000 EGP' },
    { id: 4, name: 'Lumio Red Sea Hospitality Suites', domain: 'redsea.lumio.design', tier: 'Boutique', status: 'active', monthlyRevenue: '95,000 EGP' },
  ];

  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D001 • PLATFORM GOVERNANCE
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Super Admin Control Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Strict Isolation Active</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
            Active Tenant Ateliers
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-lg text-3xl font-bold text-on-surface">4</span>
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">100% Operational In Egypt</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
            Global Department Users
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-lg text-3xl font-bold text-on-surface">12</span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] text-secondary mt-1 block">12 Isolated Roles (D001-D012)</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
            Platform Infrastructure
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-lg text-2xl font-bold text-emerald-700">99.98%</span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] text-secondary mt-1 block">Cairo Cloud Node • Zero Downtime</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
            Database Cluster
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-lg text-base font-mono font-bold text-on-surface">Port 3306</span>
            <Database className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">MySQL 8.0 `lumio_commerce`</span>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-lg font-bold text-on-surface uppercase tracking-wider">
            All Tenants & Workspaces
          </h3>
          <Link
            href="/super-admin/tenants"
            className="text-xs uppercase tracking-wider text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span>Manage Tenants</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-sm">Tenant Atelier</th>
                <th className="p-sm">Domain</th>
                <th className="p-sm">License Tier</th>
                <th className="p-sm">Monthly Volume</th>
                <th className="p-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-sm font-semibold text-on-surface">{t.name}</td>
                  <td className="p-sm font-mono text-secondary">{t.domain}</td>
                  <td className="p-sm">{t.tier}</td>
                  <td className="p-sm font-headline-sm font-bold text-on-surface">{t.monthlyRevenue}</td>
                  <td className="p-sm">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
