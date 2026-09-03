'use client';

import React, { useState } from 'react';
import { LifeBuoy, CheckCircle2, MessageSquare, Plus, Clock } from 'lucide-react';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState([
    { id: 1, ticketNumber: 'TCK-2026-001', customer: 'Farida Mansour', email: 'farida.mansour@vip.eg', subject: 'Inquiry regarding Torso Luminaire Fayoum flax shade patina', priority: 'medium', status: 'open', assigned: 'Yasmine Sabry' },
    { id: 2, ticketNumber: 'TCK-2026-002', customer: 'Sherif Aly', email: 'sherif.aly@equity.eg', subject: 'White-glove delivery scheduling request for Palm Hills residence', priority: 'high', status: 'pending', assigned: 'Yasmine Sabry' },
    { id: 3, ticketNumber: 'TCK-2026-003', customer: 'Tarek Zaki', email: 'tarek@zaki.eg', subject: 'Architectural consultation for New Cairo private gallery', priority: 'low', status: 'resolved', assigned: 'Yasmine Sabry' },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const toggleStatus = (id: number) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: t.status === 'open' ? 'resolved' : 'open' } : t));
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D007 • PAGE 062
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Support Tickets & Client Inquiries
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Ticket #</th>
              <th className="p-sm">Private Client</th>
              <th className="p-sm">Subject</th>
              <th className="p-sm">Priority</th>
              <th className="p-sm">Assigned Concierge</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-mono font-bold text-on-surface">#{t.ticketNumber}</td>
                <td className="p-sm">
                  <span className="font-semibold text-on-surface block">{t.customer}</span>
                  <span className="text-[11px] text-secondary font-mono">{t.email}</span>
                </td>
                <td className="p-sm text-on-surface font-medium max-w-xs truncate">{t.subject}</td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    t.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-surface-container text-secondary'
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="p-sm text-secondary">{t.assigned}</td>
                <td className="p-sm">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-sm text-right space-x-1">
                  <button
                    onClick={() => toggleStatus(t.id)}
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold"
                  >
                    {t.status === 'open' ? 'Resolve' : 'Reopen'}
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
