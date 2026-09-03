'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldAlert, CheckCircle2, Search, Filter } from 'lucide-react';

export default function SuperAdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([
    { id: 1, action: 'LOGIN_SUCCESS', username: 'superadmin', dept: 'D001', entity: 'Authentication', details: 'Session token issued. IP 127.0.0.1', time: 'Just now' },
    { id: 2, action: 'SECURITY_AUDIT', username: 'system', dept: 'D001', entity: 'Policy Engine', details: 'Strict Department Isolation rule verified active.', time: '5 mins ago' },
    { id: 3, action: 'STOCK_TRANSFER', username: 'inventorymgr', dept: 'D004', entity: 'Warehouse WMS', details: 'Transferred 4 units of SKU LUM-LGT-001 from Zayed to New Cairo.', time: '22 mins ago' },
    { id: 4, action: 'ORDER_CONFIRMED', username: 'salesrep', dept: 'D006', entity: 'Order OMS', details: 'Order #LUM-2026-8891 approved for 50,500 EGP.', time: '1 hour ago' },
    { id: 5, action: 'DISPATCH_ASSIGNED', username: 'deliverymgr', dept: 'D008', entity: 'Fleet Dispatch', details: 'Assigned courier Karim Mostafa (Sprinter) to Zamalek route.', time: '2 hours ago' },
    { id: 6, action: 'POD_COMPLETED', username: 'driver1', dept: 'D009', entity: 'Delivery POD', details: 'Customer 4-digit OTP 8492 verified with client digital signature.', time: '3 hours ago' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D001 • PAGE 005
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Global Audit & Security Logs
          </h1>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 bg-surface-container-low border border-surface-container rounded-lg text-xs font-mono text-on-surface"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Timestamp</th>
              <th className="p-sm">Department</th>
              <th className="p-sm">Actor / Username</th>
              <th className="p-sm">Action Type</th>
              <th className="p-sm">Entity Scope</th>
              <th className="p-sm">Audit Payload</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono text-secondary">{log.time}</td>
                <td className="p-sm font-mono font-bold text-primary">{log.dept}</td>
                <td className="p-sm font-mono font-semibold text-on-surface">{log.username}</td>
                <td className="p-sm">
                  <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                    {log.action}
                  </span>
                </td>
                <td className="p-sm text-secondary font-medium">{log.entity}</td>
                <td className="p-sm font-mono text-secondary max-w-md truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
