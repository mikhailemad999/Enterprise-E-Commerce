'use client';

import React, { useState } from 'react';
import { Truck, MapPin, Gauge, Battery, CheckCircle2 } from 'lucide-react';

export default function DeliveryManagerDriversPage() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Karim Mostafa', phone: '+20 100 458 9201', vehicle: 'Mercedes Sprinter Van', plate: 'ق م ر 8421', zone: 'Cairo West (Zayed, October, Zamalek)', rating: '4.98', status: 'active' },
    { id: 2, name: 'Tarek El-Sayed', phone: '+20 112 879 3341', vehicle: 'Sedan VIP', plate: 'س ف ن 1932', zone: 'Cairo South (Maadi, Katameya, Mokattam)', rating: '4.95', status: 'active' },
    { id: 3, name: 'Omar Hassan', phone: '+20 120 741 8596', vehicle: 'Mercedes Sprinter Van', plate: 'ج هـ ط 6649', zone: 'Cairo East (New Cairo, Rehab, Madinaty)', rating: '4.92', status: 'active' },
  ]);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex items-center justify-between">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D008 • PAGE 073
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            White-Glove Fleet Couriers & Zone Assignments
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {drivers.map((d) => (
          <div key={d.id} className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-on-surface">{d.name}</h4>
                <span className="text-[11px] text-secondary font-mono">{d.phone}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                {d.status}
              </span>
            </div>

            <div className="space-y-1 text-xs bg-surface-container-low p-sm rounded-xl">
              <div className="flex justify-between">
                <span className="text-secondary">Vehicle:</span>
                <span className="font-medium text-on-surface">{d.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Plate:</span>
                <span className="font-mono text-on-surface font-bold">{d.plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Performance:</span>
                <span className="font-bold text-amber-500">{d.rating} ★</span>
              </div>
            </div>

            <div className="text-xs pt-1 flex items-start gap-1 text-secondary">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>Zone: {d.zone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
