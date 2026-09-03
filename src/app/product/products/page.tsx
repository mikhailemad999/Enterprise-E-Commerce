'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit, Eye, Archive } from 'lucide-react';

export default function ProductProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
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
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D003 • PAGE 022
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Architectural Products & SKU Matrix
          </h1>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 bg-surface-container-low border border-surface-container rounded-lg text-xs font-mono text-on-surface"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Silhouette</th>
              <th className="p-sm">SKU</th>
              <th className="p-sm">Category</th>
              <th className="p-sm">Material</th>
              <th className="p-sm">Retail Price</th>
              <th className="p-sm">Available Stock</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm">
                  <div className="flex items-center gap-2">
                    <img src={p.image} alt={p.name} className="w-9 h-11 object-cover rounded bg-surface-container shrink-0 grayscale contrast-105" />
                    <div>
                      <span className="font-semibold text-on-surface block">{p.name}</span>
                      <span className="text-[10px] text-secondary font-mono">{p.brand}</span>
                    </div>
                  </div>
                </td>
                <td className="p-sm font-mono font-semibold text-on-surface">{p.sku}</td>
                <td className="p-sm text-secondary">{p.category_name}</td>
                <td className="p-sm text-secondary">{p.material}</td>
                <td className="p-sm font-headline-sm font-bold text-on-surface">
                  {new Intl.NumberFormat('en-US').format(p.price)} EGP
                </td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                    Number(p.total_available) < 15 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {p.total_available} units
                  </span>
                </td>
                <td className="p-sm text-right space-x-1">
                  <a
                    href={`/product/${p.slug}`}
                    target="_blank"
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold inline-block"
                  >
                    View PDP
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
