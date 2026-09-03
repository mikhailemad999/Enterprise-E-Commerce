'use client';

import React, { useState } from 'react';
import { User, KeyRound, MapPin, Save, CheckCircle2 } from 'lucide-react';

export default function CustomerProfilePage() {
  const [saved, setSaved] = useState(false);
  const [pinSaved, setPinSaved] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 6 && /^\d{6}$/.test(newPin)) {
      setPinSaved(true);
      setCurrentPin('');
      setNewPin('');
      setTimeout(() => setPinSaved(false), 2500);
    } else {
      alert('PIN must be exactly 6 numeric digits.');
    }
  };

  return (
    <div className="space-y-lg max-w-3xl">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D012 • PAGE 113
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Client Private Profile & 6-Digit PIN
          </h1>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-700 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved to Private Client ledger.</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-md text-xs shadow-sm">
        <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">Personal Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Full Name</label>
            <input
              type="text"
              defaultValue="Farida Mansour"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Email Address</label>
            <input
              type="email"
              defaultValue="farida.mansour@vip.eg"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Phone (WhatsApp for Delivery)</label>
            <input
              type="text"
              defaultValue="+20 102 334 8812"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">Preferred Delivery Hub</label>
            <input
              type="text"
              defaultValue="Cairo West Hub (Sheikh Zayed)"
              disabled
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg opacity-75"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-md py-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 hover:bg-inverse-surface transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Update Profile</span>
        </button>
      </form>

      {/* 6-Digit PIN Change Card */}
      <div className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container space-y-md text-xs shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" />
            <span>Change 6-Digit Numeric Security PIN</span>
          </h3>
          <span className="font-mono text-[10px] text-secondary">Current Demo PIN: 334455</span>
        </div>

        {pinSaved && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-700 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>6-Digit Security PIN successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleChangePin} className="space-y-sm max-w-md">
          <div className="space-y-1">
            <label className="text-secondary uppercase font-semibold">New 6-Digit PIN</label>
            <input
              type="password"
              maxLength={6}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 998877"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono text-center tracking-[0.5em] text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="px-md py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-inverse-surface transition-colors"
          >
            Update 6-Digit PIN
          </button>
        </form>
      </div>
    </div>
  );
}
