'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { DollarSign, CreditCard, BarChart3, FileSpreadsheet } from 'lucide-react';

export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Financial Overview', href: '/accounting/dashboard', icon: BarChart3 },
    { label: 'Payments & COD', href: '/accounting/payments', icon: CreditCard },
    { label: 'Financial Reports', href: '/accounting/reports', icon: FileSpreadsheet },
  ];

  return (
    <DepartmentShell departmentId="D010" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
