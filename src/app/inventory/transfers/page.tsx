'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, Clock, Plus } from 'lucide-react';

export default function InventoryTransfersPage() {
  const [transfers, setTransfers] = useState([
    { id: 1, transferNumber: 'TRF-2026-0081', from: 'Cairo West Hub (Sheikh Zayed)', to: 'Cairo East Depot (New Cairo)', sku: 'LUM-LGT-001', qty: 4, status: 'completed', date: '2026-09-03' },
    { id: 2, transferNumber: 'TRF-2026-0082', from: 'Alexandria Maritime Terminal', to: 'Cairo West Hub (Sheikh Zayed)', sku: 'LUM-FUR-002', qty: 2, status: 'in_transit', date: '2026-09-03' },
    { id: 3, transferNumber: 'TRF-2026-0083', from: 'Cairo East Depot (New Cairo)', to: 'Cairo West Hub (Sheikh Zayed)', sku: 'LUM-CER-004', qty: 6, status: 'pending', date: '2026-09-04' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ sku: 'LUM-LGT-001', from: 'Cairo West Hub', to: 'Cairo East Depot', qty: '2' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setTransfers([
      {
        id: Date.now(),
        transferNumber: `TRF-2026-00${Math.floor(84 + Math.random() * 20)}`,
        from: form.from,
        to: form.to,
        sku: form.sku,
        qty: Number(form.qty),
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      },
      ...transfers,
    ]);
    setShowModal(false);
  };

  const handleUpdateStatus = (id: number, status: string) => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D004 • PAGE 033
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Inter-Warehouse Stock Transfers
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Initiate Stock Transfer</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Transfer Docket</th>
              <th className="p-sm">Source Hub</th>
              <th className="p-sm">Destination Hub</th>
              <th className="p-sm">SKU</th>
              <th className="p-sm">Quantity</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {transfers.map((t) => (
              <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-on-surface">{t.transferNumber}</td>
                <td className="p-sm text-secondary">{t.from}</td>
                <td className="p-sm font-semibold text-on-surface">{t.to}</td>
                <td className="p-sm font-mono text-primary font-bold">{t.sku}</td>
                <td className="p-sm font-mono font-bold">{t.qty} units</td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    t.status === 'in_transit' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {t.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-sm text-right space-x-1">
                  {t.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(t.id, 'in_transit')}
                      className="px-2 py-1 bg-primary text-on-primary rounded text-[10px] uppercase font-bold"
                    >
                      Approve & Ship
                    </button>
                  )}
                  {t.status === 'in_transit' && (
                    <button
                      onClick={() => handleUpdateStatus(t.id, 'completed')}
                      className="px-2 py-1 bg-emerald-700 text-white rounded text-[10px] uppercase font-bold"
                    >
                      Receive at Hub
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full p-md rounded-2xl border border-surface-container shadow-2xl space-y-md">
            <h3 className="font-headline-sm text-lg font-bold text-on-surface uppercase">Initiate Inter-Warehouse Transfer</h3>
            <form onSubmit={handleCreate} className="space-y-sm text-xs">
              <div>
                <label className="text-secondary uppercase block mb-1">SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded font-mono"
                />
              </div>
              <div>
                <label className="text-secondary uppercase block mb-1">From Hub</label>
                <select
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded"
                >
                  <option value="Cairo West Hub (Sheikh Zayed)">Cairo West Hub (Sheikh Zayed)</option>
                  <option value="Cairo East Depot (New Cairo)">Cairo East Depot (New Cairo)</option>
                  <option value="Alexandria Maritime Terminal">Alexandria Maritime Terminal</option>
                </select>
              </div>
              <div>
                <label className="text-secondary uppercase block mb-1">To Hub</label>
                <select
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded"
                >
                  <option value="Cairo East Depot (New Cairo)">Cairo East Depot (New Cairo)</option>
                  <option value="Cairo West Hub (Sheikh Zayed)">Cairo West Hub (Sheikh Zayed)</option>
                  <option value="Alexandria Maritime Terminal">Alexandria Maritime Terminal</option>
                </select>
              </div>
              <div>
                <label className="text-secondary uppercase block mb-1">Units to Transfer</label>
                <input
                  type="number"
                  min="1"
                  value={form.qty}
                  onChange={(e) => setForm({ ...form, qty: e.target.value })}
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-sm py-1.5 text-secondary uppercase text-[11px]">
                  Cancel
                </button>
                <button type="submit" className="px-sm py-1.5 bg-primary text-on-primary rounded uppercase text-[11px] font-bold">
                  Dispatch Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
