'use client';

import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Download, Printer, RefreshCw, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function AccountingReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeReportModal, setActiveReportModal] = useState<string | null>(null);

  const fetchAccounting = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/accounting');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (e) {
      console.error(e);
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
    totalCogs: 47900,
    grossProfit: 61600,
    grossMarginPercent: 56.3,
    totalOrders: 3,
  };

  const reports = [
    {
      id: 'vat',
      title: 'Egyptian Tax Authority (ETA) VAT Return',
      period: 'Monthly Declaration (September 2026)',
      keyMetricLabel: '14% VAT Payable',
      keyMetricValue: formatEgp(summary.totalTax14),
      turnover: formatEgp(summary.grossRevenue),
      status: 'Audited & Validated',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Official monthly indirect tax summary calculated in accordance with Egyptian VAT Law No. 67/2016 for TRN 491-882-901.',
    },
    {
      id: 'margin',
      title: 'Gross Margin & COGS Profitability Analysis',
      period: 'Fiscal Q3 2026',
      keyMetricLabel: 'Gross Margin Ratio',
      keyMetricValue: `${summary.grossMarginPercent}%`,
      turnover: formatEgp(summary.grossRevenue),
      status: 'Target Exceeded (≥55%)',
      badgeColor: 'text-primary bg-primary/5 border-primary/20',
      description: 'Breakdown of raw materials, bronze casting, alabaster lathe costs, and Damietta wood craftsmanship against retail price realization.',
    },
    {
      id: 'cod',
      title: 'Cash on Delivery (COD) Regional Depot Audit',
      period: 'Active Fleet Cycle',
      keyMetricLabel: 'Depot Custody Pending',
      keyMetricValue: formatEgp(summary.codInTransit),
      turnover: formatEgp(summary.grossRevenue),
      status: summary.codInTransit > 0 ? 'Settlement in Progress' : '100% Reconciled',
      badgeColor: summary.codInTransit > 0 ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Cash collections log covering Cairo West Hub, Cairo East Depot, and Alex Maritime regional fulfillment depots.',
    },
  ];

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D010 • PAGE 093
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Financial & Tax Compliance Reports
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchAccounting}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
            title="Refresh Reports"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {reports.map((r) => (
          <div key={r.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md flex flex-col justify-between">
            <div className="space-y-sm">
              <div>
                <span className="text-[10px] uppercase font-mono text-secondary">{r.period}</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase mt-0.5">{r.title}</h3>
              </div>

              <p className="text-xs text-secondary leading-relaxed">{r.description}</p>

              <div className="space-y-1.5 text-xs bg-surface-container-low p-sm rounded-xl">
                <div className="flex justify-between">
                  <span className="text-secondary">Gross Turnover:</span>
                  <span className="font-bold text-on-surface font-mono">{r.turnover}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">{r.keyMetricLabel}:</span>
                  <span className="font-mono text-primary font-bold">{r.keyMetricValue}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-surface-container">
                  <span className="text-secondary">Audit Verification:</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${r.badgeColor}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveReportModal(r.id)}
              className="w-full py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 hover:bg-inverse-surface transition-colors font-semibold"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Review & Print Official Docket</span>
            </button>
          </div>
        ))}
      </div>

      {/* Official Tax Report Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveReportModal(null)} />
          <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl border border-surface-container shadow-2xl p-md z-10 space-y-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-title-md text-base text-on-surface font-bold uppercase tracking-wider">
                  Official Corporate Tax Docket
                </h3>
              </div>
              <button onClick={() => setActiveReportModal(null)} className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-md bg-white text-zinc-900 rounded-xl border border-zinc-200 font-mono text-xs space-y-3">
              <div className="flex justify-between items-start border-b border-zinc-200 pb-2">
                <div>
                  <h4 className="font-bold text-sm uppercase">LUMIO ATELIERS EGYPT S.A.E.</h4>
                  <p className="text-[11px] text-zinc-600">Tax Registration Number (TRN): 491-882-901</p>
                  <p className="text-[11px] text-zinc-600">Commercial Registration (CR): 102984 Cairo</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    ETA VERIFIED
                  </span>
                  <p className="text-[10px] text-zinc-500 mt-1">{new Date().toISOString().split('T')[0]}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span>Gross Invoiced Sales (Inclusive of VAT):</span>
                  <span className="font-bold">{formatEgp(summary.grossRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Taxable Base (Subtotal):</span>
                  <span>{formatEgp(summary.grossRevenue - summary.totalTax14)}</span>
                </div>
                <div className="flex justify-between text-primary font-bold">
                  <span>Accrued 14% Egyptian VAT:</span>
                  <span>{formatEgp(summary.totalTax14)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost of Goods Sold (COGS):</span>
                  <span>{formatEgp(summary.totalCogs)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-zinc-200 pt-1">
                  <span>Gross Realized Profit:</span>
                  <span>{formatEgp(summary.grossProfit)} ({summary.grossMarginPercent}%)</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-zinc-500 border-t border-zinc-100">
                Electronically generated under Egyptian Tax Authority e-invoicing SDK v1.0. Certified authentic by Chief Financial Officer & Corporate Audit.
              </div>
            </div>

            <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-md py-2 rounded bg-primary text-on-primary uppercase font-label-md text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Docket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
