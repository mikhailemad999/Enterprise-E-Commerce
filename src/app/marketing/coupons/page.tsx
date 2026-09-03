'use client';

import React, { useState } from 'react';
import { Ticket, Plus, CheckCircle2 } from 'lucide-react';

export default function MarketingCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'LUMIO10', discount: '10% Discount', minOrder: '10,000 EGP', uses: 38, limit: 500, active: true },
    { id: 2, code: 'ATELIERVIP', discount: '5,000 EGP Flat Credit', minOrder: '35,000 EGP', uses: 14, limit: 100, active: true },
  ]);

  const toggleCoupon = (id: number) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D011 • PAGE 103
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            VIP Coupons & Privilege Codes
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Coupon Code</th>
              <th className="p-sm">Benefit</th>
              <th className="p-sm">Minimum Order</th>
              <th className="p-sm">Redemption Progress</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-primary text-sm">{c.code}</td>
                <td className="p-sm font-medium text-on-surface">{c.discount}</td>
                <td className="p-sm text-secondary font-mono">{c.minOrder}</td>
                <td className="p-sm font-mono">{c.uses} / {c.limit} used</td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {c.active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="p-sm text-right">
                  <button
                    onClick={() => toggleCoupon(c.id)}
                    className="px-2.5 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold"
                  >
                    {c.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
