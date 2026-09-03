'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Megaphone, Ticket, BarChart3 } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Growth Overview', href: '/marketing/dashboard', icon: BarChart3 },
    { label: 'Campaigns', href: '/marketing/campaigns', icon: Megaphone },
    { label: 'Coupons & Promos', href: '/marketing/coupons', icon: Ticket },
  ];

  return (
    <DepartmentShell departmentId="D011" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
