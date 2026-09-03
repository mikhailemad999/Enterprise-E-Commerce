'use client';

import React, { useState } from 'react';
import { Building2, Plus, CheckCircle2, PauseCircle, Trash2, Edit } from 'lucide-react';

export default function SuperAdminTenantsPage() {
  const [tenants, setTenants] = useState([
    { id: 1, name: 'Lumio Cairo Flagship', domain: 'cairo.lumio.design', tier: 'Enterprise Plus', status: 'active', contact: 'hisham.talaat@lumio.design' },
    { id: 2, name: 'Lumio Alexandria Port Atelier', domain: 'alex.lumio.design', tier: 'Enterprise Custom', status: 'active', contact: 'karim.alex@lumio.design' },
    { id: 3, name: 'Lumio Giza Gallery & Hub', domain: 'giza.lumio.design', tier: 'Professional', status: 'active', contact: 'laila.giza@lumio.design' },
    { id: 4, name: 'Lumio Red Sea Hospitality Suites', domain: 'redsea.lumio.design', tier: 'Boutique', status: 'active', contact: 'suites@lumio.design' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTenant, setNewTenant] = useState({ name: '', domain: '', tier: 'Enterprise', contact: '' });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenant.name) return;
    setTenants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTenant.name,
        domain: newTenant.domain || `${newTenant.name.toLowerCase().replace(/\s+/g, '')}.lumio.design`,
        tier: newTenant.tier,
        status: 'active',
        contact: newTenant.contact || 'admin@lumio.design',
      },
    ]);
    setShowModal(false);
    setNewTenant({ name: '', domain: '', tier: 'Enterprise', contact: '' });
  };

  const toggleStatus = (id: number) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' } : t))
    );
  };

  return (
    <div className="space-y-lg">
      <div className="border-b border-surface-container pb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block font-mono">
            D001 • PAGE 003
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface">
            Tenant Management
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Tenant</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
            <tr>
              <th className="p-sm">Workspace Name</th>
              <th className="p-sm">Subdomain</th>
              <th className="p-sm">Subscription Plan</th>
              <th className="p-sm">Primary Contact</th>
              <th className="p-sm">Status</th>
              <th className="p-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-sm font-semibold text-on-surface">{t.name}</td>
                <td className="p-sm font-mono text-secondary">{t.domain}</td>
                <td className="p-sm font-medium">{t.tier}</td>
                <td className="p-sm text-secondary">{t.contact}</td>
                <td className="p-sm">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-sm text-right space-x-2">
                  <button
                    onClick={() => toggleStatus(t.id)}
                    className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[10px] uppercase font-semibold"
                  >
                    {t.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full p-md rounded-2xl border border-surface-container shadow-2xl space-y-md">
            <h3 className="font-headline-sm text-lg font-bold text-on-surface uppercase">Provision Workspace</h3>
            <form onSubmit={handleAddTenant} className="space-y-sm text-xs">
              <div>
                <label className="text-secondary uppercase tracking-wider block mb-1">Tenant Name</label>
                <input
                  type="text"
                  required
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  placeholder="e.g. Lumio Sahel Resort Atelier"
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded"
                />
              </div>
              <div>
                <label className="text-secondary uppercase tracking-wider block mb-1">Subdomain</label>
                <input
                  type="text"
                  value={newTenant.domain}
                  onChange={(e) => setNewTenant({ ...newTenant, domain: e.target.value })}
                  placeholder="e.g. sahel.lumio.design"
                  className="w-full p-2 bg-surface-container-low border border-surface-container rounded"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-sm py-1.5 text-secondary uppercase text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-sm py-1.5 bg-primary text-on-primary rounded uppercase text-[11px] font-bold"
                >
                  Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
