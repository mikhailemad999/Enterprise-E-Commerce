'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Boxes, ArrowLeftRight, BarChart3 } from 'lucide-react';

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Stock Overview', href: '/inventory/dashboard', icon: BarChart3 },
    { label: 'Inventory Matrix', href: '/inventory/products', icon: Boxes },
    { label: 'Stock Transfers', href: '/inventory/transfers', icon: ArrowLeftRight },
  ];

  return (
    <DepartmentShell departmentId="D004" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
