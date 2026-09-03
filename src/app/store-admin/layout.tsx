'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Store, Settings, Users, BarChart3 } from 'lucide-react';

export default function StoreAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Store Overview', href: '/store-admin/dashboard', icon: BarChart3 },
    { label: 'Store Settings', href: '/store-admin/settings', icon: Settings },
    { label: 'Staff Management', href: '/store-admin/staff', icon: Users },
  ];

  return (
    <DepartmentShell departmentId="D002" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
