'use client';

import React, { useState, useEffect } from 'react';
import { Users, Shield, KeyRound, CheckCircle2, XCircle } from 'lucide-react';

export default function SuperAdminUsersPage() {
  const [users, setUsers] = useState<any[]>([
    { id: 101, username: 'superadmin', name: 'Hisham Talaat', email: 'super.admin@lumio.design', dept: 'D001', role: 'SUPER_ADMIN', pin: '123456', status: 'active' },
    { id: 102, username: 'storeadmin', name: 'Laila Kamel', email: 'store.admin@lumio.design', dept: 'D002', role: 'STORE_ADMIN', pin: '234567', status: 'active' },
    { id: 103, username: 'productmgr', name: 'Ziad El-Gammal', email: 'product.mgr@lumio.design', dept: 'D003', role: 'PRODUCT_MANAGER', pin: '345678', status: 'active' },
    { id: 104, username: 'inventorymgr', name: 'Sameh Farouk', email: 'inventory.mgr@lumio.design', dept: 'D004', role: 'INVENTORY_MANAGER', pin: '456789', status: 'active' },
    { id: 105, username: 'warehouse1', name: 'Mahmoud Reda', email: 'warehouse.ops@lumio.design', dept: 'D005', role: 'WAREHOUSE', pin: '567890', status: 'active' },
    { id: 106, username: 'salesrep', name: 'Nour Ezzat', email: 'sales.director@lumio.design', dept: 'D006', role: 'SALES', pin: '678901', status: 'active' },
    { id: 107, username: 'supportrep', name: 'Yasmine Sabry', email: 'support.lead@lumio.design', dept: 'D007', role: 'CUSTOMER_SUPPORT', pin: '789012', status: 'active' },
    { id: 108, username: 'deliverymgr', name: 'Ibrahim Ghanem', email: 'dispatch.chief@lumio.design', dept: 'D008', role: 'DELIVERY_MANAGER', pin: '890123', status: 'active' },
    { id: 109, username: 'driver1', name: 'Karim Mostafa', email: 'courier.karim@lumio.design', dept: 'D009', role: 'DRIVER', pin: '901234', status: 'active' },
    { id: 110, username: 'accountant', name: 'Tamer Hegazy', email: 'cfo.accounting@lumio.design', dept: 'D010', role: 'ACCOUNTING', pin: '112233', status: 'active' },
    { id: 111, username: 'marketmgr', name: 'Salma Soliman', email: 'marketing.lead@lumio.design', dept: 'D011', role: 'MARKETING', pin: '223344', status: 'active' },
    { id: 112, username: 'client1', name: 'Farida Mansour', email: 'farida.mansour@vip.eg', dept: 'D012', role: 'CUSTOMER', pin: '334455', status: 'active' },
  ]);

  const toggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u))
    );
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D001 • PAGE 004
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Global Department Users & 6-Digit PIN Directory
          </h1>
        </div>

        <span className="text-xs text-secondary font-mono">
          Total Assigned Staff: {users.length}
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">User / Name</th>
              <th className="p-sm">Username</th>
              <th className="p-sm">Department ID</th>
              <th className="p-sm">Assigned Role</th>
              <th className="p-sm">6-Digit PIN</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm">
                  <span className="font-semibold text-on-surface block">{u.name}</span>
                  <span className="text-[11px] text-secondary font-mono">{u.email}</span>
                </td>
                <td className="p-sm font-mono font-bold text-on-surface">{u.username}</td>
                <td className="p-sm">
                  <span className="font-mono text-primary font-bold px-2 py-0.5 rounded bg-surface-container text-[11px]">
                    {u.dept}
                  </span>
                </td>
                <td className="p-sm text-secondary font-medium">{u.role}</td>
                <td className="p-sm font-mono tracking-widest text-primary font-bold">{u.pin}</td>
                <td className="p-sm">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-sm text-right">
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold transition-colors"
                  >
                    {u.status === 'active' ? 'Disable Access' : 'Enable Access'}
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
