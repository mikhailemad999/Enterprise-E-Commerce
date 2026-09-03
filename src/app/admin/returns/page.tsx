'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, RefreshCw, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';

export default function RmaManagementPage() {
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = async () => {
    try {
      const res = await fetch('/api/rma');
      const json = await res.json();
      if (json.success) {
        setReturns(json.returns || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleUpdateRma = async (id: number, status: string, restock: boolean) => {
    try {
      const res = await fetch('/api/rma', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, restock_confirmed: restock }),
      });
      const json = await res.json();
      if (json.success) {
        fetchReturns();
      }
    } catch (e: any) {
      alert('Failed to update RMA: ' + e.message);
    }
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-0.5">
            Reverse Logistics & Quality Assurance
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
            Returns & RMA Management
          </h1>
        </div>

        <button
          onClick={fetchReturns}
          className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-sm">RMA Docket</th>
                <th className="p-sm">Commission #</th>
                <th className="p-sm">Client</th>
                <th className="p-sm">Justification</th>
                <th className="p-sm">Value</th>
                <th className="p-sm">Restock Status</th>
                <th className="p-sm">Status</th>
                <th className="p-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-secondary">
                    Accessing Reverse Logistics Queue...
                  </td>
                </tr>
              ) : returns.length > 0 ? (
                returns.map((rma) => (
                  <tr key={rma.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-sm font-mono font-bold text-on-surface">{rma.rma_number}</td>
                    <td className="p-sm text-secondary font-mono">#{rma.order_number}</td>
                    <td className="p-sm font-medium text-on-surface">{rma.customer_name}</td>
                    <td className="p-sm text-secondary max-w-xs truncate">{rma.reason}</td>
                    <td className="p-sm font-headline-sm font-bold text-on-surface">
                      {new Intl.NumberFormat('en-US').format(rma.refund_amount)} EGP
                    </td>
                    <td className="p-sm">
                      {rma.restock_confirmed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[10px]">
                          <Check className="w-3 h-3" /> Restocked
                        </span>
                      ) : (
                        <span className="text-secondary text-[10px]">Pending Inspection</span>
                      )}
                    </td>
                    <td className="p-sm">
                      <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm uppercase font-semibold text-[10px]">
                        {rma.status}
                      </span>
                    </td>
                    <td className="p-sm text-right space-x-1">
                      {rma.status !== 'refunded' && (
                        <>
                          <button
                            onClick={() => handleUpdateRma(rma.id, 'refunded', true)}
                            className="px-2 py-1 bg-primary text-on-primary rounded text-[10px] font-label-md uppercase font-bold hover:bg-inverse-surface"
                          >
                            Restock & Refund
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-secondary">
                    No open RMA requests.
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
