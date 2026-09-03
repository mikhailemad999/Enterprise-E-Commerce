'use client';

import React, { useState } from 'react';
import { PackageCheck, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WarehousePackingPage() {
  const [packages, setPackages] = useState([
    { id: 1, orderNumber: 'LUM-2026-8891', client: 'Farida Mansour (Zamalek)', crateType: 'Custom Foam-Padded Wood Crate', weight: '54.8 kg', verified: true, packed: false },
    { id: 2, orderNumber: 'LUM-2026-8892', client: 'Sherif Aly (Palm Hills)', crateType: 'Reinforced Corrugated Box', weight: '7.2 kg', verified: true, packed: true },
  ]);

  const handlePrint = (orderNumber: string) => {
    alert(`Generating White-Glove Dispatch Label & Crating Slip for Order #${orderNumber}`);
  };

  const handleCompletePack = (id: number) => {
    setPackages(packages.map(p => p.id === id ? { ...p, packed: true } : p));
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D005 • PAGE 043
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Packing & Crating Station
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {packages.map((pkg) => (
          <div key={pkg.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-sm font-bold text-on-surface block">Order #{pkg.orderNumber}</span>
                <span className="text-xs text-secondary">{pkg.client}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                pkg.packed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {pkg.packed ? 'Packed & Ready' : 'In Packaging'}
              </span>
            </div>

            <div className="space-y-1 text-xs bg-surface-container-low p-sm rounded-xl">
              <div className="flex justify-between">
                <span className="text-secondary">Crate Spec:</span>
                <span className="font-medium text-on-surface">{pkg.crateType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Gross Parcel Weight:</span>
                <span className="font-mono font-bold text-on-surface">{pkg.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Acoustic Foam Lining:</span>
                <span className="text-emerald-700 font-semibold">Inspection Approved</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handlePrint(pkg.orderNumber)}
                className="flex-1 py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider text-on-surface flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Packing Slip</span>
              </button>

              {!pkg.packed && (
                <button
                  onClick={() => handleCompletePack(pkg.id)}
                  className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:bg-inverse-surface transition-colors"
                >
                  Complete Packing
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
