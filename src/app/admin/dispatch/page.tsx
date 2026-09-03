'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Navigation, Battery, Gauge, Phone, CheckCircle2, UserCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function FleetDispatchPage() {
  const [data, setData] = useState<any>({ drivers: [], unassignedOrders: [], activeDeliveries: [] });
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<number>(1);
  const [dispatchingOrder, setDispatchingOrder] = useState<number | null>(null);

  const fetchDispatch = async () => {
    try {
      const res = await fetch('/api/dispatch');
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
    fetchDispatch();
    const timer = setInterval(fetchDispatch, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAssignOrder = async (orderId: number, driverId: number) => {
    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, driver_id: driverId }),
      });
      const json = await res.json();
      if (json.success) {
        setDispatchingOrder(null);
        fetchDispatch();
      } else {
        alert('Dispatch error: ' + json.error);
      }
    } catch (e: any) {
      alert('Failed to dispatch order: ' + e.message);
    }
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block">
              Fleet Dispatch Control Room (Cairo • Giza Live)
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
            Live Courier Dispatch Console
          </h1>
        </div>

        <div className="flex items-center gap-xs">
          <Link
            href="/driver"
            target="_blank"
            className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Driver Mobile App</span>
          </Link>
          <button
            onClick={fetchDispatch}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Split: Live Dispatch Map & Courier Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Fleet Map Canvas */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm flex flex-col">
          <div className="p-sm bg-surface-container-low border-b border-surface-container flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-medium text-on-surface">
              <Truck className="w-4 h-4 text-primary" />
              <span>Real-Time Fleet Routing & Telemetry Stream</span>
            </div>
            <span className="font-mono text-[11px] text-secondary">Broadcasting: Active</span>
          </div>

          <div className="relative w-full aspect-[16/9] bg-[#eae7e4] overflow-hidden p-4">
            <svg viewBox="0 0 800 450" className="w-full h-full">
              {/* Nile River */}
              <path d="M 380 0 Q 390 120 420 220 T 400 450" fill="none" stroke="#b0c8d6" strokeWidth="32" strokeLinecap="round" />
              <text x="440" y="240" fill="#7d9ba8" fontSize="11" letterSpacing="2" fontFamily="sans-serif">RIVER NILE</text>

              {/* Major Corridors */}
              <path d="M 80 220 L 720 220" stroke="#d5cfc9" strokeWidth="6" strokeLinecap="round" />
              <path d="M 280 80 L 520 380" stroke="#d5cfc9" strokeWidth="5" strokeLinecap="round" />
              <path d="M 180 350 Q 400 300 680 350" stroke="#d5cfc9" strokeWidth="4" />

              {/* Courier 1: Karim Mostafa (Sheikh Zayed -> Zamalek) */}
              <path d="M 240 210 Q 320 200 410 215 T 460 225" fill="none" stroke="#1c1b1b" strokeWidth="3" strokeDasharray="6,6" />
              <g transform="translate(370, 210)">
                <circle r="16" fill="#1c1b1b" opacity="0.2" className="animate-pulse" />
                <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#1c1b1b" />
                <text x="-6" y="4" fill="#ffffff" fontSize="9" fontWeight="bold">VAN</text>
                <text x="-35" y="-12" fill="#1c1b1b" fontSize="10" fontWeight="bold">Karim (38 km/h)</text>
              </g>

              {/* Courier 2: Tarek El-Sayed (Maadi Ring Road) */}
              <g transform="translate(480, 310)">
                <circle r="14" fill="#615e58" opacity="0.2" />
                <rect x="-8" y="-7" width="16" height="14" rx="2" fill="#615e58" />
                <text x="-4" y="4" fill="#ffffff" fontSize="8" fontWeight="bold">VIP</text>
                <text x="-30" y="-10" fill="#615e58" fontSize="10" fontWeight="bold">Tarek (42 km/h)</text>
              </g>

              {/* Courier 3: Omar Hassan (New Cairo 5th Settlement) */}
              <g transform="translate(620, 180)">
                <circle r="14" fill="#747878" opacity="0.2" />
                <rect x="-8" y="-7" width="16" height="14" rx="2" fill="#747878" />
                <text x="-4" y="4" fill="#ffffff" fontSize="8" fontWeight="bold">VAN</text>
                <text x="-35" y="-10" fill="#747878" fontSize="10" fontWeight="bold">Omar (Idle)</text>
              </g>

              {/* Delivery Destination: Zamalek Residence */}
              <g transform="translate(460, 225)">
                <circle r="10" fill="#ba1a1a" opacity="0.2" className="animate-ping" />
                <circle r="6" fill="#ba1a1a" />
                <text x="12" y="4" fill="#1c1b1b" fontSize="10" fontWeight="bold">Zamalek (Farida M.)</text>
              </g>

              {/* Warehouse 1: Sheikh Zayed */}
              <g transform="translate(180, 200)">
                <circle r="7" fill="#1c1b1b" />
                <text x="-120" y="4" fill="#1c1b1b" fontSize="10" fontWeight="bold">Cairo West Hub</text>
              </g>

              {/* Warehouse 2: New Cairo */}
              <g transform="translate(680, 220)">
                <circle r="7" fill="#1c1b1b" />
                <text x="-110" y="4" fill="#1c1b1b" fontSize="10" fontWeight="bold">Cairo East Depot</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Courier Telemetry Cards */}
        <div className="lg:col-span-4 space-y-sm">
          <h3 className="font-title-md text-base font-semibold uppercase tracking-wider text-on-surface">
            Active Couriers ({data.drivers?.length || 0})
          </h3>

          <div className="space-y-sm">
            {data.drivers?.map((driver: any) => {
              const isOnDelivery = driver.status === 'on_delivery';
              return (
                <div
                  key={driver.id}
                  className={`p-sm rounded-xl border transition-all ${
                    isOnDelivery
                      ? 'bg-surface-container-lowest border-primary shadow-sm'
                      : 'bg-surface-container-lowest border-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-on-surface">{driver.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                        isOnDelivery ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isOnDelivery ? 'On Route' : 'Available'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-secondary">{driver.vehicle_plate}</span>
                  </div>

                  <p className="text-xs text-secondary mb-2">{driver.vehicle_type}</p>

                  <div className="grid grid-cols-3 gap-2 py-1.5 border-t border-surface-container text-xs text-secondary">
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-primary" />
                      <span>{driver.speed_kmh} km/h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Battery className="w-3.5 h-3.5 text-primary" />
                      <span>{driver.battery_percent}%</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-on-surface">{driver.rating} ★</span>
                    </div>
                  </div>

                  {isOnDelivery && driver.order_number && (
                    <div className="mt-2 p-2 bg-surface-container-low rounded text-xs flex items-center justify-between">
                      <span className="text-secondary font-medium">Assigned: #{driver.order_number}</span>
                      <Link
                        href={`/admin/orders/${driver.active_order_id || 1}`}
                        className="text-primary underline text-[11px] font-semibold uppercase"
                      >
                        Inspect OMS
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Queue: Unassigned Orders Ready for Dispatch */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-md space-y-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider">
              Pending Orders Ready for Dispatch ({data.unassignedOrders?.length || 0})
            </h3>
          </div>
          <span className="text-xs text-secondary">Automated Nearest-Hub Allocation Engine Active</span>
        </div>

        {data.unassignedOrders && data.unassignedOrders.length > 0 ? (
          <div className="space-y-2">
            {data.unassignedOrders.map((ord: any) => (
              <div
                key={ord.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-sm bg-surface-container-low rounded-lg border border-surface-container gap-sm text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-surface">#{ord.order_number}</span>
                    <span className="text-secondary">{ord.guest_name}</span>
                    <span className="text-outline">•</span>
                    <span className="font-mono text-secondary">{ord.guest_phone}</span>
                  </div>
                  <p className="text-secondary mt-0.5">
                    Destination: {(() => {
                      try {
                        const addr = typeof ord.shipping_address_json === 'string'
                          ? JSON.parse(ord.shipping_address_json)
                          : (ord.shipping_address_json || {});
                        return `${addr.street || 'Cairo'}, ${addr.city || 'Cairo'}`;
                      } catch (e) {
                        return 'Cairo, Egypt';
                      }
                    })()}
                  </p>
                </div>

                <div className="flex items-center gap-sm">
                  <span className="font-headline-sm text-sm font-bold text-on-surface">
                    {new Intl.NumberFormat('en-US').format(ord.total_amount)} EGP
                  </span>

                  {dispatchingOrder === ord.id ? (
                    <div className="flex items-center gap-1">
                      <select
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(Number(e.target.value))}
                        className="p-1 bg-surface-container border border-surface-container rounded text-xs"
                      >
                        {data.drivers?.map((d: any) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.status})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignOrder(ord.id, selectedDriver)}
                        className="px-2 py-1 bg-primary text-on-primary rounded font-label-md text-[10px] uppercase font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDispatchingOrder(null)}
                        className="px-2 py-1 text-secondary"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDispatchingOrder(ord.id)}
                      className="px-sm py-1.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded hover:bg-inverse-surface transition-colors"
                    >
                      Assign Courier
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-secondary">
            All current orders have been allocated and dispatched to courier fleet.
          </div>
        )}
      </div>
    </div>
  );
}
