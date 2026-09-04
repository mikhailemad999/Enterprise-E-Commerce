'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Boxes,
  Archive,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  price: number;
  compare_at_price?: number | null;
  cost_price?: number | null;
  material?: string;
  dimensions?: string;
  weight_kg?: number;
  brand?: string;
  short_description?: string;
  description?: string;
  image: string;
  images?: string[];
  total_stock?: number;
  total_available?: number;
  is_active: boolean;
  is_featured: boolean;
}

const PRESET_IMAGES = [
  { label: 'Pendant / Lighting', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Cast Bronze Sconce', url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Alabaster Disc', url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Travertine Plinth', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Sculptural Furniture', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Flax Lounge Chair', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Raw Terracotta Vessel', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Calacatta Viola Table', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showArchived, setShowArchived] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Quick Price Edit Form State
  const [quickPrice, setQuickPrice] = useState<string>('');
  const [quickComparePrice, setQuickComparePrice] = useState<string>('');
  const [savingPrice, setSavingPrice] = useState(false);

  // Full Add/Edit Form State
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategoryId, setFormCategoryId] = useState<number>(1);
  const [formPrice, setFormPrice] = useState<string>('');
  const [formComparePrice, setFormComparePrice] = useState<string>('');
  const [formCostPrice, setFormCostPrice] = useState<string>('');
  const [formMaterial, setFormMaterial] = useState('');
  const [formDimensions, setFormDimensions] = useState('');
  const [formWeight, setFormWeight] = useState<string>('0');
  const [formBrand, setFormBrand] = useState('Lumio Ateliers');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [stockWh1, setStockWh1] = useState<number>(5);
  const [stockWh2, setStockWh2] = useState<number>(5);
  const [stockWh3, setStockWh3] = useState<number>(5);
  const [submittingForm, setSubmittingForm] = useState(false);

  const categories = [
    { id: 1, name: 'Lighting & Luminaires', slug: 'lighting' },
    { id: 2, name: 'Sculptural Furniture', slug: 'furniture' },
    { id: 3, name: 'Raw Ceramic Objects', slug: 'ceramics' },
    { id: 4, name: 'Architectural Surfaces', slug: 'surfaces' },
    { id: 5, name: 'Flax Linens & Textiles', slug: 'textiles' },
  ];

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?include_inactive=true');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      } else {
        showToast(data.error || 'Failed to fetch catalog.', 'error');
      }
    } catch (e: any) {
      showToast('Network error: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatEgp = (val: number) => {
    return `${new Intl.NumberFormat('en-US').format(val || 0)} EGP`;
  };

  // Open Quick Price Modal
  const openPriceModal = (p: Product) => {
    setActiveProduct(p);
    setQuickPrice(p.price.toString());
    setQuickComparePrice(p.compare_at_price ? p.compare_at_price.toString() : '');
    setIsPriceModalOpen(true);
  };

  // Submit Quick Price
  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct) return;
    const numPrice = Number(quickPrice);
    if (isNaN(numPrice) || numPrice <= 0) {
      alert('Please enter a valid price greater than 0.');
      return;
    }

    setSavingPrice(true);
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeProduct.id,
          price: numPrice,
          compare_at_price: quickComparePrice ? Number(quickComparePrice) : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Price updated for "${activeProduct.name}" to ${formatEgp(numPrice)}.`);
        setIsPriceModalOpen(false);
        fetchProducts();
      } else {
        showToast(data.error || 'Price update failed.', 'error');
      }
    } catch (err: any) {
      showToast('Error updating price: ' + err.message, 'error');
    } finally {
      setSavingPrice(false);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormName('');
    setFormSku(`LUM-${Math.floor(100 + Math.random() * 900)}-${Date.now().toString().slice(-3)}`);
    setFormCategoryId(1);
    setFormPrice('');
    setFormComparePrice('');
    setFormCostPrice('');
    setFormMaterial('');
    setFormDimensions('');
    setFormWeight('0');
    setFormBrand('Lumio Ateliers');
    setFormShortDesc('');
    setFormDesc('');
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormIsActive(true);
    setFormIsFeatured(false);
    setStockWh1(6);
    setStockWh2(4);
    setStockWh3(3);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setActiveProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormCategoryId(p.category_id || 1);
    setFormPrice(p.price.toString());
    setFormComparePrice(p.compare_at_price ? p.compare_at_price.toString() : '');
    setFormCostPrice(p.cost_price ? p.cost_price.toString() : '');
    setFormMaterial(p.material || '');
    setFormDimensions(p.dimensions || '');
    setFormWeight(p.weight_kg ? p.weight_kg.toString() : '0');
    setFormBrand(p.brand || 'Lumio Ateliers');
    setFormShortDesc(p.short_description || '');
    setFormDesc(p.description || '');
    setFormImageUrl(p.image || PRESET_IMAGES[0].url);
    setFormIsActive(p.is_active);
    setFormIsFeatured(p.is_featured);
    setIsEditModalOpen(true);
  };

  // Handle Add Product Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) {
      alert('Product Name and Price are mandatory.');
      return;
    }

    setSubmittingForm(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim(),
          sku: formSku.trim(),
          category_id: formCategoryId,
          price: Number(formPrice),
          compare_at_price: formComparePrice ? Number(formComparePrice) : null,
          cost_price: formCostPrice ? Number(formCostPrice) : null,
          material: formMaterial.trim(),
          dimensions: formDimensions.trim(),
          weight_kg: Number(formWeight) || 0,
          brand: formBrand.trim(),
          short_description: formShortDesc.trim(),
          description: formDesc.trim(),
          images: [formImageUrl],
          is_active: formIsActive,
          is_featured: formIsFeatured,
          initial_stocks: {
            1: stockWh1,
            2: stockWh2,
            3: stockWh3,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Piece "${formName}" created and assigned to regional fulfillment hubs.`);
        setIsAddModalOpen(false);
        fetchProducts();
      } else {
        showToast(data.error || 'Failed to create product.', 'error');
      }
    } catch (err: any) {
      showToast('Error creating product: ' + err.message, 'error');
    } finally {
      setSubmittingForm(false);
    }
  };

  // Handle Edit Product Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct) return;
    setSubmittingForm(true);
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeProduct.id,
          name: formName.trim(),
          sku: formSku.trim(),
          category_id: formCategoryId,
          price: Number(formPrice),
          compare_at_price: formComparePrice ? Number(formComparePrice) : null,
          cost_price: formCostPrice ? Number(formCostPrice) : null,
          material: formMaterial.trim(),
          dimensions: formDimensions.trim(),
          weight_kg: Number(formWeight) || 0,
          brand: formBrand.trim(),
          short_description: formShortDesc.trim(),
          description: formDesc.trim(),
          images: [formImageUrl],
          is_active: formIsActive,
          is_featured: formIsFeatured,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Piece "${formName}" specifications successfully updated.`);
        setIsEditModalOpen(false);
        fetchProducts();
      } else {
        showToast(data.error || 'Failed to update product.', 'error');
      }
    } catch (err: any) {
      showToast('Error updating product: ' + err.message, 'error');
    } finally {
      setSubmittingForm(false);
    }
  };

  // Toggle Active / Archive Status
  const handleToggleActive = async (p: Product) => {
    const nextStatus = !p.is_active;
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: p.id,
          is_active: nextStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(nextStatus ? `"${p.name}" is now live on storefront.` : `"${p.name}" archived from storefront.`);
        fetchProducts();
      } else {
        showToast(data.error || 'Failed to toggle status.', 'error');
      }
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Open Delete Modal
  const openDeleteModal = (p: Product) => {
    setActiveProduct(p);
    setIsDeleteModalOpen(true);
  };

  // Execute Delete / Remove
  const handleDeleteConfirm = async () => {
    if (!activeProduct) return;
    try {
      const res = await fetch(`/api/products?id=${activeProduct.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Product removed.');
        setIsDeleteModalOpen(false);
        fetchProducts();
      } else {
        showToast(data.error || 'Failed to remove product.', 'error');
      }
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.material || '').toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' ||
      p.category_slug === selectedCategory ||
      p.category_id === Number(selectedCategory);

    const matchesStatus = showArchived ? true : p.is_active;

    return matchesSearch && matchesCat && matchesStatus;
  });

  // Calculate Metrics
  const totalActive = products.filter((p) => p.is_active).length;
  const avgPrice = products.length > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length) : 0;
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price * (p.total_available || 0), 0);
  const lowStockCount = products.filter((p) => (p.total_available || 0) <= 10).length;

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-md py-3 rounded-xl shadow-xl flex items-center gap-2 border text-xs font-semibold uppercase tracking-wider transition-all animate-bounce ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
              : 'bg-rose-950 text-rose-200 border-rose-700'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-md gap-sm">
        <div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-0.5 font-mono">
            CATALOG ARCHITECTURE • OMS SUITE
          </span>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase font-bold tracking-tight">
            Product Catalog & Dynamic Pricing
          </h1>
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <button
            onClick={openAddModal}
            className="px-sm py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-inverse-surface transition-colors shadow-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Silhouette</span>
          </button>
          <button
            onClick={fetchProducts}
            className="p-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg text-on-surface transition-colors"
            title="Refresh Catalog"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Active Silhouettes */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">Catalog Footprint</span>
            <div className="font-headline-md text-2xl font-bold text-on-surface font-mono">
              {totalActive} <span className="text-xs text-secondary font-normal">/ {products.length} Silhouettes</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* Avg Retail Price */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">Average Price Point</span>
            <div className="font-headline-md text-2xl font-bold text-on-surface font-mono">
              {formatEgp(avgPrice)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Total Catalog Value */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">Allocated Asset Value</span>
            <div className="font-headline-md text-xl font-bold text-on-surface font-mono">
              {formatEgp(totalCatalogValue)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Inventory Warnings */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">Low Stock Watchlist</span>
            <div className="font-headline-md text-2xl font-bold text-amber-700 font-mono">
              {lowStockCount} <span className="text-xs text-secondary font-normal">Silhouettes ≤ 10 Units</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
            <Boxes className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-sm bg-surface-container-lowest p-3 rounded-xl border border-surface-container shadow-sm">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-outline shrink-0" />
          <input
            type="text"
            placeholder="Search piece name, SKU code, natural material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Category Dropdown Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-1.5 bg-surface-container-low border border-surface-container rounded-lg text-xs text-on-surface"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Archived Toggle */}
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors flex items-center gap-1 ${
              showArchived
                ? 'bg-surface-container text-on-surface border-surface-container-high'
                : 'bg-transparent text-secondary border-surface-container hover:text-on-surface'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>{showArchived ? 'Including Archived' : 'Active Only'}</span>
          </button>
        </div>
      </div>

      {/* Catalog & Pricing Master Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-surface-container font-label-md uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-sm">Piece / Silhouette</th>
                <th className="p-sm">SKU & Category</th>
                <th className="p-sm">Material & Dimensions</th>
                <th className="p-sm">Retail Price (EGP)</th>
                <th className="p-sm text-center">Fulfillment Stock</th>
                <th className="p-sm text-center">Store Status</th>
                <th className="p-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Querying real-time enterprise product database...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const hasDiscount = p.compare_at_price && p.compare_at_price > p.price;
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-surface-container-low/40 transition-colors ${
                        !p.is_active ? 'opacity-65 bg-surface-container-lowest/50' : ''
                      }`}
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="p-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg bg-surface-container shrink-0 border border-surface-container"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-on-surface text-sm block">{p.name}</span>
                              {p.is_featured && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] bg-primary/10 text-primary font-bold rounded">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Featured</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-secondary font-mono block">{p.brand}</span>
                          </div>
                        </div>
                      </td>

                      {/* SKU & Category */}
                      <td className="p-sm">
                        <span className="font-mono font-semibold text-on-surface block">{p.sku}</span>
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-surface-container text-secondary text-[10px] uppercase font-semibold">
                          {p.category_name || 'General Collection'}
                        </span>
                      </td>

                      {/* Material & Specs */}
                      <td className="p-sm text-secondary">
                        <span className="block text-on-surface font-medium">{p.material || 'Artisan Crafted'}</span>
                        <span className="text-[10px] text-secondary block font-mono">
                          {p.dimensions || 'Custom Specification'}
                        </span>
                      </td>

                      {/* Retail Price with Quick Edit Trigger */}
                      <td className="p-sm">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-headline-sm font-bold text-sm text-on-surface font-mono">
                              {formatEgp(p.price)}
                            </div>
                            {hasDiscount && (
                              <div className="text-[10px] text-outline line-through font-mono">
                                {formatEgp(p.compare_at_price!)}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => openPriceModal(p)}
                            title="Quick Change Price"
                            className="p-1.5 text-secondary hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Stock Allocation */}
                      <td className="p-sm text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full font-mono text-xs font-bold ${
                            Number(p.total_available) <= 10
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {p.total_available || 0} Units Available
                        </span>
                      </td>

                      {/* Store Status Toggle */}
                      <td className="p-sm text-center">
                        <button
                          onClick={() => handleToggleActive(p)}
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors inline-flex items-center gap-1 ${
                            p.is_active
                              ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-300'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${p.is_active ? 'bg-emerald-600' : 'bg-zinc-400'}`} />
                          <span>{p.is_active ? 'Active' : 'Archived'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openPriceModal(p)}
                            className="px-2 py-1 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded text-[11px] font-semibold text-on-surface"
                            title="Adjust Price"
                          >
                            Set Price
                          </button>

                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-secondary hover:text-on-surface hover:bg-surface-container rounded transition-colors"
                            title="Edit Full Specifications"
                          >
                            <SlidersHorizontal className="w-4 h-4" />
                          </button>

                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-secondary hover:text-primary hover:bg-surface-container rounded transition-colors"
                            title="View Customer PDP"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => openDeleteModal(p)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete or Archive Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">
                    No products match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK PRICE CHANGE MODAL */}
      {isPriceModalOpen && activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPriceModalOpen(false)} />
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-2xl p-md z-10 space-y-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="font-title-md text-base text-on-surface font-bold uppercase tracking-wider">
                  Update Pricing Strategy
                </h3>
              </div>
              <button onClick={() => setIsPriceModalOpen(false)} className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-xl border border-surface-container">
              <img src={activeProduct.image} alt="" className="w-12 h-14 object-cover rounded bg-surface shrink-0" />
              <div>
                <span className="font-semibold text-on-surface text-sm block">{activeProduct.name}</span>
                <span className="font-mono text-[11px] text-secondary">{activeProduct.sku}</span>
              </div>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-sm text-xs">
              <div>
                <label className="font-label-sm uppercase text-secondary block mb-1 font-semibold">
                  New Retail Price (EGP) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="1"
                    required
                    value={quickPrice}
                    onChange={(e) => setQuickPrice(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg text-base font-bold font-mono text-on-surface focus:outline-primary"
                    placeholder="e.g. 24000"
                  />
                  <span className="absolute right-3 top-3 text-secondary font-mono font-semibold">EGP</span>
                </div>
              </div>

              <div>
                <label className="font-label-sm uppercase text-secondary block mb-1">
                  Compare-At Price (Strike-through / Promo)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={quickComparePrice}
                    onChange={(e) => setQuickComparePrice(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-mono text-on-surface"
                    placeholder="Optional original price, e.g. 28000"
                  />
                  <span className="absolute right-3 top-2.5 text-secondary font-mono text-[10px]">EGP</span>
                </div>
                <span className="text-[10px] text-secondary mt-0.5 block">
                  Leave empty if no promotional discount applies.
                </span>
              </div>

              <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsPriceModalOpen(false)}
                  className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPrice}
                  className="px-md py-2 rounded bg-primary text-on-primary uppercase font-label-md text-xs font-bold hover:bg-inverse-surface transition-colors"
                >
                  {savingPrice ? 'Persisting Price...' : 'Commit Price Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl border border-surface-container shadow-2xl p-md z-10 max-h-[90vh] overflow-y-auto space-y-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-sm">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="font-title-md text-base text-on-surface font-bold uppercase tracking-wider">
                  Catalog New Silhouette
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-md text-xs">
              {/* Core Information */}
              <div className="space-y-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  1. Silhouette Identity
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Silhouette Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alabaster Orb Pendant"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Collection Category *</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(Number(e.target.value))}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">SKU Identification</label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Studio Brand</label>
                    <input
                      type="text"
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  2. Pricing Structure (EGP)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Retail Price (EGP) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      placeholder="e.g. 21500"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Compare-At Price (EGP)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="e.g. 24000"
                      value={formComparePrice}
                      onChange={(e) => setFormComparePrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Cost of Goods (EGP)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="e.g. 9500"
                      value={formCostPrice}
                      onChange={(e) => setFormCostPrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Materials and Specifications */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  3. Materiality & Dimensions
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Craft / Material</label>
                    <input
                      type="text"
                      placeholder="e.g. Roman Travertine & Bronze"
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder="e.g. H: 45cm x W: 40cm x D: 40cm"
                      value={formDimensions}
                      onChange={(e) => setFormDimensions(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Weight (KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Imagery & Presets */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  4. Visual Assets & Imagery
                </span>
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono text-[11px]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-secondary uppercase block mb-1">Or Select Luxury Preset Visual:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormImageUrl(preset.url)}
                        className={`p-1 rounded-lg border text-left flex items-center gap-1.5 transition-all ${
                          formImageUrl === preset.url
                            ? 'border-primary bg-primary/10'
                            : 'border-surface-container hover:bg-surface-container-low'
                        }`}
                      >
                        <img src={preset.url} alt="" className="w-7 h-7 object-cover rounded" />
                        <span className="text-[9px] text-on-surface line-clamp-1">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Initial Warehouse Allocation */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  5. Initial Warehouse Stock Allocation
                </span>
                <div className="grid grid-cols-3 gap-sm">
                  <div className="p-2 bg-surface-container-low rounded-lg border border-surface-container">
                    <span className="text-[10px] text-secondary uppercase font-semibold block mb-1">Cairo West Hub</span>
                    <input
                      type="number"
                      min="0"
                      value={stockWh1}
                      onChange={(e) => setStockWh1(Number(e.target.value))}
                      className="w-full p-1 bg-surface-container border border-surface-container rounded text-on-surface font-mono font-bold text-center"
                    />
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg border border-surface-container">
                    <span className="text-[10px] text-secondary uppercase font-semibold block mb-1">Cairo East Depot</span>
                    <input
                      type="number"
                      min="0"
                      value={stockWh2}
                      onChange={(e) => setStockWh2(Number(e.target.value))}
                      className="w-full p-1 bg-surface-container border border-surface-container rounded text-on-surface font-mono font-bold text-center"
                    />
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg border border-surface-container">
                    <span className="text-[10px] text-secondary uppercase font-semibold block mb-1">Alex Maritime</span>
                    <input
                      type="number"
                      min="0"
                      value={stockWh3}
                      onChange={(e) => setStockWh3(Number(e.target.value))}
                      className="w-full p-1 bg-surface-container border border-surface-container rounded text-on-surface font-mono font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  6. Editorial Narrative
                </span>
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Short Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Hand-lathed Upper Egypt translucent alabaster disc with spun bronze hardware."
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Comprehensive Architectural Narrative</label>
                  <textarea
                    rows={3}
                    placeholder="Detail the provenance, artisanal heritage, tactile materiality, and atmospheric lighting signature..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                  />
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-md border-t border-surface-container pt-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span className="font-semibold text-on-surface">Publish to Storefront Catalog immediately</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span className="font-semibold text-on-surface">Feature on Homepage Editorial</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingForm}
                  className="px-md py-2 rounded bg-primary text-on-primary uppercase font-label-md text-xs font-bold hover:bg-inverse-surface transition-colors"
                >
                  {submittingForm ? 'Creating Piece...' : 'Deploy Piece to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL EDIT PRODUCT MODAL */}
      {isEditModalOpen && activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl border border-surface-container shadow-2xl p-md z-10 max-h-[90vh] overflow-y-auto space-y-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-sm">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="font-title-md text-base text-on-surface font-bold uppercase tracking-wider">
                  Edit Silhouette Specifications
                </h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-md text-xs">
              <div className="space-y-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Piece Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Category</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(Number(e.target.value))}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">SKU</label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Brand</label>
                    <input
                      type="text"
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <span className="font-label-sm uppercase font-bold text-primary block tracking-wider">
                  Pricing Configuration (EGP)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Retail Price (EGP) *</label>
                    <input
                      type="number"
                      required
                      step="any"
                      min="1"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono font-bold text-base"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Compare-At Price (EGP)</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formComparePrice}
                      onChange={(e) => setFormComparePrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Cost of Goods (EGP)</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formCostPrice}
                      onChange={(e) => setFormCostPrice(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Material & Dimensions */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Material</label>
                    <input
                      type="text"
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={formDimensions}
                      onChange={(e) => setFormDimensions(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm uppercase text-secondary block mb-1">Weight (KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Imagery */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-sm border-t border-surface-container pt-sm">
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Short Description</label>
                  <input
                    type="text"
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-sm uppercase text-secondary block mb-1">Narrative Description</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg text-on-surface"
                  />
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-md border-t border-surface-container pt-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span className="font-semibold text-on-surface">Active on Storefront</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span className="font-semibold text-on-surface">Featured on Homepage</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingForm}
                  className="px-md py-2 rounded bg-primary text-on-primary uppercase font-label-md text-xs font-bold hover:bg-inverse-surface transition-colors"
                >
                  {submittingForm ? 'Saving Updates...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE / ARCHIVE CONFIRMATION MODAL */}
      {isDeleteModalOpen && activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl border border-rose-200 shadow-2xl p-md z-10 space-y-md">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-title-md text-base font-bold uppercase tracking-wider text-on-surface">
                  Remove Piece from Catalog
                </h3>
                <span className="text-[11px] text-secondary">Confirm catalog removal directives</span>
              </div>
            </div>

            <div className="p-sm bg-surface-container-low rounded-xl border border-surface-container text-xs space-y-1">
              <div className="font-semibold text-on-surface">{activeProduct.name}</div>
              <div className="font-mono text-secondary text-[11px]">SKU: {activeProduct.sku}</div>
              <div className="font-mono text-on-surface font-bold">{formatEgp(activeProduct.price)}</div>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Are you sure you want to remove this silhouette? If client orders reference this piece, the system will automatically <strong>archive and deactivate</strong> it to maintain e-invoicing integrity. If no orders reference it, it will be <strong>permanently deleted</strong>.
            </p>

            <div className="flex items-center justify-end gap-xs pt-sm border-t border-surface-container">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-sm py-2 rounded bg-surface-container text-on-surface uppercase font-label-md text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-md py-2 rounded bg-rose-600 hover:bg-rose-700 text-white uppercase font-label-md text-xs font-bold transition-colors"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
