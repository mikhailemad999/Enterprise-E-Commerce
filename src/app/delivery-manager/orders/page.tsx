'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Navigation, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export default function DeliveryManagerOrdersPage() {
  const [data, setData] = useState<any>({ drivers: [], unassignedOrders: [], activeDeliveries: [] });
  const [selectedDriver, setSelectedDriver] = useState<number>(1);
  const [dispatching, setDispatching] = useState<number | null>(null);

  const fetchDispatch = async () => {
    try {
      const res = await fetch('/api/dispatch');
      const json = await res.json();
      if (json.success) setData(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDispatch();
  }, []);

  const handleAssign = async (orderId: number) => {
    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, driver_id: selectedDriver }),
      });
      const json = await res.json();
      if (json.success) {
        setDispatching(null);
        fetchDispatch();
      } else {
        alert(json.error);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D008 • PAGE 072
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Order Dispatch Allocation Queue
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-md space-y-md">
        <h3 className="font-headline-sm text-base font-bold text-on-surface uppercase">
          Unassigned Orders Ready for Courier Dispatch ({data.unassignedOrders?.length || 0})
        </h3>

        {data.unassignedOrders && data.unassignedOrders.length > 0 ? (
          <div className="space-y-2 text-xs">
            {data.unassignedOrders.map((ord: any) => {
              const addr = typeof ord.shipping_address_json === 'string'
                ? JSON.parse(ord.shipping_address_json)
                : (ord.shipping_address_json || {});
              return (
                <div
                  key={ord.id}
                  className="p-sm bg-surface-container-low rounded-xl border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-on-surface">#{ord.order_number}</span>
                      <span className="font-semibold text-on-surface">{ord.guest_name}</span>
                      <span className="text-secondary font-mono">({ord.guest_phone})</span>
                    </div>
                    <p className="text-secondary mt-0.5">
                      Destination: {addr.street || 'Zamalek'}, {addr.city || 'Cairo'}, {addr.governorate || 'Egypt'}
                    </p>
                  </div>

                  <div className="flex items-center gap-sm">
                    <span className="font-headline-sm text-sm font-bold text-on-surface">
                      {new Intl.NumberFormat('en-US').format(ord.total_amount)} EGP
                    </span>

                    {dispatching === ord.id ? (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={selectedDriver}
                          onChange={(e) => setSelectedDriver(Number(e.target.value))}
                          className="p-1.5 bg-surface-container border border-surface-container rounded text-xs"
                        >
                          {data.drivers?.map((d: any) => (
                            <option key={d.id} value={d.id}>
                              {d.name} ({d.status})
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAssign(ord.id)}
                          className="px-2.5 py-1.5 bg-primary text-on-primary rounded text-[11px] font-bold uppercase"
                        >
                          Confirm
                        </button>
                        <button onClick={() => setDispatching(null)} className="px-2 text-secondary">✕</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDispatching(ord.id)}
                        className="px-sm py-1.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg hover:bg-inverse-surface"
                      >
                        Assign Courier
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-secondary">
            All current orders have been allocated and are in transit with couriers.
          </div>
        )}
      </div>
    </div>
  );
}
