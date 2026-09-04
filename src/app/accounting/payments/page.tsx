'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Download, Printer, RefreshCw, Check, Clock, AlertCircle } from 'lucide-react';

export default function AccountingPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [settlingId, setSettlingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/accounting');
      const json = await res.json();
      if (json.success && json.data?.paymentsLedger) {
        setPayments(json.data.paymentsLedger);
      }
    } catch (e) {
      console.error('Failed to fetch payments ledger:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSettleCod = async (orderId: number, orderNum: string) => {
    setSettlingId(orderId);
    try {
      const res = await fetch('/api/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'settle_cod',
          orderId,
          notes: 'Driver handed over cash at regional fulfillment depot. Settle invoice.',
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Order #${orderNum} COD settled and marked as Paid.`);
        fetchPayments();
      } else {
        alert('Settlement failed: ' + json.error);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setSettlingId(null);
    }
  };

  const handleExportCsv = () => {
    if (payments.length === 0) {
      alert('No payments to export.');
      return;
    }

    const headers = ['Order Number', 'Client Name', 'Payment Method', 'Gateway Reference', 'Gross Amount (EGP)', '14% VAT (EGP)', 'Net Subtotal (EGP)', 'Payment Status', 'Order Status', 'Invoice Date', 'ETA TRN'];
    const rows = payments.map((p) => [
      p.orderNumber,
      `"${p.client}"`,
      p.method,
      p.ref,
      p.amount.toFixed(2),
      p.tax.toFixed(2),
      p.subtotal.toFixed(2),
      p.paymentStatus,
      p.orderStatus,
      p.date,
      '491-882-901',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ETA_Tax_Ledger_TRN_491882901_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ETA Tax Ledger CSV exported successfully.');
  };

  const filtered = payments.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'settled') return p.paymentStatus === 'paid';
    if (filter === 'pending') return p.paymentStatus !== 'paid';
    return true;
  });

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-md py-3 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-700 shadow-xl flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D010 • PAGE 092
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Payments, E-Invoices & COD Settlements
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCsv}
            className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Export ETA Tax Ledger</span>
          </button>
          <button
            onClick={fetchPayments}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
            title="Refresh Ledger"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-secondary hover:text-on-surface'
          }`}
        >
          All Transactions ({payments.length})
        </button>
        <button
          onClick={() => setFilter('settled')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'settled'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-secondary hover:text-on-surface'
          }`}
        >
          Settled / Paid
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'pending'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-secondary hover:text-on-surface'
          }`}
        >
          Pending / In Custody (COD)
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-sm">Commission #</th>
                <th className="p-sm">Private Client</th>
                <th className="p-sm">Payment Mode</th>
                <th className="p-sm">Gateway Ref</th>
                <th className="p-sm">Total Gross</th>
                <th className="p-sm">14% VAT</th>
                <th className="p-sm text-center">Status</th>
                <th className="p-sm text-right">Reconciliation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-secondary">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Synchronizing accounting transaction ledger...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((p) => {
                  const isSettled = p.paymentStatus === 'paid';
                  const isCodPending = p.method === 'cash_on_delivery' && !isSettled;

                  return (
                    <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-sm font-mono font-bold text-on-surface">
                        <a href={`/admin/orders/${p.id}`} className="hover:underline text-primary">
                          #{p.orderNumber}
                        </a>
                      </td>
                      <td className="p-sm">
                        <span className="font-semibold text-on-surface block">{p.client}</span>
                        <span className="text-[10px] text-secondary font-mono">{p.date}</span>
                      </td>
                      <td className="p-sm uppercase text-secondary font-medium font-mono text-[11px]">
                        {p.method.replace(/_/g, ' ')}
                      </td>
                      <td className="p-sm font-mono text-secondary text-[11px]">{p.ref}</td>
                      <td className="p-sm font-headline-sm font-bold text-on-surface font-mono">
                        {new Intl.NumberFormat('en-US').format(p.amount)} EGP
                      </td>
                      <td className="p-sm font-mono text-secondary">
                        {new Intl.NumberFormat('en-US').format(p.tax)} EGP
                      </td>
                      <td className="p-sm text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            isSettled
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isSettled ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{p.paymentStatus.replace(/_/g, ' ')}</span>
                        </span>
                      </td>
                      <td className="p-sm text-right">
                        {isCodPending ? (
                          <button
                            onClick={() => handleSettleCod(p.id, p.orderNumber)}
                            disabled={settlingId === p.id}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                          >
                            {settlingId === p.id ? 'Settling...' : 'Settle COD Cash'}
                          </button>
                        ) : (
                          <span className="text-[10px] text-secondary uppercase font-semibold font-mono">
                            Reconciled ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-secondary">
                    No transactions found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
