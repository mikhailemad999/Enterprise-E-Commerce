'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Truck, Navigation, Users, BarChart3 } from 'lucide-react';

export default function DeliveryManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Fleet Overview', href: '/delivery-manager/dashboard', icon: BarChart3 },
    { label: 'Ready Orders', href: '/delivery-manager/orders', icon: Navigation },
    { label: 'Courier Fleet', href: '/delivery-manager/drivers', icon: Users },
  ];

  return (
    <DepartmentShell departmentId="D008" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
