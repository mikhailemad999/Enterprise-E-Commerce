'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FileText,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  CreditCard,
  Building,
  RefreshCw,
} from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');
  const [assignedDriver, setAssignedDriver] = useState<string>('');

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const json = await res.json();
      if (json.success) {
        setOrder(json.order);
        setStatus(json.order.status);
        setAssignedDriver(json.order.assigned_driver_id ? String(json.order.assigned_driver_id) : '');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          timeline_title: `Status Shift: ${newStatus.replace(/_/g, ' ').toUpperCase()}`,
          timeline_desc: `Updated via Back-Office OMS Console by Administrator.`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus(newStatus);
        fetchOrder();
      }
    } catch (e: any) {
      alert('Failed to update status: ' + e.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignDriver = async (driverId: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_driver_id: driverId ? Number(driverId) : null,
          status: driverId ? 'out_for_delivery' : status,
          timeline_title: driverId ? 'Courier Assigned' : 'Courier Unassigned',
          timeline_desc: driverId ? `Courier assigned to delivery task.` : 'Removed courier assignment.',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAssignedDriver(driverId);
        fetchOrder();
      }
    } catch (e: any) {
      alert('Failed to assign driver: ' + e.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-secondary">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-sm" />
        <p className="font-label-md text-xs uppercase tracking-wider">Accessing OMS Ledger...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-headline-sm text-xl text-on-surface mb-2">Order Not Found</h2>
        <Link href="/admin" className="px-sm py-2 bg-primary text-on-primary rounded text-xs uppercase">
          Back to Overview
        </Link>
      </div>
    );
  }

  const address = order.shipping_address || {};
  const isDelivered = order.status === 'delivered';

  return (
    <div className="space-y-lg max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-0.5">
            Order Management System (OMS) & Official Invoicing
          </span>
          <div className="flex items-center gap-sm flex-wrap">
            <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
              Order #{order.order_number}
            </h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isDelivered ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-xs">
          <button
            onClick={() => window.print()}
            className="px-sm py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-primary" />
            <span>Generate Official Tax Invoice</span>
          </button>
          <button
            onClick={fetchOrder}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Transition Control Bar */}
      <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-md text-xs">
        <div className="flex items-center gap-sm flex-wrap">
          <span className="font-semibold text-on-surface uppercase tracking-wider font-label-md">Status Pipeline:</span>
          {['confirmed', 'processing', 'ready_for_dispatch', 'out_for_delivery', 'delivered'].map((st) => (
            <button
              key={st}
              disabled={updating}
              onClick={() => handleUpdateStatus(st)}
              className={`px-sm py-1.5 rounded uppercase font-label-md text-[11px] transition-all ${
                status === st
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-sm">
          <span className="font-semibold text-on-surface uppercase tracking-wider font-label-md">Assign Courier:</span>
          <select
            value={assignedDriver}
            onChange={(e) => handleAssignDriver(e.target.value)}
            className="p-1.5 bg-surface-container-low border border-surface-container rounded text-on-surface text-xs focus:outline-none focus:border-primary"
          >
            <option value="">Unassigned</option>
            <option value="1">Karim Mostafa (Mercedes Van)</option>
            <option value="2">Tarek El-Sayed (Sedan VIP)</option>
            <option value="3">Omar Hassan (Sprinter Van)</option>
          </select>
        </div>
      </div>

      {/* Main Order Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Left: Items Checklist & Tax Breakdown */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm space-y-md">
          <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider">
            Commissioned Architectural Items ({order.items?.length || 0})
          </h3>

          <div className="divide-y divide-surface-container">
            {order.items && order.items.map((item: any) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs gap-sm">
                <div className="flex items-center gap-sm">
                  <div className="w-14 h-16 rounded bg-surface-container overflow-hidden shrink-0">
                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover grayscale contrast-105" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-on-surface">{item.product_name}</h5>
                    <span className="text-[11px] text-secondary font-mono">SKU: {item.sku}</span>
                    <p className="text-secondary mt-0.5">Unit: {new Intl.NumberFormat('en-US').format(item.unit_price)} EGP • Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-sm font-bold text-on-surface block">
                    {new Intl.NumberFormat('en-US').format(item.total_price)} EGP
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase">Inspection Passed</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tax Invoice Financial Summary */}
          <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-2 text-xs">
            <div className="flex justify-between text-secondary">
              <span>Subtotal (Net Amount)</span>
              <span>{new Intl.NumberFormat('en-US').format(order.total_amount)} EGP</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Egyptian Standard VAT (14% Included)</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>White-Glove Regional Transport</span>
              <span className="text-primary font-medium uppercase">Complimentary</span>
            </div>
            <div className="flex justify-between text-base font-bold text-on-surface border-t border-surface-container pt-2">
              <span className="uppercase">Total Amount Invoiced</span>
              <span>{new Intl.NumberFormat('en-US').format(order.total_amount)} EGP</span>
            </div>
          </div>
        </div>

        {/* Right: Client & Delivery Specifications */}
        <div className="lg:col-span-4 space-y-md">
          {/* Customer Card */}
          <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm text-xs">
            <h4 className="font-title-md text-sm font-semibold uppercase tracking-wider text-on-surface flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>Client Dossier</span>
            </h4>
            <div className="space-y-1">
              <p className="font-semibold text-sm text-on-surface">{order.guest_name}</p>
              <p className="text-secondary">{order.guest_email}</p>
              <p className="text-secondary font-mono">{order.guest_phone}</p>
            </div>
          </div>

          {/* Shipping Destination */}
          <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm text-xs">
            <h4 className="font-title-md text-sm font-semibold uppercase tracking-wider text-on-surface flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>White-Glove Handover Site</span>
            </h4>
            <div className="space-y-1">
              <p className="font-semibold text-on-surface">{address.street} {address.apartment && `, ${address.apartment}`}</p>
              <p className="text-secondary">{address.city}, {address.governorate}, Egypt</p>
              <p className="text-secondary italic mt-1">&ldquo;{order.notes}&rdquo;</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm text-xs">
            <h4 className="font-title-md text-sm font-semibold uppercase tracking-wider text-on-surface flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Payment & Fulfillment Route</span>
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-secondary">Modality:</span>
                <span className="font-semibold text-on-surface uppercase">{order.payment_method?.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Fulfillment Hub:</span>
                <span className="font-semibold text-on-surface">Cairo West Hub</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Handover OTP:</span>
                <span className="font-mono font-bold text-primary">{order.otp_code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
