'use client';

import React, { useState } from 'react';
import { CheckSquare, QrCode, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WarehousePickingPage() {
  const [items, setItems] = useState([
    { id: 1, orderNumber: 'LUM-2026-8891', client: 'Farida Mansour', sku: 'LUM-LGT-001', name: 'Torso Ceramic Luminaire', bin: 'Aisle B-04-Top', qty: 1, scanned: false },
    { id: 2, orderNumber: 'LUM-2026-8891', client: 'Farida Mansour', sku: 'LUM-FUR-002', name: 'Monolithic Travertine Plinth', bin: 'Aisle Heavy-01', qty: 1, scanned: false },
    { id: 3, orderNumber: 'LUM-2026-8892', client: 'Sherif Aly', sku: 'LUM-LGT-001', name: 'Torso Ceramic Luminaire', bin: 'Aisle B-04-Top', qty: 1, scanned: true },
  ]);

  const toggleScan = (id: number) => {
    setItems(items.map(it => it.id === id ? { ...it, scanned: !it.scanned } : it));
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D005 • PAGE 042
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Warehouse Pick Queue & Barcode Verification
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Commission #</th>
              <th className="p-sm">Architectural Object</th>
              <th className="p-sm">Warehouse Bin Location</th>
              <th className="p-sm">Quantity</th>
              <th className="p-sm">Barcode Status</th>
              <th className="p-sm text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-on-surface">#{it.orderNumber}</td>
                <td className="p-sm">
                  <span className="font-semibold text-on-surface block">{it.name}</span>
                  <span className="text-[11px] text-secondary font-mono">{it.sku}</span>
                </td>
                <td className="p-sm font-mono text-primary font-bold">{it.bin}</td>
                <td className="p-sm font-mono">{it.qty} unit</td>
                <td className="p-sm">
                  {it.scanned ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Barcode Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
                      <QrCode className="w-3.5 h-3.5" /> Awaiting Handheld Scan
                    </span>
                  )}
                </td>
                <td className="p-sm text-right">
                  <button
                    onClick={() => toggleScan(it.id)}
                    className={`px-2.5 py-1 rounded font-label-md text-[10px] uppercase font-bold transition-colors ${
                      it.scanned
                        ? 'bg-surface-container-low text-secondary'
                        : 'bg-primary text-on-primary hover:bg-inverse-surface'
                    }`}
                  >
                    {it.scanned ? 'Unmark' : 'Scan & Confirm Item'}
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
