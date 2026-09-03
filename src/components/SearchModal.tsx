'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCommerce } from '@/context/CommerceContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useCommerce();
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(queryText)}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [queryText]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden border border-surface-container-high transition-all">
        {/* Search Bar */}
        <div className="p-sm md:p-md border-b border-surface-container flex items-center gap-sm">
          <Search className="w-5 h-5 text-outline shrink-0" />
          <input
            ref={inputRef}
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Search bespoke silhouettes, travertine, bronze, lighting..."
            className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline focus:outline-none"
          />
          {queryText && (
            <button
              onClick={() => setQueryText('')}
              className="text-outline hover:text-on-surface p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block font-label-sm text-[10px] bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded uppercase">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-sm">
          {loading ? (
            <div className="py-md text-center text-secondary text-sm">
              Consulting archive...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider px-sm py-1">
                Matching Silhouettes ({results.length})
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                >
                  <div className="flex items-center gap-sm">
                    <div className="w-12 h-14 bg-surface-container rounded overflow-hidden shrink-0">
                      <img
                        src={product.images ? JSON.parse(product.images)[0] : product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="font-title-md text-[15px] text-on-surface font-medium group-hover:text-primary">
                        {product.name}
                      </h4>
                      <p className="font-label-sm text-[11px] text-secondary uppercase tracking-wider">
                        {product.material} • {product.brand}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="font-label-md text-sm text-on-surface font-semibold">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : queryText ? (
            <div className="py-lg text-center text-secondary">
              <p className="text-on-surface font-medium mb-1">No silhouettes found for &ldquo;{queryText}&rdquo;</p>
              <p className="text-xs text-secondary">Try searching for travertine, bronze, vessel, or lamp.</p>
            </div>
          ) : (
            <div className="p-sm">
              <div className="flex items-center gap-xs text-xs font-label-md uppercase tracking-wider text-secondary mb-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Curated Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-xs">
                {['Travertine Plinth', 'Ceramic Luminaire', 'Egyptian Flax', 'Fayoum Vessel', 'Alabaster Pendant'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQueryText(term)}
                      className="px-sm py-1 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-xs rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
