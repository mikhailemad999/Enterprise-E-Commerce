'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { FileText, ShoppingBag, BarChart3 } from 'lucide-react';

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Sales Dashboard', href: '/sales/dashboard', icon: BarChart3 },
    { label: 'Client Orders', href: '/sales/orders', icon: FileText },
  ];

  return (
    <DepartmentShell departmentId="D006" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
