'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Store,
  Layers,
  Boxes,
  Truck,
  DollarSign,
  Headphones,
  Megaphone,
  UserCheck,
  ExternalLink,
  KeyRound,
  FileText,
} from 'lucide-react';

export default function DepartmentsPortalPage() {
  const departments = [
    {
      id: 'D001',
      name: 'SUPER_ADMIN',
      title: 'Super Admin Control Center',
      desc: 'Platform governance, all tenant workspaces, system health, global user directory, audit logs.',
      loginRoute: '/super-admin/login',
      dashboardRoute: '/super-admin/dashboard',
      subpages: [
        { label: 'Tenants', path: '/super-admin/tenants' },
        { label: 'Global Users', path: '/super-admin/users' },
        { label: 'Audit Logs', path: '/super-admin/audit-logs' },
      ],
      user: 'superadmin',
      pin: '123456',
      icon: ShieldCheck,
      badge: 'Platform Level',
    },
    {
      id: 'D002',
      name: 'STORE_ADMIN',
      title: 'Store Admin Console',
      desc: 'Store settings, business profiling, localized currency & language, staff management, department assignments.',
      loginRoute: '/store-admin/login',
      dashboardRoute: '/store-admin/dashboard',
      subpages: [
        { label: 'Store Settings', path: '/store-admin/settings' },
        { label: 'Staff Management', path: '/store-admin/staff' },
      ],
      user: 'storeadmin',
      pin: '234567',
      icon: Store,
      badge: 'Tenant Admin',
    },
    {
      id: 'D003',
      name: 'PRODUCT_MANAGER',
      title: 'Product & Catalog Studio',
      desc: 'Architectural silhouettes, variants, SKU barcodes, category hierarchies, and brand curation.',
      loginRoute: '/product/login',
      dashboardRoute: '/product/dashboard',
      subpages: [
        { label: 'Products', path: '/product/products' },
        { label: 'Categories', path: '/product/categories' },
        { label: 'Brands', path: '/product/brands' },
      ],
      user: 'productmgr',
      pin: '345678',
      icon: Layers,
      badge: 'Merchandising',
    },
    {
      id: 'D004',
      name: 'INVENTORY_MANAGER',
      title: 'Inventory Management WMS',
      desc: 'Multi-warehouse stock allocations, safety stock, reservations, and inter-hub transfer approvals.',
      loginRoute: '/inventory/login',
      dashboardRoute: '/inventory/dashboard',
      subpages: [
        { label: 'Stock Matrix', path: '/inventory/products' },
        { label: 'Stock Transfers', path: '/inventory/transfers' },
      ],
      user: 'inventorymgr',
      pin: '456789',
      icon: Boxes,
      badge: 'Logistics',
    },
    {
      id: 'D005',
      name: 'WAREHOUSE',
      title: 'Warehouse Fulfillment Operations',
      desc: 'Barcode scanning, pick queue execution, packaging slip generation, and parcel crating.',
      loginRoute: '/warehouse/login',
      dashboardRoute: '/warehouse/dashboard',
      subpages: [
        { label: 'Pick Queue', path: '/warehouse/picking' },
        { label: 'Packing Station', path: '/warehouse/packing' },
      ],
      user: 'warehouse1',
      pin: '567890',
      icon: Boxes,
      badge: 'Operations',
    },
    {
      id: 'D006',
      name: 'SALES',
      title: 'Sales & Client Orders',
      desc: 'Direct order entry, quote generation, client discounts, order modifications, and official pro-formas.',
      loginRoute: '/sales/login',
      dashboardRoute: '/sales/dashboard',
      subpages: [
        { label: 'Orders Ledger', path: '/sales/orders' },
      ],
      user: 'salesrep',
      pin: '678901',
      icon: FileText,
      badge: 'Commercial',
    },
    {
      id: 'D007',
      name: 'CUSTOMER_SUPPORT',
      title: 'Client Concierge & Support',
      desc: 'Private client ticket queue, resolution tracking, concierge inquiries, and escalation matrix.',
      loginRoute: '/support/login',
      dashboardRoute: '/support/dashboard',
      subpages: [
        { label: 'Support Tickets', path: '/support/tickets' },
      ],
      user: 'supportrep',
      pin: '789012',
      icon: Headphones,
      badge: 'Client Service',
    },
    {
      id: 'D008',
      name: 'DELIVERY_MANAGER',
      title: 'Delivery Fleet Dispatch Hub',
      desc: 'Live courier telemetry, delivery assignment, route prioritization, and Cairo/Giza fleet tracking.',
      loginRoute: '/delivery-manager/login',
      dashboardRoute: '/delivery-manager/dashboard',
      subpages: [
        { label: 'Ready Orders', path: '/delivery-manager/orders' },
        { label: 'Courier Fleet', path: '/delivery-manager/drivers' },
      ],
      user: 'deliverymgr',
      pin: '890123',
      icon: Truck,
      badge: 'Fleet Ops',
    },
    {
      id: 'D009',
      name: 'DRIVER',
      title: 'Courier Delivery Mobile Portal',
      desc: 'Mobile manifest, turn-by-turn navigation HUD, client 4-digit OTP handover, and digital signature POD.',
      loginRoute: '/driver/login',
      dashboardRoute: '/driver/dashboard',
      subpages: [
        { label: 'My Deliveries', path: '/driver/deliveries' },
      ],
      user: 'driver1',
      pin: '901234',
      icon: Truck,
      badge: 'Courier Mobile',
    },
    {
      id: 'D010',
      name: 'ACCOUNTING',
      title: 'Financial & Accounting Ledger',
      desc: 'Payment reconciliations, Egyptian Tax Authority 14% VAT e-invoicing, COD cash intake, and financial audits.',
      loginRoute: '/accounting/login',
      dashboardRoute: '/accounting/dashboard',
      subpages: [
        { label: 'Payments', path: '/accounting/payments' },
        { label: 'Financial Reports', path: '/accounting/reports' },
      ],
      user: 'accountant',
      pin: '112233',
      icon: DollarSign,
      badge: 'Finance',
    },
    {
      id: 'D011',
      name: 'MARKETING',
      title: 'Marketing Campaigns & Curations',
      desc: 'Private preview campaigns, promotional coupons, audience segmentation, and attribution analytics.',
      loginRoute: '/marketing/login',
      dashboardRoute: '/marketing/dashboard',
      subpages: [
        { label: 'Campaigns', path: '/marketing/campaigns' },
        { label: 'Coupons', path: '/marketing/coupons' },
      ],
      user: 'marketmgr',
      pin: '223344',
      icon: Megaphone,
      badge: 'Growth',
    },
    {
      id: 'D012',
      name: 'CUSTOMER',
      title: 'Client Private Portal',
      desc: 'Client commissions, live GPS delivery tracking, self-service RMA returns, and private profile.',
      loginRoute: '/customer/login',
      dashboardRoute: '/customer/dashboard',
      subpages: [
        { label: 'My Orders', path: '/customer/orders' },
        { label: 'Client Profile', path: '/customer/profile' },
      ],
      user: 'client1',
      pin: '334455',
      icon: UserCheck,
      badge: 'Private Client',
    },
  ];

  return (
    <div className="min-h-screen bg-surface py-lg px-4 sm:px-margin antialiased selection:bg-primary selection:text-on-primary">
      <div className="max-w-7xl mx-auto space-y-xl">
        {/* Header */}
        <div className="border-b border-surface-container pb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-mono">
                Enterprise Architecture Directory • STRICT DEPARTMENT ISOLATION
              </span>
            </div>
            <h1 className="font-headline-lg text-3xl md:text-5xl uppercase font-bold tracking-tight text-on-surface">
              Operational Departments
            </h1>
            <p className="font-body-md text-sm md:text-base text-secondary max-w-2xl mt-xs">
              Every department functions as an independent operational application with its own 6-digit numeric PIN authentication, isolated dashboard, dedicated sub-routes, and role permissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-sm py-2 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors"
            >
              ← Customer Storefront
            </Link>
          </div>
        </div>

        {/* Isolation Architecture Banner */}
        <div className="p-md bg-surface-container-low rounded-2xl border border-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span className="font-bold text-on-surface uppercase tracking-wider">Zero Shared Navigation or Role Leakage</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Users can only log into and access the department explicitly assigned to their account. Attempting to access other department routes or APIs is strictly rejected with HTTP 403 Forbidden.
            </p>
          </div>
          <div className="font-mono text-[11px] px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container text-secondary shrink-0">
            Auth Method: 6-Digit PIN
          </div>
        </div>

        {/* 12 Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                className="p-md bg-surface-container-lowest rounded-2xl border border-surface-container flex flex-col justify-between hover:border-primary/40 transition-all shadow-sm group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-primary block">
                          {dept.id}
                        </span>
                        <span className="font-label-sm text-[10px] text-secondary uppercase tracking-widest block font-mono">
                          {dept.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-md uppercase font-semibold">
                      {dept.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface uppercase tracking-tight mb-1">
                    {dept.title}
                  </h3>
                  <p className="font-body-sm text-xs text-secondary mb-md line-clamp-2 leading-relaxed">
                    {dept.desc}
                  </p>

                  {/* Operational Subpages */}
                  <div className="mb-md space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold block">
                      Dedicated Routes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dept.subpages.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-secondary text-[11px] font-mono transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Demo Credentials & Action Buttons */}
                <div className="pt-md border-t border-surface-container space-y-sm">
                  {/* Demo Credential Pill */}
                  <div className="p-2 bg-surface-container-low rounded-xl border border-surface-container text-[11px] flex items-center justify-between font-mono">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <KeyRound className="w-3.5 h-3.5 text-primary" />
                      <span>User: <strong className="text-on-surface">{dept.user}</strong></span>
                    </div>
                    <span className="text-secondary">PIN: <strong className="text-primary">{dept.pin}</strong></span>
                  </div>

                  {/* Action Link to Department Login Terminal */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={dept.loginRoute}
                      className="py-2.5 px-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-1 hover:bg-inverse-surface transition-colors shadow-sm text-center"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Login</span>
                    </Link>

                    <Link
                      href={dept.dashboardRoute}
                      className="py-2.5 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-1 border border-surface-container transition-colors text-center"
                    >
                      <span>Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
