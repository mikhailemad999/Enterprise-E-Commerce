'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Layers, Package, Grid, Award } from 'lucide-react';

export default function ProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Catalog Summary', href: '/product/dashboard', icon: Layers },
    { label: 'Products & SKUs', href: '/product/products', icon: Package },
    { label: 'Categories', href: '/product/categories', icon: Grid },
    { label: 'Atelier Brands', href: '/product/brands', icon: Award },
  ];

  return (
    <DepartmentShell departmentId="D003" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
