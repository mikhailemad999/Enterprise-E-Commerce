'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Plus, Printer, XCircle, CheckCircle2 } from 'lucide-react';

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D006 • PAGE 052
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Client Orders & Sales Ledger
          </h1>
        </div>

        <Link
          href="/checkout"
          target="_blank"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Order</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Commission #</th>
              <th className="p-sm">Private Client</th>
              <th className="p-sm">Payment Method</th>
              <th className="p-sm">Total Invoiced</th>
              <th className="p-sm">Pipeline Status</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-on-surface">#{ord.order_number}</td>
                <td className="p-sm">
                  <span className="font-semibold text-on-surface block">{ord.guest_name}</span>
                  <span className="text-[11px] text-secondary font-mono">{ord.guest_phone}</span>
                </td>
                <td className="p-sm uppercase text-secondary font-medium">{ord.payment_method?.replace(/_/g, ' ')}</td>
                <td className="p-sm font-headline-sm font-bold text-on-surface">
                  {new Intl.NumberFormat('en-US').format(ord.total_amount)} EGP
                </td>
                <td className="p-sm">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm uppercase font-semibold text-[10px]">
                    {ord.status?.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-sm text-right space-x-1">
                  <Link
                    href={`/admin/orders/${ord.id}`}
                    target="_blank"
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold inline-block"
                  >
                    View E-Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
