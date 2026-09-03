'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation, Phone, MapPin, Gauge, Shield, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DriverNavigationPage() {
  const router = useRouter();
  const [speed, setSpeed] = useState(38);
  const [eta, setEta] = useState(14);
  const [distance, setDistance] = useState(3.8);
  const [arrived, setArrived] = useState(false);

  // Simulated GPS telemetry ping
  const handlePingTelemetry = async () => {
    try {
      const newSpeed = Math.floor(30 + Math.random() * 20);
      setSpeed(newSpeed);
      await fetch('/api/driver/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver_id: 1,
          lat: 30.0560 + (Math.random() - 0.5) * 0.005,
          lng: 31.2290 + (Math.random() - 0.5) * 0.005,
          speed: newSpeed,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleArrived = async () => {
    try {
      await fetch('/api/driver/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_id: 1,
          status: 'arrived',
        }),
      });
      setArrived(true);
      setTimeout(() => {
        router.push('/driver/pod');
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-3 flex flex-col h-[calc(100vh-140px)]">
      {/* Turn Navigation HUD Banner */}
      <div className="p-3 bg-white text-black rounded-xl shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
          <Navigation className="w-6 h-6 rotate-45" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">In 450 meters</span>
            <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-bold uppercase">26th July Corridor</span>
          </div>
          <p className="text-xs text-zinc-700">Turn right onto 15th of May Bridge toward Zamalek</p>
        </div>
      </div>

      {/* Simulated Map View Canvas */}
      <div className="flex-1 relative bg-[#15171c] rounded-xl overflow-hidden border border-[#2c2b2b] flex items-center justify-center">
        <svg viewBox="0 0 400 500" className="w-full h-full">
          {/* Nile River */}
          <path d="M 220 0 Q 240 180 200 320 T 190 500" fill="none" stroke="#253444" strokeWidth="48" strokeLinecap="round" />
          <text x="210" y="240" fill="#415b75" fontSize="10" letterSpacing="1" transform="rotate(75, 210, 240)">RIVER NILE</text>

          {/* Road Network */}
          <path d="M 50 150 L 350 150" stroke="#383d47" strokeWidth="8" />
          <path d="M 80 320 L 350 280" stroke="#383d47" strokeWidth="8" />
          <path d="M 120 40 L 260 480" stroke="#2d323b" strokeWidth="6" />

          {/* Active Navigation Path (Glowing) */}
          <path
            d="M 120 280 Q 180 260 210 200 L 225 150"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeDasharray="8,4"
          />

          {/* Destination Pin */}
          <g transform="translate(225, 150)">
            <circle r="12" fill="#ef4444" opacity="0.3" className="animate-ping" />
            <circle r="8" fill="#ef4444" />
            <text x="12" y="4" fill="#ffffff" fontSize="11" fontWeight="bold">Zamalek (Hassan Sabry)</text>
          </g>

          {/* Van Location */}
          <g transform="translate(180, 240)">
            <circle r="16" fill="#ffffff" opacity="0.2" className="animate-pulse" />
            <circle r="10" fill="#ffffff" />
            <polygon points="180,230 174,244 186,244" fill="#000000" />
            <text x="-25" y="-14" fill="#ffffff" fontSize="10" fontWeight="bold">You ({speed} km/h)</text>
          </g>
        </svg>

        {/* Floating Telemetry Stats on Map */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-xs">
          <div className="p-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-white flex items-center gap-3">
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase">ETA</span>
              <span className="font-bold text-sm text-emerald-400">{eta} Mins</span>
            </div>
            <div className="border-l border-white/20 pl-2">
              <span className="text-[10px] text-zinc-400 block uppercase">Distance</span>
              <span className="font-bold text-sm">{distance} KM</span>
            </div>
            <div className="border-l border-white/20 pl-2">
              <span className="text-[10px] text-zinc-400 block uppercase">Speed</span>
              <span className="font-bold text-sm">{speed} km/h</span>
            </div>
          </div>

          <button
            onClick={handlePingTelemetry}
            className="p-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-white hover:bg-white/20 transition-colors"
            title="Ping Live GPS Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Destination & Action Bar */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] space-y-2.5">
        <div className="flex justify-between items-start text-xs">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block">
              Destination Stop
            </span>
            <h4 className="font-bold text-sm text-white">Farida Mansour (Zamalek Penthouse)</h4>
            <p className="text-zinc-400 text-[11px]">14 Hassan Sabry Street, Floor 6, Penthouse B</p>
          </div>

          <a
            href="tel:+201023348812"
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors shrink-0"
            title="Call Client"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        <button
          onClick={handleArrived}
          className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            arrived
              ? 'bg-emerald-500 text-black'
              : 'bg-white text-black hover:bg-zinc-200 shadow-md'
          }`}
        >
          {arrived ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Arrival Logged! Opening Handover...</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              <span>I Have Arrived at Residence</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
