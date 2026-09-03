'use client';

import React, { useState } from 'react';
import { Grid, Plus, Edit, Trash2 } from 'lucide-react';

export default function ProductCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Lighting & Luminaires', slug: 'lighting', count: 3, description: 'Fayoum terracotta lamps, raw unlacquered bronze sconces, hand-lathed Upper Egypt alabaster discs.' },
    { id: 2, name: 'Sculptural Furniture', slug: 'furniture', count: 3, description: 'Roman travertine plinths, low-slung smoked oak seating, Calacatta Viola coffee tables.' },
    { id: 3, name: 'Raw Ceramic Objects', slug: 'ceramics', count: 1, description: 'Asymmetrical hand-built volcanic basalt vessels and mineral wash urns.' },
    { id: 4, name: 'Architectural Surfaces', slug: 'surfaces', count: 0, description: 'Bookmatched Egyptian marble and limestone panels for high-end residential interiors.' },
    { id: 5, name: 'Flax Linens & Textiles', slug: 'textiles', count: 1, description: 'Nubian heavy flax throws loomed on heritage shuttle looms in Akhmim, Upper Egypt.' },
  ]);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D003 • PAGE 023
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Category Hierarchies
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {categories.map((c) => (
          <div key={c.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-sm">
            <div className="flex justify-between items-start">
              <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">{c.name}</h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container-low text-secondary font-bold">
                {c.count} Silhouettes
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">{c.description}</p>
            <div className="pt-2 border-t border-surface-container flex justify-between items-center text-[11px] font-mono text-secondary">
              <span>/{c.slug}</span>
              <span className="text-emerald-700 font-semibold uppercase">Published</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
