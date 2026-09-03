'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { User, ShoppingBag, BarChart3 } from 'lucide-react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Private Folio', href: '/customer/dashboard', icon: BarChart3 },
    { label: 'My Orders', href: '/customer/orders', icon: ShoppingBag },
    { label: 'Client Profile', href: '/customer/profile', icon: User },
  ];

  return (
    <DepartmentShell departmentId="D012" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
