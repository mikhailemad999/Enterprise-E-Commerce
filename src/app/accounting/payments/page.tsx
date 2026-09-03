'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Download, Printer } from 'lucide-react';

export default function AccountingPaymentsPage() {
  const [payments, setPayments] = useState([
    { id: 1, orderNumber: 'LUM-2026-8891', client: 'Farida Mansour', method: 'Paymob Card', ref: 'PAY-CAI-9921', amount: 50500, tax: 6202.63, status: 'settled', date: '2026-09-03' },
    { id: 2, orderNumber: 'LUM-2026-8892', client: 'Sherif Aly', method: 'Cash on Delivery (COD)', ref: 'COD-GIZ-3318', amount: 18500, tax: 2271.93, status: 'in_custody', date: '2026-09-04' },
    { id: 3, orderNumber: 'LUM-2026-8893', client: 'Nadia Fahmy', method: 'Bank Wire', ref: 'CIB-EGY-8841', amount: 42500, tax: 5220.00, status: 'settled', date: '2026-09-02' },
  ]);

  const handleExport = () => {
    alert('Exporting official CSV ledger for Egyptian Tax Authority (TRN-491-882-901)');
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D010 • PAGE 092
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Payments, E-Invoices & COD Settlements
          </h1>
        </div>

        <button
          onClick={handleExport}
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export ETA Tax Ledger</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Commission #</th>
              <th className="p-sm">Private Client</th>
              <th className="p-sm">Payment Mode</th>
              <th className="p-sm">Gateway Ref</th>
              <th className="p-sm">Total Gross</th>
              <th className="p-sm">14% VAT</th>
              <th className="p-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-on-surface">#{p.orderNumber}</td>
                <td className="p-sm font-semibold text-on-surface">{p.client}</td>
                <td className="p-sm uppercase text-secondary font-medium">{p.method}</td>
                <td className="p-sm font-mono text-secondary">{p.ref}</td>
                <td className="p-sm font-headline-sm font-bold text-on-surface">
                  {new Intl.NumberFormat('en-US').format(p.amount)} EGP
                </td>
                <td className="p-sm font-mono text-secondary">
                  {new Intl.NumberFormat('en-US').format(p.tax)} EGP
                </td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    p.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.status.replace(/_/g, ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
