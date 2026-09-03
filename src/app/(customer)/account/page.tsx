'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCommerce } from '@/context/CommerceContext';
import { User, Package, RotateCcw, MapPin, Award, Copy, Check, ArrowRight, Plus, Trash2, Heart, Edit2, CheckCircle2, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function AccountPage() {
  const { formatPrice, savedAddresses, saveAddress, deleteAddress, setDefaultAddress, wishlist, addToCart } = useCommerce();
  const [activeTab, setActiveTab] = useState<'orders' | 'returns' | 'addresses' | 'wishlist' | 'loyalty'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit State
  const [profile, setProfile] = useState({
    name: 'Farida Mansour',
    email: 'farida.mansour@atelier.com',
    phone: '+20 102 334 8812',
    company: 'Principal, Mansour Architectural Practice',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    title: '',
    fullName: '',
    phone: '',
    street: '',
    building: '',
    apartment: '',
    district: 'Zamalek',
    city: 'Cairo',
    governorate: 'Cairo',
    notes: '',
    isDefault: false,
  });

  // Return request form state
  const [selectedOrderForRma, setSelectedOrderForRma] = useState<number | null>(null);
  const [returnReason, setReturnReason] = useState('Color tone mismatch under natural ambient lighting');
  const [refundMethod, setRefundMethod] = useState<'original_payment' | 'store_credit'>('store_credit');
  const [rmaSubmitted, setRmaSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, prodRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products'),
        ]);
        const ordersData = await ordersRes.json();
        const prodData = await prodRes.json();
        if (ordersData.success) {
          setOrders(ordersData.orders || []);
          if (ordersData.orders?.length > 0) {
            setSelectedOrderForRma(ordersData.orders[0].id);
          }
        }
        if (prodData.success) {
          setProducts(prodData.products || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Load saved customer profile if exists
    try {
      const stored = localStorage.getItem('lumio_customer_profile');
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('lumio_customer_profile', JSON.stringify(profile));
      setProfileSavedNotice(true);
      setIsEditingProfile(false);
      setTimeout(() => setProfileSavedNotice(false), 2500);
    } catch (e) {}
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr = {
      id: 'addr-' + Date.now(),
      title: addressForm.title || `${addressForm.district} Residence`,
      fullName: addressForm.fullName || profile.name,
      phone: addressForm.phone || profile.phone,
      street: addressForm.street,
      building: addressForm.building,
      apartment: addressForm.apartment,
      district: addressForm.district,
      city: addressForm.city,
      governorate: addressForm.governorate,
      notes: addressForm.notes,
      isDefault: addressForm.isDefault || savedAddresses.length === 0,
    };
    saveAddress(newAddr);
    setIsAddressModalOpen(false);
    setAddressForm({
      title: '',
      fullName: '',
      phone: '',
      street: '',
      building: '',
      apartment: '',
      district: 'Zamalek',
      city: 'Cairo',
      governorate: 'Cairo',
      notes: '',
      isDefault: false,
    });
  };

  const handleRmaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForRma) return;

    try {
      const order = orders.find((o) => o.id === selectedOrderForRma);
      const res = await fetch('/api/rma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: selectedOrderForRma,
          customer_name: profile.name,
          customer_email: profile.email,
          reason: returnReason,
          items: order?.items || [],
          refund_amount: order?.total_amount || 18500,
          refund_method: refundMethod,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRmaSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText('https://lumio.com/vip?ref=LUMIO-FARIDA-88');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-surface min-h-screen px-4 sm:px-margin py-md md:py-xl">
      <div className="max-w-7xl mx-auto space-y-lg">
        {/* Profile Saved Alert */}
        {profileSavedNotice && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Private Client Profile updated successfully.</span>
          </div>
        )}

        {/* Profile Banner */}
        <div className="p-md md:p-lg bg-surface-container-lowest rounded-2xl border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-md shadow-sm">
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl uppercase shadow-sm shrink-0">
              {profile.name.split(' ').map((n) => n[0]).join('') || 'FM'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold uppercase tracking-tight">
                  {profile.name}
                </h1>
                <span className="font-label-sm text-[11px] bg-secondary-container px-2 py-0.5 rounded text-on-surface uppercase font-semibold">
                  Private Client
                </span>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="p-1 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                  title="Edit Profile"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-secondary mt-0.5">
                {profile.email} • {profile.phone}
              </p>
              <p className="text-[11px] text-secondary font-mono">
                {profile.company}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-md border-t md:border-t-0 md:border-l border-surface-container pt-sm md:pt-0 md:pl-md">
            <div>
              <span className="text-[10px] text-secondary uppercase tracking-wider block font-semibold">
                Loyalty Portfolio
              </span>
              <span className="font-headline-sm text-2xl font-bold text-on-surface">4,850</span>
              <span className="text-[11px] text-secondary block">Points Available</span>
            </div>
            <div className="pl-md border-l border-surface-container">
              <span className="text-[10px] text-secondary uppercase tracking-wider block font-semibold">
                White-Glove Status
              </span>
              <span className="font-title-md text-sm font-semibold text-emerald-700 block">
                VIP Priority Fleet
              </span>
              <span className="text-[11px] text-secondary block">Cairo • Giza</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="p-md bg-surface-container-lowest rounded-2xl border border-primary/40 shadow-md space-y-md text-xs animate-in fade-in">
            <div className="flex justify-between items-center border-b border-surface-container pb-2">
              <h3 className="font-headline-sm text-sm font-bold uppercase text-on-surface">Edit Client Information</h3>
              <button type="button" onClick={() => setIsEditingProfile(false)} className="text-secondary hover:text-on-surface">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Phone (WhatsApp for Dispatch)</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Studio / Practice Affiliation</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-sm py-2 bg-surface-container-low rounded-lg text-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-md py-2 bg-primary text-on-primary font-bold uppercase rounded-lg shadow-sm"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}

        {/* Tab Buttons */}
        <div className="flex border-b border-surface-container mb-lg overflow-x-auto">
          {[
            { id: 'orders', label: 'Commissions & Orders', icon: Package },
            { id: 'addresses', label: 'Residence Addresses', icon: MapPin },
            { id: 'wishlist', label: `Saved for Later (${wishlist.length})`, icon: Heart },
            { id: 'returns', label: 'Returns & RMA', icon: RotateCcw },
            { id: 'loyalty', label: 'Client Tier & Privileges', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-md py-sm font-label-md text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                  active
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-md">
            {loading ? (
              <div className="py-12 text-center text-secondary">Loading commissions...</div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-sm gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-on-surface">
                        Commission #{order.order_number}
                      </span>
                      <span className="text-secondary text-xs block">
                        Placed on {new Date(order.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-sm">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-secondary-container text-on-surface">
                        {order.status}
                      </span>
                      <span className="font-headline-sm text-sm font-bold text-on-surface">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-sm text-xs">
                    <span className="text-secondary">
                      White-glove priority handover via fleet courier
                    </span>
                    <Link
                      href={`/tracking/${order.order_number}`}
                      className="text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Track Courier Live</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-xl text-center text-secondary">No orders recorded yet.</div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">
                  Saved Residence Addresses
                </h3>
                <p className="text-xs text-secondary">
                  These locations are available for immediate one-click white-glove delivery at checkout.
                </p>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Residence</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-md bg-surface-container-lowest rounded-2xl border ${
                    addr.isDefault ? 'border-2 border-primary' : 'border-surface-container'
                  } shadow-sm space-y-2 text-xs relative flex flex-col justify-between`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-title-md text-sm font-bold text-on-surface">{addr.title}</span>
                      {addr.isDefault ? (
                        <span className="font-label-sm text-[10px] bg-primary text-on-primary px-2 py-0.5 rounded font-bold uppercase">
                          Default Shipping
                        </span>
                      ) : (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[10px] text-primary uppercase font-bold hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                    <p className="text-on-surface font-semibold">{addr.fullName}</p>
                    <p className="text-secondary">{addr.street}, {addr.building}, {addr.apartment}</p>
                    <p className="text-secondary">{addr.district}, {addr.city}, {addr.governorate}</p>
                    <p className="text-secondary font-mono">{addr.phone}</p>
                    {addr.notes && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded mt-1">
                        Note: {addr.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-surface-container flex justify-end">
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-secondary hover:text-red-600 p-1 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Wishlist (Save for Later) */}
        {activeTab === 'wishlist' && (
          <div className="space-y-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">
                  Saved for Later ({savedProducts.length})
                </h3>
                <p className="text-xs text-secondary">
                  Architectural silhouettes reserved in your private dossier.
                </p>
              </div>
              <Link
                href="/wishlist"
                className="text-xs text-primary font-bold uppercase hover:underline flex items-center gap-1"
              >
                <span>Open Full Wishlist Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {savedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-sm bg-surface-container-lowest rounded-xl border border-surface-container flex flex-col justify-between space-y-sm"
                  >
                    <div className="flex gap-3">
                      <img
                        src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80')}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-surface-container shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary">{product.category}</span>
                        <h4 className="text-xs font-bold text-on-surface line-clamp-1">{product.name}</h4>
                        <span className="text-xs font-bold font-headline-sm text-primary block mt-1">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 hover:bg-inverse-surface transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-xl bg-surface-container-lowest rounded-2xl border border-surface-container text-center text-xs text-secondary">
                No items saved yet. Explore the collection to add silhouettes to your wishlist.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Returns / RMA */}
        {activeTab === 'returns' && (
          <div className="max-w-2xl bg-surface-container-lowest p-md md:p-lg rounded-xl border border-surface-container shadow-sm">
            <h3 className="font-title-md text-lg font-bold text-on-surface uppercase tracking-wider mb-1">
              Initiate Self-Service Return / Exchange (RMA)
            </h3>
            <p className="text-xs text-secondary mb-md">
              White-glove collection arranged directly from your residence. Restocking fee waived for Private Client tier.
            </p>

            {rmaSubmitted ? (
              <div className="p-md bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-center">
                <Check className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                <h4 className="font-title-md text-base font-bold mb-1">Return Request Registered</h4>
                <p className="text-xs">
                  A return courier has been scheduled to inspect and collect the piece from your Zamalek residence within 48 hours.
                </p>
                <button
                  onClick={() => setRmaSubmitted(false)}
                  className="mt-sm px-sm py-1 bg-emerald-700 text-white rounded text-xs uppercase tracking-wider"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleRmaSubmit} className="space-y-sm">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Select Commissioned Order
                  </label>
                  <select
                    value={selectedOrderForRma || ''}
                    onChange={(e) => setSelectedOrderForRma(Number(e.target.value))}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        Order #{o.order_number} ({formatPrice(o.total_amount)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Return / Exchange Justification
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block mb-1">
                    Refund Modality
                  </label>
                  <div className="grid grid-cols-2 gap-sm">
                    <button
                      type="button"
                      onClick={() => setRefundMethod('store_credit')}
                      className={`p-sm rounded border text-left text-xs uppercase tracking-wider font-label-md ${
                        refundMethod === 'store_credit' ? 'border-primary bg-surface-container-low font-bold' : 'border-surface-container text-secondary'
                      }`}
                    >
                      Store Atelier Credit (+5% VIP Bonus)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRefundMethod('original_payment')}
                      className={`p-sm rounded border text-left text-xs uppercase tracking-wider font-label-md ${
                        refundMethod === 'original_payment' ? 'border-primary bg-surface-container-low font-bold' : 'border-surface-container text-secondary'
                      }`}
                    >
                      Original Payment Refund
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded hover:bg-inverse-surface transition-colors mt-2"
                >
                  Generate Return Dispatch Label
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 5: Loyalty & Referral */}
        {activeTab === 'loyalty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm">
              <h3 className="font-title-md text-base font-semibold text-on-surface uppercase tracking-wider">
                Private Client Privileges
              </h3>
              <ul className="space-y-2 text-xs text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Complimentary White-Glove installation across Egypt</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Early 48-hour access to biannual catalog editions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Dedicated Atelier Design Director (Leila Mansour)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Complimentary return logistics with no restocking fees</span>
                </li>
              </ul>
            </div>

            <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm space-y-sm">
              <h3 className="font-title-md text-base font-semibold text-on-surface uppercase tracking-wider">
                Private Referral Code
              </h3>
              <p className="text-xs text-secondary">
                Invite fellow architects and interior designers. They receive 10% courtesy on their initial commission, and you earn 2,000 portfolio points.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="LUMIO-FARIDA-88"
                  className="flex-1 p-2 bg-surface-container-low border border-surface-container rounded text-xs font-mono font-bold text-on-surface"
                />
                <button
                  onClick={copyReferral}
                  className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Residence Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container max-w-lg w-full p-md md:p-lg space-y-md shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-center border-b border-surface-container pb-2">
              <h3 className="font-headline-sm text-base font-bold uppercase text-on-surface">
                Add Residence Shipping Address
              </h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-secondary hover:text-on-surface">✕</button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-sm text-xs">
              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Address Label</label>
                <input
                  type="text"
                  placeholder="e.g. Palm Hills Villa, Katameya Residence"
                  value={addressForm.title}
                  onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">Recipient Name</label>
                  <input
                    type="text"
                    defaultValue={profile.name}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">Phone (WhatsApp)</label>
                  <input
                    type="text"
                    defaultValue={profile.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 14 Hassan Sabry Street"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">Building / Villa</label>
                  <input
                    type="text"
                    placeholder="e.g. Villa 12, Building 8"
                    value={addressForm.building}
                    onChange={(e) => setAddressForm({ ...addressForm, building: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">Apartment / Floor</label>
                  <input
                    type="text"
                    placeholder="e.g. Penthouse B, Floor 4"
                    value={addressForm.apartment}
                    onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">District / Area</label>
                  <select
                    value={addressForm.district}
                    onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  >
                    <option value="Zamalek">Zamalek</option>
                    <option value="New Cairo (Tagamoa)">New Cairo (Tagamoa)</option>
                    <option value="Sheikh Zayed">Sheikh Zayed</option>
                    <option value="6th of October">6th of October</option>
                    <option value="Maadi">Maadi</option>
                    <option value="Katameya Heights">Katameya Heights</option>
                    <option value="Heliopolis">Heliopolis</option>
                    <option value="Garden City">Garden City</option>
                    <option value="Alexandria">Alexandria</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-secondary uppercase font-semibold">Governorate</label>
                  <select
                    value={addressForm.governorate}
                    onChange={(e) => setAddressForm({ ...addressForm, governorate: e.target.value })}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-secondary uppercase font-semibold">White-Glove Delivery Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Security gate access code, service elevator required"
                  value={addressForm.notes}
                  onChange={(e) => setAddressForm({ ...addressForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="defaultAddressCheck"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded text-primary"
                />
                <label htmlFor="defaultAddressCheck" className="text-secondary select-none">
                  Set as my primary shipping residence for future commissions
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-sm py-2 bg-surface-container-low rounded-lg text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-md py-2 bg-primary text-on-primary font-bold uppercase rounded-lg shadow-sm"
                >
                  Save Residence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
