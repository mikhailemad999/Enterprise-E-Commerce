'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, FileText, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'LUM-2026-8891',
      date: '2026-09-03',
      total: 50500,
      status: 'out_for_delivery',
      otp: '8492',
      items: [
        { name: 'Torso Ceramic Luminaire', price: 18500, qty: 1 },
        { name: 'Monolithic Travertine Plinth', price: 32000, qty: 1 },
      ],
    },
    {
      id: 3,
      orderNumber: 'LUM-2026-8893',
      date: '2026-08-28',
      total: 42500,
      status: 'delivered',
      otp: '5519',
      items: [
        { name: 'Egyptian Flax Lounge Chair', price: 42500, qty: 1 },
      ],
    },
  ]);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D012 • PAGE 112
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            My Architectural Commissions
          </h1>
        </div>
      </div>

      <div className="space-y-md">
        {orders.map((ord) => (
          <div key={ord.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-sm gap-2">
              <div>
                <span className="font-mono font-bold text-base text-on-surface">Commission #{ord.orderNumber}</span>
                <p className="text-xs text-secondary">Ordered on {ord.date} • Handover OTP: <strong className="font-mono text-primary">{ord.otp}</strong></p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                  ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {ord.status.replace(/_/g, ' ')}
                </span>
                <span className="font-headline-sm text-base font-bold text-on-surface">
                  {new Intl.NumberFormat('en-US').format(ord.total)} EGP
                </span>
              </div>
            </div>

            <div className="divide-y divide-surface-container text-xs">
              {ord.items.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <span className="font-medium text-on-surface">{item.name} (x{item.qty})</span>
                  <span className="text-secondary font-mono">{new Intl.NumberFormat('en-US').format(item.price)} EGP</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-1 border-t border-surface-container">
              <Link
                href={`/tracking/${ord.orderNumber}`}
                target="_blank"
                className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Live Fleet GPS Tracking</span>
              </Link>

              <Link
                href="/account"
                target="_blank"
                className="px-sm py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Return (RMA)</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
