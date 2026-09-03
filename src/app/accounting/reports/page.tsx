'use client';

import React from 'react';
import { FileSpreadsheet, Download, Printer } from 'lucide-react';

export default function AccountingReportsPage() {
  const reports = [
    { title: 'Monthly Egyptian VAT Tax Declaration', period: 'August 2026', totalRevenue: '348,700 EGP', vatDue: '48,818 EGP', status: 'Reconciled' },
    { title: 'Gross Profit & Cost of Goods Sold (COGS)', period: 'August 2026', totalRevenue: '348,700 EGP', vatDue: 'Gross Margin: 59.2%', status: 'Audited' },
    { title: 'Cash on Delivery (COD) Depot Audit', period: 'Week 35', totalRevenue: '69,000 EGP', vatDue: 'Discrepancy: 0.00 EGP', status: 'Balanced' },
  ];

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D010 • PAGE 093
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Financial & Tax Reports
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {reports.map((r, i) => (
          <div key={i} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
            <div>
              <span className="text-[10px] uppercase font-mono text-secondary">{r.period}</span>
              <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase mt-0.5">{r.title}</h3>
            </div>

            <div className="space-y-1 text-xs bg-surface-container-low p-sm rounded-xl">
              <div className="flex justify-between">
                <span className="text-secondary">Gross Turnover:</span>
                <span className="font-bold text-on-surface">{r.totalRevenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Key Metric:</span>
                <span className="font-mono text-primary font-bold">{r.vatDue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Audit State:</span>
                <span className="text-emerald-700 font-semibold">{r.status}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading ${r.title} as PDF`)}
              className="w-full py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 hover:bg-inverse-surface transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Report</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
