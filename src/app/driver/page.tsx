'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, MapPin, Phone, ArrowRight, CheckCircle2, Clock, Banknote, ShieldAlert } from 'lucide-react';

export default function DriverManifestPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('/api/driver/tasks?driver_id=1');
        const json = await res.json();
        if (json.success) {
          setTasks(json.tasks || []);
          setDriver(json.driver);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const totalCod = tasks.reduce((sum, t) => sum + (Number(t.cod_amount) || 0), 0);
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="space-y-3">
      {/* Route Summary Card */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
            Today&apos;s Active Manifest (Greater Cairo)
          </span>
          <span className="text-[10px] bg-white text-black font-bold px-1.5 py-0.5 rounded uppercase">
            Route #04
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[#333232]">
          <div>
            <span className="text-lg font-bold text-white block">{tasks.length}</span>
            <span className="text-[10px] text-zinc-400 uppercase">Assigned</span>
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-400 block">{completedCount}</span>
            <span className="text-[10px] text-zinc-400 uppercase">Completed</span>
          </div>
          <div>
            <span className="text-lg font-bold text-amber-400 block">
              {new Intl.NumberFormat('en-US').format(totalCod)}
            </span>
            <span className="text-[10px] text-zinc-400 uppercase">COD Due</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
          Assigned Delivery Stops ({tasks.length})
        </span>
        <span className="text-[10px] text-zinc-400">Next Stop: Zamalek</span>
      </div>

      {/* Task Cards */}
      {loading ? (
        <div className="py-12 text-center text-zinc-500 text-xs">
          Loading active manifest...
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task, idx) => {
          const isCompleted = task.status === 'completed';
          return (
            <div
              key={task.id}
              className={`p-3 rounded-xl border transition-all ${
                isCompleted
                  ? 'bg-[#1e1d1d] border-[#2c2b2b] opacity-60'
                  : 'bg-[#242323] border-white/20 shadow-md'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{task.customer_name}</h4>
                    <span className="text-[10px] text-zinc-400 font-mono">#{task.order_number}</span>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {task.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-1.5 text-xs text-zinc-300 mb-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{task.delivery_address}</span>
              </div>

              {/* Items List inside */}
              <div className="p-2 bg-[#1c1b1b] rounded-lg text-xs space-y-1 mb-3">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                  Crated Architectural Items:
                </span>
                {task.items && task.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-zinc-300 text-[11px]">
                    <span className="truncate max-w-[200px]">{item.product_name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* COD Notice */}
              {Number(task.cod_amount) > 0 && (
                <div className="flex items-center justify-between p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 mb-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <Banknote className="w-3.5 h-3.5" />
                    <span>Cash on Delivery:</span>
                  </span>
                  <span className="font-bold">{new Intl.NumberFormat('en-US').format(task.cod_amount)} EGP</span>
                </div>
              )}

              {/* Actions */}
              {!isCompleted ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/driver/navigation"
                    className="py-2.5 bg-white text-black rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Start GPS Nav</span>
                  </Link>

                  <Link
                    href="/driver/pod"
                    className="py-2.5 bg-[#333232] text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#444343] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Handover (POD)</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-semibold py-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Delivery Confirmed with OTP & Signature</span>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="py-12 text-center text-zinc-500 text-xs">
          No stops currently assigned. Check in with Central Dispatch.
        </div>
      )}
    </div>
  );
}
