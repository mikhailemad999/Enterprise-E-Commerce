import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container py-xl px-4 sm:px-margin">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-xl">
        {/* Brand Col */}
        <div className="lg:col-span-2 flex flex-col items-start pr-lg">
          <div className="flex items-center gap-2 mb-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
              L
            </div>
            <span className="font-headline-sm text-xl tracking-widest text-on-surface uppercase font-semibold">
              LUMIO
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary max-w-sm mb-md leading-relaxed">
            An architectural study in sensory domesticity. Hand-shaped ceramics, raw monolithic stone, and organic unbleached Egyptian flax loomed for quiet interiors.
          </p>
          <div className="text-xs text-secondary space-y-1">
            <p className="font-medium text-on-surface">Private Gallery & Ateliers:</p>
            <p>14 Hassan Sabry St, Zamalek, Cairo</p>
            <p>Villa 8, North Choueifat, New Cairo</p>
          </div>
        </div>

        {/* Links Col 1 */}
        <div>
          <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-sm font-semibold">
            Atelier Archives
          </h4>
          <ul className="space-y-2 text-body-sm text-secondary">
            <li><Link href="/collection?cat=lighting" className="hover:text-primary transition-colors">Lighting & Luminaires</Link></li>
            <li><Link href="/collection?cat=furniture" className="hover:text-primary transition-colors">Sculptural Seating</Link></li>
            <li><Link href="/collection?cat=surfaces" className="hover:text-primary transition-colors">Monolithic Stone Plinths</Link></li>
            <li><Link href="/collection?cat=ceramics" className="hover:text-primary transition-colors">Fayoum Terracotta</Link></li>
            <li><Link href="/collection?cat=textiles" className="hover:text-primary transition-colors">Nubian Heavy Linens</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div>
          <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-sm font-semibold">
            Services & Systems
          </h4>
          <ul className="space-y-2 text-body-sm text-secondary">
            <li><Link href="/concierge" className="hover:text-primary transition-colors">Bespoke Concierge</Link></li>
            <li><Link href="/tracking/LUM-2026-8891" className="hover:text-primary transition-colors">Live Courier Tracking</Link></li>
            <li><Link href="/account" className="hover:text-primary transition-colors">Client Folio & RMA</Link></li>
            <li><Link href="/admin" className="hover:text-primary transition-colors font-medium text-on-surface">Admin Control Room</Link></li>
            <li><Link href="/driver" className="hover:text-primary transition-colors font-medium text-on-surface">Driver Fleet Portal</Link></li>
          </ul>
        </div>

        {/* Newsletter Col */}
        <div>
          <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-sm font-semibold">
            Private Inquiries
          </h4>
          <p className="font-body-sm text-xs text-secondary mb-sm">
            Receive private monograph notices and quarterly editions.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="atelier@domain.com"
              className="px-sm py-2 bg-surface-container-lowest border border-surface-container-high rounded text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            <button className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded hover:bg-inverse-surface transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-md border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-sm text-xs text-secondary">
        <p>&copy; {new Date().getFullYear()} Lumio Architectural Ateliers LLC. Cairo • Giza • Alexandria.</p>
        <div className="flex items-center gap-md">
          <span>CR No. 109482 / Cairo Chamber</span>
          <span>PCI DSS Level 1</span>
          <span>Paymob Verified</span>
        </div>
      </div>
    </footer>
  );
}
