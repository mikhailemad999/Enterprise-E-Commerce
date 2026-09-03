'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, AlertTriangle, CheckCircle2, ArrowUpRight, Package, Plus } from 'lucide-react';

export default function ProductDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const lowStock = products.filter((p) => Number(p.total_available) < 15);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D003 • MERCHANDISING STUDIO
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Product & Catalog Dashboard
          </h1>
        </div>

        <Link
          href="/product/products"
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Silhouette</span>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Active Silhouettes</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">{products.length}</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Live on Storefront</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Low Stock Alerts</span>
          <span className="font-headline-lg text-3xl font-bold text-amber-600 block">{lowStock.length}</span>
          <span className="text-[11px] text-secondary mt-1 block">Threshold &lt; 15 units</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Catalog Categories</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">5</span>
          <span className="text-[11px] text-secondary mt-1 block">Lighting, Furniture, Ceramics...</span>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">Draft Silhouettes</span>
          <span className="font-headline-lg text-3xl font-bold text-on-surface block">0</span>
          <span className="text-[11px] text-emerald-700 mt-1 block">All Published</span>
        </div>
      </div>

      {/* Low Stock Attention List */}
      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-md shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-base font-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Low Stock Attention Queue ({lowStock.length})</span>
          </h3>
          <Link href="/product/products" className="text-xs uppercase text-primary font-semibold hover:underline">
            View All Products →
          </Link>
        </div>

        <div className="divide-y divide-surface-container">
          {lowStock.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between text-xs gap-sm">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-14 rounded bg-surface-container overflow-hidden shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale contrast-105" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">{p.name}</h4>
                  <span className="text-secondary font-mono text-[11px]">SKU: {p.sku} • {p.material}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-sm font-bold text-amber-600 block">
                  {p.total_available} units left
                </span>
                <span className="text-[11px] text-secondary">{new Intl.NumberFormat('en-US').format(p.price)} EGP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
