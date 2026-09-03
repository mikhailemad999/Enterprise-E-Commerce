'use client';

import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Building, Calendar, Layers, Sparkles } from 'lucide-react';

export default function ConciergePage() {
  const [projectType, setProjectType] = useState('Penthouse');
  const [budgetRange, setBudgetRange] = useState('500,000 - 1,200,000 EGP');
  const [style, setStyle] = useState('Modern Minimalist');
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['Formal Reception', 'Master Suite']);
  const [clientName, setClientName] = useState('Youssef El-Gammal');
  const [email, setEmail] = useState('youssef@gammal-arch.com');
  const [phone, setPhone] = useState('+20 100 882 1990');
  const [preferredDate, setPreferredDate] = useState('2026-09-15');
  const [notes, setNotes] = useState('Custom monolithic travertine dining plinth (3.2m) and bespoke bronze luminaires for Nile view penthouse.');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const projectTypes = ['Private Residence', 'Penthouse', 'Boutique Hotel', 'Corporate Headquarters', 'Diplomatic Estate'];
  const rooms = ['Formal Reception', 'Master Suite', 'Dining Gallery', 'Terrace Plinth Court', 'Private Library', 'Atrium & Entryway'];
  const styles = ['Modern Minimalist', 'Brutalist Raw', 'Warm Organic', 'Monolithic Monochromatic'];
  const budgets = ['150,000 - 500,000 EGP', '500,000 - 1,200,000 EGP', '1,200,000+ EGP (Master Commission)'];

  const toggleRoom = (room: string) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          email,
          phone,
          project_type: projectType,
          budget_range: budgetRange,
          architectural_style: style,
          rooms: selectedRooms,
          preferred_date: preferredDate,
          notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-lg text-center border-b border-surface-container pb-md">
          <div className="inline-flex items-center gap-xs px-sm py-1 bg-secondary-container text-on-secondary-fixed-variant rounded-full mb-xs">
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span className="font-label-sm text-[11px] uppercase tracking-wider">
              Private Architectural Commissioning
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl md:text-5xl uppercase font-bold tracking-tight text-on-surface mb-2">
            Architectural Concierge
          </h1>
          <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mx-auto">
            Direct collaboration with Lumio master ateliers for custom stone scale, site-specific lighting schemes, and exclusive private residential installations.
          </p>
        </div>

        {submitted ? (
          <div className="p-xl bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-headline-sm text-2xl text-on-surface font-bold mb-2">
              Dossier Registered with Atelier Directors
            </h2>
            <p className="font-body-md text-sm text-secondary max-w-md mx-auto mb-md">
              Thank you, {clientName}. Your architectural requirements for {projectType} ({budgetRange}) have been assigned to Senior Consultant Leila Mansour. We will contact you at {phone} within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded"
            >
              Submit Additional Inquiries
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* 1. Project Typology */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">1</span>
                <span>Spatial Typology</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-xs">
                {projectTypes.map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setProjectType(pt)}
                    className={`p-sm rounded-lg text-left border font-label-md text-xs uppercase tracking-wider transition-all ${
                      projectType === pt
                        ? 'border-primary bg-surface-container-low text-primary shadow-sm font-semibold'
                        : 'border-surface-container hover:bg-surface-container-low/50 text-secondary'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Rooms Scope */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">2</span>
                <span>Commissioning Scope</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-xs">
                {rooms.map((room) => {
                  const active = selectedRooms.includes(room);
                  return (
                    <button
                      key={room}
                      type="button"
                      onClick={() => toggleRoom(room)}
                      className={`p-sm rounded-lg text-left border font-label-md text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
                        active
                          ? 'border-primary bg-surface-container-low text-primary font-semibold'
                          : 'border-surface-container text-secondary hover:bg-surface-container-low/50'
                      }`}
                    >
                      <span>{room}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Aesthetic Language & Budget */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">3</span>
                <span>Materiality & Budget Allocation</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Architectural Expression
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    {styles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Anticipated Budget Framework
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Client Contact Details */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">4</span>
                <span>Consultant Scheduling</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm mb-sm">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Principal / Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Architectural Firm / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                  Project Notes & Dimensional Requests
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-inverse-surface transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Registering Commission Dossier...</span>
              ) : (
                <>
                  <span>Schedule Atelier Private Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
