'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function StoreAdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: 'Lumio Egyptian Ateliers LLC',
    taxNumber: 'TRN-491-882-901',
    commercialRegister: 'CR-104928-CAIRO',
    currency: 'EGP',
    vatRate: '14',
    atelierAddress: '14 Hassan Sabry Street, Zamalek, Cairo',
    supportPhone: '+20 102 334 8812',
    supportEmail: 'concierge@lumio.design',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-lg max-w-4xl">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D002 • PAGE 012
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Store Settings & Localization
          </h1>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-700 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Store profile & Egyptian tax settings updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-surface-container-lowest p-md rounded-2xl border border-surface-container space-y-md text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Store Brand Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Tax Registration Number (ETA)</label>
            <input
              type="text"
              value={form.taxNumber}
              onChange={(e) => setForm({ ...form, taxNumber: e.target.value })}
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Commercial Register</label>
            <input
              type="text"
              value={form.commercialRegister}
              onChange={(e) => setForm({ ...form, commercialRegister: e.target.value })}
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Operating Currency</label>
            <input
              type="text"
              value={form.currency}
              disabled
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono opacity-80"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Egyptian VAT Rate (%)</label>
            <input
              type="text"
              value={form.vatRate}
              onChange={(e) => setForm({ ...form, vatRate: e.target.value })}
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Concierge Support Phone</label>
            <input
              type="text"
              value={form.supportPhone}
              onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-secondary uppercase font-semibold">Flagship Atelier Address</label>
          <input
            type="text"
            value={form.atelierAddress}
            onChange={(e) => setForm({ ...form, atelierAddress: e.target.value })}
            className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="px-md py-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 hover:bg-inverse-surface transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}
