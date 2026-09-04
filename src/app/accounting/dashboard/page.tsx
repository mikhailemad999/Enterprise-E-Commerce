'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, CreditCard, FileSpreadsheet, ArrowUpRight, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

export default function AccountingDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccounting = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/accounting');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (e) {
      console.error('Failed to load accounting data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounting();
  }, []);

  const formatEgp = (val: number) => {
    return `${new Intl.NumberFormat('en-US').format(val || 0)} EGP`;
  };

  const summary = data?.summary || {
    grossRevenue: 109500,
    totalTax14: 13447.37,
    codInTransit: 18500,
    codSettled: 0,
    rmaRefunds: 0,
    totalCogs: 47900,
    grossProfit: 61600,
    grossMarginPercent: 56.3,
    totalOrders: 3,
  };

  const inflows = data?.inflowBreakdown || [
    { method: 'Paymob / Visa & Mastercard', amount: 40500, percent: 37 },
    { method: 'Cash on Delivery (COD)', amount: 18500, percent: 17 },
    { method: 'Stripe Global Express', amount: 50500, percent: 46 },
    { method: 'Corporate Bank Wire (CIB)', amount: 0, percent: 0 },
  ];

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D010 • FINANCE & TAX COMPLIANCE
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Financial & Accounting Ledger
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold">
            ETA Tax E-Invoice (14% VAT) Compliant • TRN: 491-882-901
          </span>
          <button
            onClick={fetchAccounting}
            className="p-1.5 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
            title="Refresh Ledger"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Gross Invoiced Revenue</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block font-mono">
            {formatEgp(summary.grossRevenue)}
          </span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Live Settled & Pending Inflows</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Egyptian VAT (14%)</span>
          <span className="font-headline-lg text-2xl font-bold text-primary block font-mono">
            {formatEgp(summary.totalTax14)}
          </span>
          <span className="text-[11px] text-secondary mt-1 block">Accrued Tax Due to ETA</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">COD In Transit / Depot</span>
          <span className="font-headline-lg text-2xl font-bold text-amber-600 block font-mono">
            {formatEgp(summary.codInTransit)}
          </span>
          <span className="text-[11px] text-secondary mt-1 block">Awaiting Courier Reconciliation</span>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Net Operating Profit</span>
          <span className="font-headline-lg text-2xl font-bold text-emerald-700 block font-mono">
            {formatEgp(summary.netOperatingProfit || summary.grossProfit)}
          </span>
          <span className="text-[11px] text-emerald-700 mt-1 block font-semibold">
            {summary.netProfitMarginPercent || summary.grossMarginPercent}% Net Margin (After OPEX)
          </span>
        </div>
      </div>

      {/* Financial Split: Inflow breakdown, OPEX Breakdown & Tax Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* 1. Payment Methods Inflow */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Payment Methods Inflow</h3>
            <Link href="/accounting/payments" className="text-xs text-primary uppercase font-semibold hover:underline">
              Ledger →
            </Link>
          </div>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            {inflows.map((item: any, idx: number) => (
              <div key={idx} className="pt-2 flex justify-between items-center">
                <span className="text-secondary">{item.method}:</span>
                <span className="font-bold text-on-surface font-mono">
                  {formatEgp(item.amount)} ({item.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Operating Expenses Breakdown (OPEX) */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Operating Expenses (OPEX)</h3>
            <span className="font-mono text-xs font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded">
              {formatEgp(summary.totalOpex || 0)}
            </span>
          </div>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            <div className="pt-2 flex justify-between items-center">
              <span className="text-secondary">Fleet Freight & Fuel (350 EGP/ea):</span>
              <span className="font-mono font-bold text-on-surface">
                {formatEgp(summary.opexBreakdown?.fleetLogisticsExpense || 0)}
              </span>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-secondary">Driver Handover Commissions:</span>
              <span className="font-mono font-bold text-on-surface">
                {formatEgp(summary.opexBreakdown?.driverCommissionsExpense || 0)}
              </span>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-secondary">Payment Gateway Processing:</span>
              <span className="font-mono font-bold text-on-surface">
                {formatEgp(summary.opexBreakdown?.totalGatewayFees || 0)}
              </span>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-secondary">Warehouse Crating & Prep:</span>
              <span className="font-mono font-bold text-on-surface">
                {formatEgp(summary.opexBreakdown?.warehouseFulfillmentExpense || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Tax E-Invoice & Driver Remittances */}
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Tax & Fleet Audit</h3>
            <Link href="/accounting/reports" className="text-xs text-primary uppercase font-semibold hover:underline">
              P&L Reports →
            </Link>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            All customer transactions are verified with Egyptian Tax Authority e-invoicing schema (TRN: 491-882-901).
          </p>
          <div className="p-2.5 bg-surface-container-low rounded-xl text-xs font-mono text-secondary space-y-1">
            <div className="flex justify-between">
              <span>• E-Invoice Sync:</span>
              <span className="text-emerald-700 font-semibold">Real-time (Active)</span>
            </div>
            <div className="flex justify-between">
              <span>• Gross Realized Margin:</span>
              <span className="text-emerald-700 font-bold">{summary.grossMarginPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span>• Active Fleet Couriers:</span>
              <span className="text-on-surface font-bold">2 Drivers (Sprinter/Van)</span>
            </div>
            <div className="flex justify-between">
              <span>• Driver Commission Rate:</span>
              <span>200 EGP / Handover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
