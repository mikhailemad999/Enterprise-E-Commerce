'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Boxes, CheckSquare, PackageCheck, BarChart3 } from 'lucide-react';

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Fulfillment Hub', href: '/warehouse/dashboard', icon: BarChart3 },
    { label: 'Pick Queue', href: '/warehouse/picking', icon: CheckSquare },
    { label: 'Packing Station', href: '/warehouse/packing', icon: PackageCheck },
  ];

  return (
    <DepartmentShell departmentId="D005" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
