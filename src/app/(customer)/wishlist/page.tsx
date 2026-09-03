'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCommerce } from '@/context/CommerceContext';
import { Heart, ShoppingBag, ArrowRight, Trash2, CheckCircle2, Sparkles, Truck, Layers } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart, formatPrice } = useCommerce();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  // Extract categories from saved items
  const categories = ['All', ...Array.from(new Set(savedProducts.map((p) => p.category).filter(Boolean)))];

  const filteredProducts = selectedCategory === 'All'
    ? savedProducts
    : savedProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setAddedItemNotice(product.name);
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  const handleBuyNow = (product: any) => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-7xl mx-auto space-y-lg">
        {/* Page Title & Breadcrumb */}
        <div className="border-b border-surface-container pb-md flex flex-col md:flex-row md:items-center justify-between gap-sm">
          <div>
            <div className="flex items-center gap-2 text-xs text-secondary uppercase tracking-widest font-mono mb-1">
              <Link href="/" className="hover:text-primary transition-colors">Ateliers</Link>
              <span>/</span>
              <span className="text-on-surface">Private Folio</span>
            </div>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold uppercase tracking-tight text-on-surface flex items-center gap-2">
              <span>Saved for Later</span>
              <span className="font-mono text-base font-normal text-secondary">
                ({savedProducts.length} Silhouettes)
              </span>
            </h1>
          </div>

          <Link
            href="/collection"
            className="px-sm py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-xl font-label-md text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Instant feedback notice */}
        {addedItemNotice && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 font-medium flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Added &ldquo;{addedItemNotice}&rdquo; to your shopping bag.</span>
            </div>
            <Link href="/checkout" className="text-primary font-bold uppercase hover:underline">
              Proceed to Checkout →
            </Link>
          </div>
        )}

        {/* Category Filters for Wishlist */}
        {savedProducts.length > 0 && categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5" />
              Filter by Category:
            </span>
            {categories.map((cat) => {
              const count = cat === 'All' ? savedProducts.length : savedProducts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-label-md uppercase tracking-wider transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-surface-container'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Wishlist Grid */}
        {loading ? (
          <div className="py-20 text-center text-secondary text-sm font-mono">
            Consulting your private saved collection...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.map((product) => {
              const img = Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : (product.image || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80');

              return (
                <div
                  key={product.id}
                  className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      title="Remove from Saved"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-red-600 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    {product.category && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-md flex-1 flex flex-col justify-between space-y-md">
                    <div>
                      <div className="flex justify-between items-baseline gap-2 mb-1">
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-headline-sm text-base font-bold text-on-surface hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <span className="font-mono text-xs text-secondary shrink-0">
                          {product.sku}
                        </span>
                      </div>
                      <p className="text-xs text-secondary mb-2 line-clamp-2">
                        {product.description || 'Architectural statement piece hand-sculpted in Egypt.'}
                      </p>
                      <div className="text-xs text-secondary font-mono">
                        Finish: <span className="text-on-surface font-medium">{product.material || 'Raw Travertine & Flax'}</span>
                      </div>
                    </div>

                    <div className="space-y-sm pt-2 border-t border-surface-container">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-secondary uppercase tracking-widest block font-mono">Price</span>
                          <span className="font-headline-sm text-lg font-bold text-on-surface">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 font-bold uppercase">
                          In Stock
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="py-2.5 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => handleBuyNow(product)}
                          className="py-2.5 px-3 bg-primary hover:bg-inverse-surface text-on-primary rounded-xl font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-xl bg-surface-container-lowest rounded-2xl border border-surface-container text-center space-y-md">
            <div className="w-16 h-16 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 opacity-40" />
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold uppercase text-on-surface">
                No Saved Silhouettes in this Category
              </h3>
              <p className="text-xs text-secondary max-w-md mx-auto mt-1">
                Explore our curated architectural collection and tap the heart icon on any piece you wish to save for future commissions.
              </p>
            </div>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-md py-3 bg-primary text-on-primary rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-inverse-surface transition-colors shadow-sm"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
