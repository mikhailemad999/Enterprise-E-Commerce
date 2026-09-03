'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, ArrowRightLeft, AlertTriangle, Check, RefreshCw, Search, Plus } from 'lucide-react';

export default function InventoryPage() {
  const [data, setData] = useState<any>({ warehouses: [], stocks: [], transfers: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Transfer Modal State
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [sourceWarehouse, setSourceWarehouse] = useState<number>(1);
  const [targetWarehouse, setTargetWarehouse] = useState<number>(2);
  const [selectedProduct, setSelectedProduct] = useState<number>(1);
  const [transferQty, setTransferQty] = useState<number>(3);
  const [transferNotes, setTransferNotes] = useState('Balancing stock ahead of Sheikh Zayed & Zamalek delivery surge.');
  const [transferring, setTransferring] = useState(false);

  const fetchInventory = async () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceWarehouse === targetWarehouse) {
      alert('Source and target warehouse must be distinct.');
      return;
    }
    setTransferring(true);
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'transfer',
          source_warehouse_id: sourceWarehouse,
          target_warehouse_id: targetWarehouse,
          product_id: selectedProduct,
          quantity: transferQty,
          notes: transferNotes,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setTransferModalOpen(false);
        fetchInventory();
      } else {
        alert('Transfer failed: ' + resJson.error);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setTransferring(false);
    }
  };

  // Group stocks by product
  const groupedProducts: Record<number, any> = {};
  data.stocks.forEach((s: any) => {
    if (!groupedProducts[s.product_id]) {
      groupedProducts[s.product_id] = {
        productId: s.product_id,
        name: s.product_name,
        sku: s.product_sku,
        material: s.material,
        price: s.price,
        warehouses: {},
        totalOnHand: 0,
        totalAvailable: 0,
      };
    }
    groupedProducts[s.product_id].warehouses[s.warehouse_id] = s;
    groupedProducts[s.product_id].totalOnHand += Number(s.quantity_on_hand);
    groupedProducts[s.product_id].totalAvailable += Number(s.quantity_available);
  });

  const productList = Object.values(groupedProducts).filter((p: any) =>
    (p.name + p.sku + p.material).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-0.5">
            Warehouse Management System (WMS)
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
            Multi-Warehouse Inventory Allocation
          </h1>
        </div>

        <div className="flex items-center gap-xs">
          <button
            onClick={() => setTransferModalOpen(true)}
            className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Initiate Stock Transfer</span>
          </button>
          <button
            onClick={fetchInventory}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
            title="Refresh Inventory"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Warehouse Info Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
        {data.warehouses.map((wh: any) => (
          <div key={wh.id} className="p-sm bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <span className="font-label-sm text-[10px] bg-secondary-container px-1.5 py-0.5 rounded text-on-surface font-semibold uppercase">
                {wh.code}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <h4 className="font-title-md text-sm font-semibold text-on-surface">{wh.name}</h4>
            <p className="text-[11px] text-secondary">{wh.address}, {wh.city}</p>
          </div>
        ))}
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-2 p-2 bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm max-w-md">
        <Search className="w-4 h-4 text-outline" />
        <input
          type="text"
          placeholder="Filter by SKU, silhouette name, material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
        />
      </div>

      {/* Multi-Warehouse Stock Matrix Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-sm">Piece / SKU</th>
                <th className="p-sm">Material</th>
                <th className="p-sm text-center">Cairo West Hub</th>
                <th className="p-sm text-center">Cairo East Depot</th>
                <th className="p-sm text-center">Alex Maritime</th>
                <th className="p-sm text-right">Total Available</th>
                <th className="p-sm text-center">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">
                    Loading warehouse stock matrix...
                  </td>
                </tr>
              ) : productList.length > 0 ? (
                productList.map((prod: any) => {
                  const wh1 = prod.warehouses[1];
                  const wh2 = prod.warehouses[2];
                  const wh3 = prod.warehouses[3];
                  const isLow = prod.totalAvailable <= 10;

                  return (
                    <tr key={prod.productId} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-sm font-medium text-on-surface">
                        <span className="font-semibold block">{prod.name}</span>
                        <span className="text-[10px] text-secondary font-mono">{prod.sku}</span>
                      </td>
                      <td className="p-sm text-secondary">{prod.material}</td>
                      <td className="p-sm text-center">
                        <span className="font-semibold text-on-surface">{wh1?.quantity_available || 0}</span>
                        <span className="text-[10px] text-secondary block">({wh1?.quantity_on_hand || 0} on hand)</span>
                      </td>
                      <td className="p-sm text-center">
                        <span className="font-semibold text-on-surface">{wh2?.quantity_available || 0}</span>
                        <span className="text-[10px] text-secondary block">({wh2?.quantity_on_hand || 0} on hand)</span>
                      </td>
                      <td className="p-sm text-center">
                        <span className="font-semibold text-on-surface">{wh3?.quantity_available || 0}</span>
                        <span className="text-[10px] text-secondary block">({wh3?.quantity_on_hand || 0} on hand)</span>
                      </td>
                      <td className="p-sm text-right font-headline-sm text-sm font-bold text-on-surface">
                        {prod.totalAvailable} Units
                      </td>
                      <td className="p-sm text-center">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                            <Check className="w-3 h-3" />
                            <span>Optimal</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">
                    No matching products in matrix.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Transfer Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setTransferModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl border border-surface-container shadow-2xl p-md z-10 space-y-md">
            <h3 className="font-title-md text-base text-on-surface font-bold uppercase tracking-wider flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-primary" />
              <span>Initiate Inter-Warehouse Stock Transfer</span>
            </h3>

            <form onSubmit={handleTransferSubmit} className="space-y-sm text-xs">
              <div>
                <label className="font-label-sm uppercase text-secondary block mb-1">Select Piece / Silhouette</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(Number(e.target.value))}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded text-on-surface"
                >
                  {productList.map((p: any) => (
                    <option key={p.productId} value={p.productId}>
                      {p.name} ({p.sku}) - {p.totalAvailable} Total Available
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Source Warehouse</label>
                  <select
                    value={sourceWarehouse}
                    onChange={(e) => setSourceWarehouse(Number(e.target.value))}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded text-on-surface"
                  >
                    {data.warehouses.map((wh: any) => (
                      <option key={wh.id} value={wh.id}>{wh.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Destination Warehouse</label>
                  <select
                    value={targetWarehouse}
                    onChange={(e) => setTargetWarehouse(Number(e.target.value))}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded text-on-surface"
                  >
                    {data.warehouses.map((wh: any) => (
                      <option key={wh.id} value={wh.id}>{wh.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm uppercase text-secondary block mb-1">Quantity to Transfer</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded text-on-surface"
                />
              </div>

              <div>
                <label className="font-label-sm uppercase text-secondary block mb-1">Transfer Manifest Directives</label>
                <input
                  type="text"
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded text-on-surface"
                />
              </div>

              <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={transferring}
                  className="px-md py-2 rounded bg-primary text-on-primary uppercase font-label-md text-xs font-bold hover:bg-inverse-surface transition-colors"
                >
                  {transferring ? 'Executing Transfer...' : 'Dispatch Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
