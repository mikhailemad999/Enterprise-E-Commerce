'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCommerce } from '@/context/CommerceContext';
import { Truck, ShieldCheck, Heart, Share2, Plus, Minus, Check, Star, Building2 } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, wishlist, toggleWishlist, formatPrice } = useCommerce();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-sm" />
        <p className="font-label-md text-xs uppercase tracking-wider text-secondary">Loading Architectural Dossier...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="font-headline-sm text-2xl text-on-surface mb-2">Silhouette Not Found</h2>
        <p className="text-secondary mb-md">The requested piece is currently not in the active catalog.</p>
        <Link href="/collection" className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded">
          Return to Collection
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs text-xs font-label-sm uppercase tracking-wider text-secondary mb-md">
          <Link href="/" className="hover:text-primary transition-colors">Lumio</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-primary transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-on-surface truncate">{product.name}</span>
        </div>

        {/* Top Split Section: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start mb-xl">
          {/* Gallery Col */}
          <div className="lg:col-span-7 flex flex-col gap-sm">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container border border-surface-container shadow-sm group">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-error text-error' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-sm overflow-x-auto pb-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Col */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-sm">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary block mb-1">
                {product.brand || 'Lumio Ateliers'} • {product.sku}
              </span>
              <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface uppercase font-bold tracking-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-xs text-xs text-secondary mb-md">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="font-semibold ml-1 text-on-surface">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.review_count || 24} Verified Architectural Commissions</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container mb-md flex items-baseline justify-between">
              <div>
                <span className="font-headline-sm text-2xl md:text-3xl text-on-surface font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="font-label-sm text-sm text-outline line-through ml-2">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-medium">
                Regional Duty & VAT Included
              </span>
            </div>

            {/* Short Narrative */}
            <p className="font-body-md text-sm md:text-base text-secondary leading-relaxed mb-md">
              {product.description}
            </p>

            {/* Specifications Matrix */}
            <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container space-y-2 text-xs mb-md">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary font-medium uppercase">Primary Material</span>
                <span className="text-on-surface font-semibold">{product.material}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary font-medium uppercase">Dimensions</span>
                <span className="text-on-surface font-semibold">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary font-medium uppercase">Weight</span>
                <span className="text-on-surface font-semibold">{product.weight_kg} kg</span>
              </div>
              {product.attributes && Object.entries(product.attributes).map(([key, val]: any) => (
                <div key={key} className="flex justify-between py-1 border-b border-surface-container">
                  <span className="text-secondary font-medium uppercase">{key.replace('_', ' ')}</span>
                  <span className="text-on-surface font-semibold">{val}</span>
                </div>
              ))}
            </div>

            {/* Multi-Warehouse Stock Availability Live Status */}
            <div className="mb-md">
              <div className="flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-on-surface mb-2 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span>Regional Fulfillment Centers</span>
              </div>
              <div className="space-y-1.5">
                {product.warehouseStock && product.warehouseStock.map((wh: any) => (
                  <div
                    key={wh.id}
                    className="flex items-center justify-between p-2 bg-surface-container-lowest rounded-lg border border-surface-container text-xs"
                  >
                    <div>
                      <span className="font-medium text-on-surface block">{wh.warehouse_name}</span>
                      <span className="text-[11px] text-secondary">{wh.warehouse_city}</span>
                    </div>
                    <div className="text-right">
                      {wh.quantity_available > 0 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          {wh.quantity_available} Units Available
                        </span>
                      ) : (
                        <span className="text-outline text-[11px]">Backorder (~14 Days)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-sm mb-md">
              <div className="flex items-center border border-surface-container rounded-lg bg-surface-container-lowest px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-surface-container rounded"
                >
                  <Minus className="w-4 h-4 text-on-surface" />
                </button>
                <span className="font-label-md text-sm font-semibold px-4 text-on-surface">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-surface-container rounded"
                >
                  <Plus className="w-4 h-4 text-on-surface" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-inverse-surface transition-all shadow-md group"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Client Folio</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Commission Piece ({formatPrice(product.price * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* White glove notice */}
            <div className="p-sm bg-secondary-container text-on-secondary-fixed-variant rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <Truck className="w-4 h-4 text-primary" />
                <span>Complimentary White-Glove Handover</span>
              </div>
              <p className="text-[11px] text-secondary">
                Includes private van dispatch, interior placement, uncrating, and protective surface leveling across Greater Cairo & Giza.
              </p>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div className="border-t border-surface-container pt-xl">
          <div className="flex items-center justify-between mb-md">
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary block">
                Provenance & Feedback
              </span>
              <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
                Architectural Reviews
              </h3>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 justify-end">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs text-secondary">Average 4.95 / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev: any) => (
                <div key={rev.id} className="p-md bg-surface-container-low rounded-xl border border-surface-container">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-title-md text-sm font-semibold text-on-surface">
                      {rev.customer_name}
                    </span>
                    <span className="font-label-sm text-[11px] text-secondary">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <h4 className="font-title-md text-sm font-medium text-on-surface mb-1">{rev.title}</h4>
                  <p className="text-xs text-secondary leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <div className="p-md bg-surface-container-low rounded-xl border border-surface-container col-span-2 text-center text-xs text-secondary py-8">
                Verified review documentation available upon commissioning request.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
