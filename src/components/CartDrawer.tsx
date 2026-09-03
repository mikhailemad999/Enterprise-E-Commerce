'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCommerce } from '@/context/CommerceContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal, formatPrice } = useCommerce();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-sm md:p-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
              <h2 className="font-title-md text-title-md uppercase tracking-wider text-on-surface font-medium">
                Client Folio ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-xs rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Regional white-glove notification */}
          <div className="px-sm py-xs bg-secondary-container text-on-secondary-fixed-variant text-xs flex items-center gap-xs">
            <Truck className="w-4 h-4 shrink-0 text-primary" />
            <span>Eligible for White-Glove Same-Day Delivery in Cairo & Giza</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-sm md:p-md space-y-sm">
            {cart.length === 0 ? (
              <div className="py-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-outline text-[48px] mb-sm">chair</span>
                <p className="font-headline-sm text-headline-sm text-on-surface mb-xs">Your Folio is Empty</p>
                <p className="font-body-sm text-body-sm text-secondary max-w-xs mb-md">
                  Explore our curated architectural silhouettes cast in raw natural stone, bronze, and flax.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-md py-sm bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-sm p-sm bg-surface-container-low rounded-lg border border-surface-container hover:border-outline-variant transition-colors"
                >
                  <div className="relative w-20 h-24 rounded bg-surface-container overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale contrast-105"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-xs">
                      <div>
                        <h4 className="font-body-md text-body-md font-medium text-on-surface leading-tight">
                          {item.name}
                        </h4>
                        <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mt-0.5">
                          {item.sku} • {item.material || 'Natural Element'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-outline hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-sm">
                      <div className="flex items-center border border-surface-container-high rounded bg-surface-container-lowest">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-surface-container transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 text-on-surface" />
                        </button>
                        <span className="font-label-md text-label-md px-2 text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-surface-container transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 text-on-surface" />
                        </button>
                      </div>

                      <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-sm md:p-md bg-surface-container-low border-t border-surface-container space-y-sm">
              <div className="flex justify-between items-center text-body-sm text-secondary">
                <span>Regional White-Glove Freight</span>
                <span className="uppercase text-primary font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                  Estimated Total
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="pt-xs">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-sm bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded flex items-center justify-center gap-xs hover:bg-inverse-surface transition-all shadow-md group"
                >
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-xs text-[11px] text-secondary text-center pt-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Encrypted PCI DSS & Paymob 3D Secure Invoicing</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
