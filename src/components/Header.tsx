'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCommerce } from '@/context/CommerceContext';
import { Search, ShoppingBag, Heart, User, X, ArrowRight, Sparkles, Check, ChevronDown } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen, language, setLanguage, formatPrice } = useCommerce();

  const [headerQuery, setHeaderQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Debounced search query
  useEffect(() => {
    if (!headerQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(headerQuery)}`);
        const data = await res.json();
        setSearchResults(data.products || []);
        setIsDropdownOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [headerQuery]);

  // Click outside listener to dismiss search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (slug: string) => {
    setIsDropdownOpen(false);
    setHeaderQuery('');
    router.push(`/product/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && headerQuery.trim()) {
      setIsDropdownOpen(false);
      router.push(`/collection?q=${encodeURIComponent(headerQuery)}`);
    }
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container">
      {/* Regional Luxury Top Bar */}
      <div className="bg-secondary-container text-on-secondary-fixed-variant px-4 sm:px-margin py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-[11px] tracking-wider uppercase">
          <span className="truncate font-medium">
            Complimentary White-Glove Regional Delivery on Orders Over 5,000 EGP
          </span>
          <div className="flex items-center gap-sm shrink-0">
            <span className="hidden sm:inline text-secondary font-medium">
              Cairo • Giza Same-Day Priority Fleet
            </span>
            <span className="text-outline">|</span>
            <button
              onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
              className="hover:text-primary transition-colors cursor-pointer font-bold"
            >
              {language === 'EN' ? 'العربية (RTL)' : 'English (LTR)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-margin flex items-center justify-between gap-md md:gap-gutter">
        {/* Left: Brand Logo & Public Nav */}
        <div className="flex items-center gap-md lg:gap-lg">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-lg tracking-tighter shadow-sm">
              L
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-xl tracking-widest text-on-surface uppercase font-semibold">
                LUMIO
              </span>
              <span className="text-[9px] tracking-[0.25em] text-secondary uppercase -mt-1 font-mono">
                Ateliers • Cairo
              </span>
            </div>
          </Link>

          {/* Clean Public Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/collection"
              className="px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors tracking-wider uppercase font-medium"
            >
              Collection
            </Link>
            <Link
              href="/collection?cat=Lighting"
              className="px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors tracking-wider uppercase font-medium"
            >
              Lighting
            </Link>
            <Link
              href="/collection?cat=Furniture"
              className="px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors tracking-wider uppercase font-medium"
            >
              Furniture
            </Link>
            <Link
              href="/concierge"
              className="px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors tracking-wider uppercase font-medium"
            >
              Concierge
            </Link>
          </nav>
        </div>

        {/* Center: Dynamic Responsive Search Bar with Live Autocomplete Dropdown */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-md hidden sm:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-outline absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (headerQuery.trim() && searchResults.length > 0) {
                  setIsDropdownOpen(true);
                }
              }}
              placeholder="Search travertine, bronze, lighting..."
              className="w-full pl-9 pr-14 py-2 bg-surface-container-low hover:bg-surface-container focus:bg-surface-container-lowest border border-surface-container focus:border-primary rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none transition-all shadow-sm"
            />
            {headerQuery ? (
              <button
                onClick={() => {
                  setHeaderQuery('');
                  setIsDropdownOpen(false);
                }}
                className="absolute right-3 text-outline hover:text-on-surface p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                title="Open Command Palette"
                className="absolute right-2.5 font-label-sm text-[10px] bg-surface-container-high text-secondary hover:text-on-surface px-1.5 py-0.5 rounded font-mono uppercase"
              >
                ⌘K
              </button>
            )}
          </div>

          {/* Live Instant Search Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {searchLoading ? (
                <div className="p-4 text-center text-xs text-secondary font-mono">
                  Consulting architectural archive...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="max-h-[380px] overflow-y-auto divide-y divide-surface-container">
                  <div className="px-3.5 py-2 bg-surface-container-low text-[10px] uppercase font-bold tracking-widest text-secondary flex justify-between items-center">
                    <span>Matching Objects ({searchResults.length})</span>
                    <span className="font-mono">Press Enter for full archive</span>
                  </div>
                  {searchResults.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="p-3 hover:bg-surface-container-low/70 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80')}
                          alt={product.name}
                          className="w-11 h-11 rounded-lg object-cover bg-surface-container shrink-0 border border-surface-container"
                        />
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-secondary font-mono">
                            {product.category} • {product.material || 'Artisanal Finish'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-headline-sm text-on-surface block">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-2.5 bg-surface-container-low text-center">
                    <Link
                      href={`/collection?q=${encodeURIComponent(headerQuery)}`}
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-xs text-primary font-bold uppercase tracking-wider hover:underline flex items-center justify-center gap-1"
                    >
                      <span>View All Matching Silhouettes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-secondary space-y-1">
                  <p className="font-medium text-on-surface">No objects matching &ldquo;{headerQuery}&rdquo;</p>
                  <p className="text-[11px]">Try searching &ldquo;travertine&rdquo;, &ldquo;luminaire&rdquo;, or &ldquo;bronze&rdquo;.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions: Mobile Search, Currency, Wishlist (Love), Cart, Customer Profile */}
        <div className="flex items-center gap-2 sm:gap-sm">
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="sm:hidden p-2 rounded-full hover:bg-surface-container text-on-surface-variant"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Currency indicator */}
          <div className="hidden lg:flex items-center gap-xs font-label-md text-xs text-on-surface-variant px-2.5 py-1.5 bg-surface-container-low rounded-lg border border-surface-container">
            <span className="font-semibold text-on-surface">EGP</span>
            <span className="text-outline">•</span>
            <span>EN</span>
          </div>

          {/* Wishlist / Save for Later by Category (Love) */}
          <Link
            href="/wishlist"
            className="relative p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors group"
            aria-label="Wishlist"
            title="Saved Silhouettes (Wishlist)"
          >
            <Heart className="w-5 h-5 group-hover:text-primary transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors group"
            aria-label="Cart"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Customer Account Avatar & Menu */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-surface-container transition-colors"
              title="Private Client Account"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-semibold text-xs flex items-center justify-center border border-surface-container">
                FM
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-secondary hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-2 z-50 text-xs text-on-surface animate-in fade-in slide-in-from-top-1 duration-100">
                <div className="px-3 py-2 border-b border-surface-container mb-1">
                  <span className="font-bold block text-on-surface">Farida Mansour</span>
                  <span className="text-[10px] text-secondary font-mono">farida.mansour@vip.eg</span>
                  <span className="mt-1 inline-block px-1.5 py-0.5 rounded bg-secondary-container text-on-surface text-[9px] font-semibold uppercase">
                    Private Client Tier
                  </span>
                </div>

                <Link
                  href="/account"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low flex items-center justify-between group"
                >
                  <span>Orders & History</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low flex items-center justify-between group"
                >
                  <span>Saved Addresses & Profile</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low flex items-center justify-between group"
                >
                  <span>Saved for Later (Wishlist)</span>
                  <span className="font-mono text-primary font-bold">({wishlist.length})</span>
                </Link>

                <div className="border-t border-surface-container my-1 pt-1">
                  <Link
                    href="/customer/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low block"
                  >
                    Switch Account / Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
