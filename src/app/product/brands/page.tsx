'use client';

import React, { useState } from 'react';
import { Award, MapPin, Globe } from 'lucide-react';

export default function ProductBrandsPage() {
  const brands = [
    { id: 1, name: 'Lumio Ateliers', origin: 'Zamalek & New Cairo, Egypt', specialty: 'Bespoke Architectural Luminaires & Monoliths', status: 'Primary In-House' },
    { id: 2, name: 'Fayoum Pottery Guild', origin: 'Tunis Village, Fayoum Oasis', specialty: 'Raw Terracotta & Mineral Wash Vases', status: 'Artisanal Partner' },
    { id: 3, name: 'Akhmim Heritage Looms', origin: 'Akhmim, Upper Egypt', specialty: 'Heritage Shuttle-Loomed Long-Staple Flax', status: 'Artisanal Partner' },
    { id: 4, name: 'Damietta Joinery House', origin: 'Damietta Port, Egypt', specialty: 'Kiln-Dried Smoked Oak & Walnut Craftsmanship', status: 'Manufacturing Partner' },
  ];

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D003 • PAGE 024
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Atelier Brands & Guilds
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {brands.map((b) => (
          <div key={b.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-sm">
            <div className="flex justify-between items-start">
              <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">{b.name}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold uppercase">
                {b.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{b.origin}</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">{b.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
