'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, CreditCard, FileSpreadsheet, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AccountingDashboardPage() {
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
            ETA Tax E-Invoice (14% VAT) Compliant
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Gross Invoiced Revenue</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">348,700 EGP</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Month to Date</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Egyptian VAT (14%)</span>
          <span className="font-headline-lg text-2xl font-bold text-primary block">48,818 EGP</span>
          <span className="text-[11px] text-secondary mt-1 block">Accrued Tax Due</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">COD In Transit</span>
          <span className="font-headline-lg text-2xl font-bold text-amber-600 block">18,500 EGP</span>
          <span className="text-[11px] text-secondary mt-1 block">Awaiting Depot Reconciliation</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">RMA Refunds Issued</span>
          <span className="font-headline-lg text-2xl font-bold text-on-surface block">0.00 EGP</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Zero Dispute Ratio</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Payment Methods Inflow</h3>
            <Link href="/accounting/payments" className="text-xs text-primary uppercase font-semibold hover:underline">
              Inspect →
            </Link>
          </div>
          <div className="space-y-2 text-xs divide-y divide-surface-container">
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Paymob / Visa & Mastercard:</span>
              <span className="font-bold text-on-surface">230,200 EGP (66%)</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Cash on Delivery (COD):</span>
              <span className="font-bold text-on-surface">69,000 EGP (20%)</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-secondary">Corporate Bank Wire (Direct):</span>
              <span className="font-bold text-on-surface">49,500 EGP (14%)</span>
            </div>
          </div>
        </div>

        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">Tax E-Invoice Audit</h3>
            <Link href="/accounting/reports" className="text-xs text-primary uppercase font-semibold hover:underline">
              Full Reports →
            </Link>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            All customer transactions are automatically formatted and stamped with Egyptian Tax Authority e-invoicing schema standards (TRN: 491-882-901).
          </p>
          <div className="p-2.5 bg-surface-container-low rounded-xl text-xs font-mono text-secondary space-y-1">
            <div>• E-Invoice Sync: Real-time</div>
            <div>• Withholding Tax: 0%</div>
            <div>• Currency ISO: EGP (818)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
