'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCommerce } from '@/context/CommerceContext';
import confetti from 'canvas-confetti';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Check, Tag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, formatPrice, savedAddresses, primaryAddress } = useCommerce();

  // Form states initialized with customer default address
  const [formData, setFormData] = useState({
    fullName: primaryAddress?.fullName || 'Farida Mansour',
    email: 'farida.mansour@atelier.com',
    phone: primaryAddress?.phone || '+20 102 334 8812',
    street: primaryAddress?.street || '14 Hassan Sabry Street',
    apartment: primaryAddress?.apartment || 'Floor 6, Penthouse B',
    district: primaryAddress?.district || 'Zamalek',
    city: primaryAddress?.city || 'Cairo',
    governorate: primaryAddress?.governorate || 'Cairo',
    deliveryNotes: primaryAddress?.notes || 'Please ring the private service entrance bell on arrival.',
  });

  const selectSavedAddress = (addr: any) => {
    setFormData({
      ...formData,
      fullName: addr.fullName || formData.fullName,
      phone: addr.phone || formData.phone,
      street: addr.street,
      apartment: addr.apartment,
      district: addr.district,
      city: addr.city,
      governorate: addr.governorate,
      deliveryNotes: addr.notes || formData.deliveryNotes,
    });
  };

  const [paymentMethod, setPaymentMethod] = useState<'card_paymob' | 'card_stripe' | 'cash_on_delivery'>('cash_on_delivery');
  const [promoCode, setPromoCode] = useState('LUMIOVIP');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [promoApplied, setPromoApplied] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const discountAmount = promoApplied ? (cartTotal * discountPercent) / 100 : 0;
  const finalTotal = cartTotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUMIOVIP') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'WELCOME1000') {
      setDiscountPercent(5);
      setPromoApplied(true);
    } else {
      alert('Invalid or expired voucher code');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: 1,
          guest_name: formData.fullName,
          guest_email: formData.email,
          guest_phone: formData.phone,
          shipping_address: {
            full_name: formData.fullName,
            phone: formData.phone,
            street: formData.street,
            apartment: formData.apartment,
            city: formData.district || formData.city,
            governorate: formData.governorate,
            country: 'Egypt',
          },
          payment_method: paymentMethod,
          items: cart,
          subtotal: finalTotal,
          notes: formData.deliveryNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000000', '#615e58', '#c4c7c7'],
        });

        clearCart();
        setTimeout(() => {
          router.push(`/tracking/${data.order.order_number}`);
        }, 1200);
      } else {
        alert('Order placement failed: ' + data.error);
        setSubmitting(false);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error placing order: ' + err.message);
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && !submitting) {
    return (
      <div className="py-32 text-center min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="font-headline-sm text-2xl text-on-surface mb-2">Your Folio is Empty</h2>
        <p className="text-secondary mb-md">Add pieces from the collection before initiating private checkout.</p>
        <Link href="/collection" className="px-md py-sm bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-lg border-b border-surface-container pb-md">
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-xs">
            Private Transaction
          </span>
          <h1 className="font-headline-lg text-3xl md:text-5xl uppercase font-bold tracking-tight text-on-surface">
            Secure Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-lg">
            {/* 1. Client Contact */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">1</span>
                <span>Client Identification</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Full Name / Entity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    E-Invoice Delivery Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address (Egyptian Governorates) */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">2</span>
                  <span>White-Glove Destination</span>
                </div>
                {savedAddresses && savedAddresses.length > 0 && (
                  <span className="text-[11px] text-secondary font-mono">
                    {savedAddresses.length} Saved Residences
                  </span>
                )}
              </h3>

              {savedAddresses && savedAddresses.length > 0 && (
                <div className="mb-sm p-2 bg-surface-container-low rounded-xl border border-surface-container space-y-1.5">
                  <span className="text-[10px] text-secondary uppercase tracking-wider font-bold block">
                    Choose from Saved Client Residences:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => selectSavedAddress(addr)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          formData.street === addr.street
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {addr.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-sm">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Street & Residence / Villa Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                      Apartment / Penthouse / Suite
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                      District / Zone
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Zamalek, New Cairo, Palm Hills"
                      className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                      Governorate
                    </label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                    >
                      <option value="Cairo">Cairo (Same-Day Priority)</option>
                      <option value="Giza">Giza & 6th of October (Same-Day)</option>
                      <option value="Alexandria">Alexandria (Express Courier)</option>
                      <option value="North Coast">North Coast (Seasonal Fleet)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                      Special Handling Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryNotes}
                      onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                      className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
              <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider mb-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">3</span>
                <span>Payment Modality</span>
              </h3>

              <div className="space-y-sm">
                {/* Cash on Delivery (Egypt Regional Priority) */}
                <label
                  className={`flex items-start gap-sm p-sm rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-primary bg-surface-container-low'
                      : 'border-surface-container hover:bg-surface-container-low/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-sm font-semibold text-on-surface flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-primary" />
                        <span>Cash Upon White-Glove Handover (COD)</span>
                      </span>
                      <span className="font-label-sm text-[10px] bg-secondary-container px-2 py-0.5 rounded text-on-surface uppercase">
                        Most Popular in Egypt
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-1">
                      Inspect your bespoke pieces in residence prior to settlement. Exact cash collection verified by assigned courier via OTP.
                    </p>
                  </div>
                </label>

                {/* Paymob Card (Egypt/MENA 3D Secure) */}
                <label
                  className={`flex items-start gap-sm p-sm rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card_paymob'
                      ? 'border-primary bg-surface-container-low'
                      : 'border-surface-container hover:bg-surface-container-low/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card_paymob"
                    checked={paymentMethod === 'card_paymob'}
                    onChange={() => setPaymentMethod('card_paymob')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-sm font-semibold text-on-surface flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span>Paymob Payment Gateway (Egyptian Cards & Wallets)</span>
                      </span>
                      <span className="font-label-sm text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">
                        Meeza • Visa • MC
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-1">
                      Direct integration with Egyptian banking networks with 3D Secure authentication.
                    </p>
                  </div>
                </label>

                {/* Stripe Global Card */}
                <label
                  className={`flex items-start gap-sm p-sm rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card_stripe'
                      ? 'border-primary bg-surface-container-low'
                      : 'border-surface-container hover:bg-surface-container-low/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card_stripe"
                    checked={paymentMethod === 'card_stripe'}
                    onChange={() => setPaymentMethod('card_stripe')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-sm font-semibold text-on-surface flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span>International Platinum Card (Stripe)</span>
                      </span>
                      <span className="font-label-sm text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded uppercase">
                        Amex • Global
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-1">
                      Seamless international payment processing with multi-currency conversion.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-md rounded-xl border border-surface-container shadow-sm space-y-md sticky top-28">
            <h3 className="font-title-md text-base text-on-surface font-semibold uppercase tracking-wider">
              Commission Summary ({cart.length})
            </h3>

            {/* Cart Items List */}
            <div className="space-y-sm max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-sm py-2 border-b border-surface-container">
                  <div className="w-14 h-16 rounded bg-surface-container overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale contrast-105" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-body-md text-xs font-semibold text-on-surface line-clamp-1">{item.name}</h5>
                    <span className="text-[11px] text-secondary">Qty: {item.quantity} • {item.material || 'Natural Stone'}</span>
                  </div>
                  <span className="font-label-md text-xs font-semibold text-on-surface">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Atelier Voucher (Try: LUMIOVIP)"
                  className="flex-1 p-2 bg-surface-container-low border border-surface-container rounded text-xs text-on-surface uppercase tracking-wider focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-sm py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>VIP Atelier Privilege Applied: {discountPercent}% Exclusive Courtesy</span>
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-surface-container pt-sm text-xs">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>VIP Courtesy Reduction</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-secondary">
                <span>White-Glove Placement Fleet</span>
                <span className="text-primary font-medium uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Value-Added Tax (14% Included)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-base font-bold text-on-surface border-t border-surface-container pt-2">
                <span className="uppercase tracking-wider">Total Commission</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-inverse-surface transition-all shadow-md disabled:opacity-50"
            >
              {submitting ? (
                <span>Registering Commission & Routing...</span>
              ) : (
                <>
                  <span>Confirm Commission</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-secondary text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Certified Egyptian E-Invoicing & PCI-DSS Encrypted Handover</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
