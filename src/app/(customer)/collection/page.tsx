'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

export const dynamic = 'force-dynamic';

function CollectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || searchParams.get('category') || 'all';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = [
    { id: 'all', name: 'All Silhouettes' },
    { id: 'lighting', name: 'Lighting & Luminaires' },
    { id: 'furniture', name: 'Sculptural Seating' },
    { id: 'ceramics', name: 'Raw Ceramic Objects' },
    { id: 'surfaces', name: 'Architectural Surfaces' },
    { id: 'textiles', name: 'Flax Linens & Textiles' },
  ];

  const materials = ['all', 'Travertine', 'Terracotta', 'Bronze', 'Alabaster', 'Flax', 'Marble'];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = `/api/products?sort=${sortBy}`;
        if (selectedCategory !== 'all') {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory, sortBy]);

  // Client-side material filtering
  const filteredProducts = products.filter((p) => {
    if (selectedMaterial === 'all') return true;
    return (p.material || '').toLowerCase().includes(selectedMaterial.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-lg border-b border-surface-container pb-md">
        <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-xs">
          Archive Editions
        </span>
        <h1 className="font-headline-lg text-3xl md:text-5xl uppercase font-bold tracking-tight text-on-surface">
          Curated Collection
        </h1>
        <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mt-xs">
          Monolithic travertine plinths, sand-cast bronze luminaires, and organic Egyptian flax loomed for sensory living spaces.
        </p>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-sm mb-lg">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-sm py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Right Controls: Material & Sorting */}
        <div className="flex items-center gap-sm w-full md:w-auto justify-between md:justify-end">
          {/* Material Selector */}
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="bg-surface-container-low border border-surface-container text-on-surface font-label-md text-xs px-sm py-1.5 rounded uppercase tracking-wider focus:outline-none focus:border-primary"
          >
            <option value="all">All Materials</option>
            {materials.filter((m) => m !== 'all').map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-low border border-surface-container text-on-surface font-label-md text-xs px-sm py-1.5 rounded uppercase tracking-wider focus:outline-none focus:border-primary"
          >
            <option value="default">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Client Rating</option>
          </select>
        </div>
      </div>

      {/* Results stats */}
      <div className="flex items-center justify-between text-xs text-secondary mb-md">
        <span>Displaying {filteredProducts.length} architectural pieces</span>
        {selectedMaterial !== 'all' && (
          <button
            onClick={() => setSelectedMaterial('all')}
            className="flex items-center gap-1 text-primary underline uppercase font-medium text-[11px]"
          >
            <span>Reset Material ({selectedMaterial})</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-24 text-center text-secondary">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-sm" />
          <p className="font-label-md text-xs uppercase tracking-wider">Retrieving Atelier Catalog...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-headline-sm text-xl text-on-surface mb-1">No silhouettes found</p>
          <p className="text-sm text-secondary mb-md">Try resetting your filters or selecting a different category.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedMaterial('all');
            }}
            className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <Suspense fallback={<div className="py-24 text-center text-secondary">Loading Collection...</div>}>
        <CollectionContent />
      </Suspense>
    </div>
  );
}
