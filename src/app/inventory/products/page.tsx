'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, Search, Building2 } from 'lucide-react';

export default function InventoryProductsPage() {
  const [data, setData] = useState<any>({ inventory: [], warehouses: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/inventory');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = (data.inventory || []).filter((item: any) =>
    item.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.sku?.toLowerCase().includes(search.toLowerCase()) ||
    item.warehouse_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D004 • PAGE 032
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Multi-Warehouse Inventory Stock Matrix
          </h1>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search SKU, product, or hub..."
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
              <th className="p-sm">Architectural Product</th>
              <th className="p-sm">SKU</th>
              <th className="p-sm">Warehouse Hub</th>
              <th className="p-sm">Stock On Hand</th>
              <th className="p-sm">Reserved</th>
              <th className="p-sm">Available</th>
              <th className="p-sm">Safety Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((item: any) => (
              <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-semibold text-on-surface">{item.product_name}</td>
                <td className="p-sm font-mono text-secondary">{item.sku}</td>
                <td className="p-sm font-medium text-primary">{item.warehouse_name}</td>
                <td className="p-sm font-mono text-on-surface font-semibold">{item.quantity_on_hand}</td>
                <td className="p-sm font-mono text-amber-600">{item.quantity_reserved}</td>
                <td className="p-sm font-mono font-bold text-emerald-700">{item.available_stock}</td>
                <td className="p-sm font-mono text-secondary">{item.safety_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
