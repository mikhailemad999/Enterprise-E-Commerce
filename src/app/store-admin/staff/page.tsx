'use client';

import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';

export default function StoreAdminStaffPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Laila Kamel', username: 'storeadmin', dept: 'D002', role: 'Store Administrator', pin: '234567', status: 'active' },
    { id: 2, name: 'Ziad El-Gammal', username: 'productmgr', dept: 'D003', role: 'Product Manager', pin: '345678', status: 'active' },
    { id: 3, name: 'Sameh Farouk', username: 'inventorymgr', dept: 'D004', role: 'Inventory Specialist', pin: '456789', status: 'active' },
    { id: 4, name: 'Mahmoud Reda', username: 'warehouse1', dept: 'D005', role: 'Fulfillment Lead', pin: '567890', status: 'active' },
    { id: 5, name: 'Nour Ezzat', username: 'salesrep', dept: 'D006', role: 'Sales Executive', pin: '678901', status: 'active' },
    { id: 6, name: 'Yasmine Sabry', username: 'supportrep', dept: 'D007', role: 'Private Client Concierge', pin: '789012', status: 'active' },
    { id: 7, name: 'Ibrahim Ghanem', username: 'deliverymgr', dept: 'D008', role: 'Fleet Dispatch Controller', pin: '890123', status: 'active' },
  ]);

  const toggleStaffStatus = (id: number) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'disabled' : 'active' } : s))
    );
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D002 • PAGE 013
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Staff Department Assignments & PINs
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Staff Member</th>
              <th className="p-sm">Assigned Dept</th>
              <th className="p-sm">Login Username</th>
              <th className="p-sm">Role Title</th>
              <th className="p-sm">Security PIN</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-semibold text-on-surface">{s.name}</td>
                <td className="p-sm">
                  <span className="font-mono text-primary font-bold px-2 py-0.5 rounded bg-surface-container text-[11px]">
                    {s.dept}
                  </span>
                </td>
                <td className="p-sm font-mono text-on-surface">{s.username}</td>
                <td className="p-sm text-secondary">{s.role}</td>
                <td className="p-sm font-mono tracking-widest text-primary font-bold">{s.pin}</td>
                <td className="p-sm">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      s.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="p-sm text-right">
                  <button
                    onClick={() => toggleStaffStatus(s.id)}
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold"
                  >
                    {s.status === 'active' ? 'Suspend' : 'Reinstate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
