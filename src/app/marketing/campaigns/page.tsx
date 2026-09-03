'use client';

import React, { useState } from 'react';
import { Megaphone, Plus, CheckCircle2, Pause, Play } from 'lucide-react';

export default function MarketingCampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: 'Autumn Solstice Architectural Monoliths', slug: 'autumn-solstice-2026', channel: 'Editorial Email', reach: 4850, conv: 142, rev: '420,000 EGP', status: 'active' },
    { id: 2, title: 'Private Client Atelier Preview (Zamalek & New Cairo)', slug: 'vip-private-preview', channel: 'Curated Catalog Folio', reach: 1200, conv: 78, rev: '580,000 EGP', status: 'active' },
  ]);

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D011 • PAGE 102
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Editorial Marketing Campaigns
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Campaign Title</th>
              <th className="p-sm">Distribution Channel</th>
              <th className="p-sm">Audience Reach</th>
              <th className="p-sm">Conversions</th>
              <th className="p-sm">Attributed Revenue</th>
              <th className="p-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm">
                  <span className="font-semibold text-on-surface block">{c.title}</span>
                  <span className="text-[11px] text-secondary font-mono">/{c.slug}</span>
                </td>
                <td className="p-sm text-secondary font-medium">{c.channel}</td>
                <td className="p-sm font-mono">{c.reach.toLocaleString()} HNW</td>
                <td className="p-sm font-mono font-semibold">{c.conv} drops</td>
                <td className="p-sm font-headline-sm font-bold text-emerald-700">{c.rev}</td>
                <td className="p-sm">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
