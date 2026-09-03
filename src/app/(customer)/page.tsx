import React from 'react';
import Link from 'next/link';
import { query } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Sparkles, Shield, Truck, Compass, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

async function getFeaturedProducts() {
  try {
    const products = await query<any[]>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.is_active = TRUE
       ORDER BY p.is_featured DESC, p.id ASC
       LIMIT 8`
    );

    return products.map((p) => {
      let images: string[] = [];
      try {
        images = typeof p.images_json === 'string' ? JSON.parse(p.images_json) : (p.images_json || []);
      } catch (e) {
        images = [];
      }
      return {
        ...p,
        images,
        image: images[0] || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        price: Number(p.price),
      };
    });
  } catch (err) {
    console.error('Failed to load featured products:', err);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Editorial Hero Section */}
      <section className="relative w-full px-4 sm:px-margin py-lg lg:py-xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-xs px-sm py-1 bg-secondary-container text-on-secondary-fixed-variant rounded-full mb-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-[11px] uppercase tracking-wider">
                Autumn / Winter MMXV Edition
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight text-on-surface uppercase mb-md max-w-xl font-bold">
              Timeless Objects.<br />
              <span className="text-secondary font-light font-serif-italic lowercase">Considered</span> Living.
            </h1>

            <p className="font-body-lg text-lg text-on-surface-variant max-w-lg mb-lg leading-relaxed">
              An architectural approach to sensory domesticity. Sculptural silhouettes cast in monolithic travertine, unlacquered bronze, and organic Egyptian flax linen.
            </p>

            <div className="flex flex-wrap items-center gap-sm">
              <Link
                href="/collection"
                className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded shadow-md hover:bg-inverse-surface transition-all flex items-center gap-xs group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/concierge"
                className="px-md py-sm bg-surface-container-high text-on-surface font-label-md text-xs uppercase tracking-wider rounded hover:bg-surface-container-highest transition-colors"
              >
                Bespoke Concierge
              </Link>
            </div>

            <div className="mt-xl pt-md flex items-center gap-lg border-t border-surface-container">
              <div>
                <p className="font-headline-sm text-2xl text-on-surface font-semibold">1,400+</p>
                <p className="font-label-sm text-[11px] text-secondary uppercase tracking-wider">Archived Silhouettes</p>
              </div>
              <div>
                <p className="font-headline-sm text-2xl text-on-surface font-semibold">100%</p>
                <p className="font-label-sm text-[11px] text-secondary uppercase tracking-wider">Natural Materials</p>
              </div>
              <div>
                <p className="font-headline-sm text-2xl text-on-surface font-semibold">Cairo • Giza</p>
                <p className="font-label-sm text-[11px] text-secondary uppercase tracking-wider">Same-day Courier Fleet</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-md lg:mt-0">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container shadow-2xl group border border-surface-container">
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85"
                alt="Torso Ceramic Luminaire"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6 p-sm bg-surface-container-lowest/90 backdrop-blur-md rounded-lg shadow-sm flex items-center justify-between border border-surface-container-high">
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary block">
                    Featured Piece No. 04
                  </span>
                  <span className="font-title-md text-base text-on-surface font-medium">
                    Torso Ceramic Luminaire
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-lg text-on-surface font-semibold block">
                    18,500 <span className="font-label-sm text-xs text-secondary">EGP</span>
                  </span>
                  <Link
                    href="/product/torso-ceramic-luminaire"
                    className="text-[11px] text-primary underline uppercase tracking-wider font-semibold"
                  >
                    View Piece
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Accent Monograph Tag */}
            <div className="hidden xl:flex absolute -bottom-6 -left-10 p-sm bg-surface-container-lowest rounded-lg shadow-xl max-w-xs items-center gap-sm border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-surface shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface uppercase tracking-wider font-semibold">
                  Hand-thrown in Fayoum
                </p>
                <p className="font-body-sm text-[12px] text-secondary">
                  Acoustically calibrated acoustic shade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Logistics Bar */}
      <section className="w-full bg-surface-container-low py-md px-4 sm:px-margin border-y border-surface-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="flex items-center gap-sm p-sm bg-surface-container-lowest rounded-lg shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-title-md text-sm text-on-surface font-medium leading-tight">Same-Day Courier Fleet</h4>
              <p className="font-body-sm text-xs text-on-surface-variant">Dedicated white-glove transport in Cairo & Giza</p>
            </div>
          </div>

          <div className="flex items-center gap-sm p-sm bg-surface-container-lowest rounded-lg shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-title-md text-sm text-on-surface font-medium leading-tight">Multi-Warehouse Fulfillment</h4>
              <p className="font-body-sm text-xs text-on-surface-variant">Real-time stock routing from 3 regional hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-sm p-sm bg-surface-container-lowest rounded-lg shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-title-md text-sm text-on-surface font-medium leading-tight">Architectural Concierge</h4>
              <p className="font-body-sm text-xs text-on-surface-variant">Bespoke sourcing for private residences and estates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Section */}
      <section className="w-full py-xl px-4 sm:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg">
            <div>
              <div className="flex items-center gap-xs font-label-sm text-xs uppercase tracking-wider text-secondary mb-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Curated Silhouettes</span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface uppercase font-bold tracking-tight">
                Architectural Editions
              </h2>
            </div>
            <Link
              href="/collection"
              className="mt-4 md:mt-0 font-label-md text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 group"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Materiality Manifesto */}
      <section className="w-full bg-surface-container-low py-xl px-4 sm:px-margin border-t border-surface-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div>
            <span className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-xs">
              Materiality Manifesto
            </span>
            <h3 className="font-headline-lg text-3xl md:text-5xl text-on-surface uppercase font-bold tracking-tight mb-md">
              Honest Earth.<br />
              <span className="text-secondary font-light font-serif-italic lowercase">unlacquered</span> Precision.
            </h3>
            <p className="font-body-md text-base text-secondary leading-relaxed mb-md">
              We reject transient synthetics. Every Lumio object is born from slow, geologic and organic elements: Roman travertine pitted by mineral hot springs, volcanic basalt chiseled by hand, and heritage long-staple Egyptian flax woven on Upper Egypt wooden looms.
            </p>

            <div className="space-y-sm">
              <div className="flex items-start gap-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-title-md text-sm text-on-surface font-medium">Upper Egypt Alabaster & Terracotta</h5>
                  <p className="font-body-sm text-xs text-secondary">Individually hand-lathed in Asyut and wood-fired in Fayoum.</p>
                </div>
              </div>
              <div className="flex items-start gap-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-title-md text-sm text-on-surface font-medium">Sand-Cast Unlacquered Bronze</h5>
                  <p className="font-body-sm text-xs text-secondary">Develops a living, bespoke patina responding to Cairo humidity and ambient touch.</p>
                </div>
              </div>
              <div className="flex items-start gap-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-title-md text-sm text-on-surface font-medium">White-Glove Fleet Delivery</h5>
                  <p className="font-body-sm text-xs text-secondary">Delivered directly to your residence with crating removal and placement.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-container">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Roman Travertine Plinth detail"
                className="w-full h-full object-cover grayscale contrast-105"
              />
            </div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-container mt-lg">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
                alt="Fayoum Ceramic Vessel detail"
                className="w-full h-full object-cover grayscale contrast-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Concierge Callout */}
      <section className="w-full py-xl px-4 sm:px-margin">
        <div className="max-w-7xl mx-auto rounded-2xl bg-primary text-on-primary p-md md:p-xl relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary-fixed block mb-xs">
              Private Commissioning
            </span>
            <h3 className="font-headline-lg text-3xl md:text-5xl uppercase font-bold tracking-tight mb-sm">
              Architectural Concierge & Bespoke Consultation
            </h3>
            <p className="font-body-md text-sm md:text-base text-secondary-fixed-dim mb-md leading-relaxed">
              Collaborate directly with our design directors for custom-scaled monolithic tables, site-specific lighting schemes, and exclusive private residential installations.
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-xs px-md py-sm bg-on-primary text-primary font-label-md text-xs uppercase tracking-wider rounded hover:bg-surface-container transition-colors"
            >
              <span>Schedule Atelier Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
