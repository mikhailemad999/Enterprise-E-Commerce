'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  material?: string;
  category?: string;
}

export interface CustomerAddress {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  street: string;
  building: string;
  apartment: string;
  district: string;
  city: string;
  governorate: string;
  notes?: string;
  isDefault: boolean;
}

interface CommerceContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  language: 'EN' | 'AR';
  setLanguage: (lang: 'EN' | 'AR') => void;
  formatPrice: (amount: number) => string;
  savedAddresses: CustomerAddress[];
  saveAddress: (addr: CustomerAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  primaryAddress: CustomerAddress | null;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const DEFAULT_ADDRESSES: CustomerAddress[] = [
  {
    id: 'addr-1',
    title: 'Primary Residence (Zamalek)',
    fullName: 'Farida Mansour',
    phone: '+20 102 334 8812',
    street: '14 Hassan Sabry Street',
    building: 'Building 14',
    apartment: 'Floor 6, Penthouse B',
    district: 'Zamalek',
    city: 'Cairo',
    governorate: 'Cairo',
    notes: 'White-glove delivery, please call concierge upon arrival',
    isDefault: true,
  },
  {
    id: 'addr-2',
    title: 'Design Studio (New Cairo)',
    fullName: 'Farida Mansour (Studio)',
    phone: '+20 102 334 8812',
    street: 'Plot 44, North Choueifat',
    building: 'Villa 8',
    apartment: 'Ground Floor Studio',
    district: 'New Cairo',
    city: 'Cairo',
    governorate: 'Cairo',
    notes: 'Freight crate delivery to gallery entrance',
    isDefault: false,
  },
];

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 2, 4]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>(DEFAULT_ADDRESSES);

  // Load cart, wishlist, addresses from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumio_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([
          {
            id: 1,
            productId: 1,
            name: 'Torso Ceramic Luminaire',
            sku: 'LUM-LGT-001',
            price: 18500,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
            material: 'Fayoum Terracotta',
            category: 'Lighting',
          },
          {
            id: 2,
            productId: 2,
            name: 'Monolithic Travertine Plinth',
            sku: 'LUM-FUR-002',
            price: 32000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            material: 'Roman Travertine',
            category: 'Tables',
          },
        ]);
      }

      const savedWishlist = localStorage.getItem('lumio_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const storedAddrs = localStorage.getItem('lumio_customer_addresses');
      if (storedAddrs) {
        setSavedAddresses(JSON.parse(storedAddrs));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('lumio_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem('lumio_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save addresses changes
  useEffect(() => {
    try {
      localStorage.setItem('lumio_customer_addresses', JSON.stringify(savedAddresses));
    } catch (e) {
      console.error(e);
    }
  }, [savedAddresses]);

  // RTL direction toggle on language change
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
  }, [language]);

  const addToCart = (product: any, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: Number(product.price),
          quantity,
          image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'),
          material: product.material,
          category: product.category,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  const saveAddress = (addr: CustomerAddress) => {
    setSavedAddresses((prev) => {
      const existing = prev.find((a) => a.id === addr.id);
      let updated;
      if (existing) {
        updated = prev.map((a) => (a.id === addr.id ? addr : a));
      } else {
        updated = [...prev, addr];
      }
      if (addr.isDefault) {
        updated = updated.map((a) => (a.id === addr.id ? a : { ...a, isDefault: false }));
      }
      return updated;
    });
  };

  const deleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setSavedAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const primaryAddress = savedAddresses.find((a) => a.isDefault) || savedAddresses[0] || null;

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US').format(amount);
    return `${formatted} EGP`;
  };

  return (
    <CommerceContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        language,
        setLanguage,
        formatPrice,
        savedAddresses,
        saveAddress,
        deleteAddress,
        setDefaultAddress,
        primaryAddress,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within CommerceProvider');
  }
  return context;
}
