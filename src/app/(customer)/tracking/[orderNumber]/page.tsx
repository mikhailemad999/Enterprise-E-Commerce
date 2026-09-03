'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Truck, CheckCircle2, Clock, MapPin, Phone, Shield, Printer, ArrowRight, UserCheck, KeyRound } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderNumber}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();

    // Poll every 8 seconds for live driver GPS telemetry and status updates
    const interval = setInterval(fetchOrder, 8000);
    return () => clearInterval(interval);
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-sm" />
        <p className="font-label-md text-xs uppercase tracking-wider text-secondary">Locating Courier & Telemetry...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-32 text-center">
        <h2 className="font-headline-sm text-2xl text-on-surface mb-2">Order Not Found</h2>
        <p className="text-secondary mb-md">No commission record found for #{orderNumber}.</p>
        <Link href="/" className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded">
          Return to Ateliers
        </Link>
      </div>
    );
  }

  const isDelivered = order.status === 'delivered';
  const isOutForDelivery = order.status === 'out_for_delivery';
  const address = order.shipping_address || {};

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-surface-container pb-md mb-lg gap-sm">
          <div>
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-xs">
              Live Fleet Dispatch Telemetry
            </span>
            <div className="flex items-center gap-sm flex-wrap">
              <h1 className="font-headline-lg text-2xl md:text-4xl uppercase font-bold tracking-tight text-on-surface">
                Commission #{order.order_number}
              </h1>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isDelivered
                  ? 'bg-emerald-100 text-emerald-800'
                  : isOutForDelivery
                  ? 'bg-blue-100 text-blue-800 animate-pulse'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <button
              onClick={() => window.print()}
              className="px-sm py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-primary" />
              <span>Print Tax E-Invoice</span>
            </button>
          </div>
        </div>

        {/* Top Grid: Live Driver Map Simulation + OTP Handover */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl items-start">
          {/* Left: Interactive Fleet Map Visualizer */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm flex flex-col">
            {/* Map Header */}
            <div className="p-sm bg-surface-container-low border-b border-surface-container flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium text-on-surface">Live GPS Courier Telemetry (Cairo Corridor)</span>
              </div>
              <span className="text-secondary font-label-sm uppercase">Refresh: 8s</span>
            </div>

            {/* Simulated Live Route Map View */}
            <div className="relative w-full aspect-[16/9] bg-[#eae7e4] overflow-hidden flex items-center justify-center p-4">
              {/* Graphic Map Canvas Simulation */}
              <svg viewBox="0 0 800 450" className="w-full h-full">
                {/* River Nile and City Grid */}
                <path d="M 380 0 Q 390 120 420 220 T 400 450" fill="none" stroke="#b0c8d6" strokeWidth="32" strokeLinecap="round" />
                <text x="440" y="240" fill="#7d9ba8" fontSize="11" letterSpacing="2" fontFamily="sans-serif">RIVER NILE</text>

                {/* Major Arteries */}
                <path d="M 100 220 L 700 220" stroke="#d5cfc9" strokeWidth="6" strokeLinecap="round" />
                <path d="M 280 80 L 520 380" stroke="#d5cfc9" strokeWidth="5" strokeLinecap="round" />
                <path d="M 200 350 Q 400 300 650 350" stroke="#d5cfc9" strokeWidth="4" />

                {/* Active Courier Route Path */}
                <path
                  d="M 260 210 Q 320 200 410 215 T 460 225"
                  fill="none"
                  stroke="#1c1b1b"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                />

                {/* Destination: Client Residence (Zamalek) */}
                <g transform="translate(460, 225)">
                  <circle r="12" fill="#ba1a1a" opacity="0.2" className="animate-ping" />
                  <circle r="8" fill="#ba1a1a" />
                  <text x="14" y="4" fill="#1c1b1b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Residence Destination (Zamalek)
                  </text>
                </g>

                {/* Live Courier Vehicle Position */}
                <g transform="translate(360, 205)">
                  <circle r="16" fill="#1c1b1b" opacity="0.2" className="animate-pulse" />
                  <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#1c1b1b" />
                  <text x="-6" y="4" fill="#ffffff" fontSize="9" fontWeight="bold">VAN</text>
                  <text x="-35" y="-12" fill="#1c1b1b" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                    Karim (38 km/h)
                  </text>
                </g>

                {/* Warehouse Origin (Cairo West Hub) */}
                <g transform="translate(260, 210)">
                  <circle r="7" fill="#615e58" />
                  <text x="-120" y="4" fill="#615e58" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                    Cairo West Logistics Hub
                  </text>
                </g>
              </svg>

              {/* Status overlay badge */}
              <div className="absolute top-4 left-4 p-2 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-surface-container shadow-sm text-xs space-y-0.5">
                <p className="font-semibold text-on-surface">Vehicle Telemetry Active</p>
                <p className="text-secondary text-[11px]">
                  Speed: {order.speed_kmh || 38} km/h • Battery: {order.battery_percent || 94}%
                </p>
                <p className="text-primary font-medium text-[11px]">
                  ETA: ~{isDelivered ? 'Delivered' : '18 Minutes to Zamalek Residence'}
                </p>
              </div>
            </div>

            {/* Courier Details Card */}
            <div className="p-md bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-sm border-t border-surface-container">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm text-on-surface shrink-0 border border-surface-container">
                  KM
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-title-md text-sm font-semibold text-on-surface">
                      {order.driver_name || 'Karim Mostafa'}
                    </h4>
                    <span className="font-label-sm text-[10px] bg-secondary-container px-1.5 py-0.5 rounded text-on-surface">
                      Senior Courier
                    </span>
                  </div>
                  <p className="text-xs text-secondary">
                    {order.vehicle_plate || 'ق م ر 8421'} • {order.vehicle_type || 'Mercedes Sprinter VIP Van'}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${order.driver_phone || '+201004589201'}`}
                className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 hover:bg-inverse-surface transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Courier ({order.driver_phone || '+20 100 458 9201'})</span>
              </a>
            </div>
          </div>

          {/* Right: Security Handover OTP + Timeline */}
          <div className="lg:col-span-5 space-y-md">
            {/* Handover OTP Verification Card */}
            <div className="p-md bg-primary text-on-primary rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-sm text-[11px] uppercase tracking-widest text-primary-fixed">
                  Security Handover Authentication
                </span>
                <KeyRound className="w-4 h-4 text-primary-fixed" />
              </div>
              <h3 className="font-title-md text-lg font-bold mb-1">
                Client Verification OTP
              </h3>
              <p className="text-xs text-secondary-fixed-dim mb-sm">
                Present this 4-digit authentication code to the Lumio courier upon physical delivery to complete handover.
              </p>

              <div className="p-sm bg-surface-container-lowest text-on-surface rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-secondary tracking-wider block font-semibold">Handover OTP</span>
                  <span className="font-mono text-3xl font-bold tracking-widest text-primary">
                    {order.otp_code || '8492'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase font-semibold">
                    Valid for Order #{order.order_number}
                  </span>
                </div>
              </div>
            </div>

            {/* Lifecycle Timeline */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h4 className="font-title-md text-sm font-semibold uppercase tracking-wider text-on-surface mb-sm">
                Chain of Custody Timeline
              </h4>

              <div className="space-y-sm">
                {order.timeline && order.timeline.map((entry: any, index: number) => (
                  <div key={entry.id} className="flex gap-sm relative">
                    {index < order.timeline.length - 1 && (
                      <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-surface-container-high" />
                    )}
                    <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-title-md text-xs font-semibold text-on-surface">
                        {entry.title}
                      </h5>
                      <p className="text-[11px] text-secondary leading-snug">
                        {entry.description}
                      </p>
                      <span className="text-[10px] text-outline mt-0.5 block">
                        {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {entry.created_by}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Order Items & Delivery Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Items Dossier */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm">
            <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm">
              Commission Items ({order.items?.length || 0})
            </h3>
            <div className="space-y-sm">
              {order.items && order.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg border border-surface-container">
                  <div className="flex items-center gap-sm">
                    <div className="w-14 h-16 rounded bg-surface-container overflow-hidden shrink-0">
                      <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover grayscale contrast-105" />
                    </div>
                    <div>
                      <h5 className="font-body-md text-sm font-semibold text-on-surface">{item.product_name}</h5>
                      <p className="text-xs text-secondary">{item.sku} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-headline-sm text-sm font-semibold text-on-surface">
                    {new Intl.NumberFormat('en-US').format(item.total_price)} EGP
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-surface-container mt-md pt-sm flex justify-between items-center text-sm font-semibold">
              <span className="uppercase text-secondary">Total Settled Amount</span>
              <span className="text-lg text-on-surface">
                {new Intl.NumberFormat('en-US').format(order.total_amount)} EGP
              </span>
            </div>
          </div>

          {/* Destination Details */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm space-y-sm text-xs">
            <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider">
              Delivery Specification
            </h3>
            <div className="space-y-1">
              <p className="font-semibold text-sm text-on-surface">{address.full_name || order.guest_name}</p>
              <p className="text-secondary">{address.street} {address.apartment && `, ${address.apartment}`}</p>
              <p className="text-secondary">{address.city}, {address.governorate}, Egypt</p>
              <p className="text-secondary font-mono">{address.phone || order.guest_phone}</p>
            </div>

            <div className="pt-2 border-t border-surface-container space-y-1">
              <span className="font-semibold text-on-surface block uppercase">Handling Directives:</span>
              <p className="text-secondary italic">&ldquo;{order.notes}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
