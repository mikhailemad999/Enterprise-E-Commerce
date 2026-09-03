'use client';

import React from 'react';
import Link from 'next/link';
import { useCommerce } from '@/context/CommerceContext';
import { Heart, Plus, Check } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, wishlist, toggleWishlist, formatPrice } = useCommerce();
  const [added, setAdded] = React.useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container hover:border-outline-variant transition-all hover:shadow-lg">
      {/* Image Wrap */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-error text-error' : ''}`} />
        </button>

        {/* Quick Add overlay button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAdd}
            className="w-full py-2 bg-primary/95 backdrop-blur-sm text-on-primary font-label-md text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1 hover:bg-black transition-colors shadow-md"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Added to Folio</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Folio</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-sm flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-xs mb-1">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary">
              {product.material || 'Natural Element'}
            </span>
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-medium">
              {product.brand || 'Lumio'}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-title-md text-[15px] font-medium text-on-surface hover:text-primary transition-colors leading-tight mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-surface-container">
          <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="font-label-sm text-xs text-outline line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
