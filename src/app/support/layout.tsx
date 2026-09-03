'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { Headphones, LifeBuoy, CheckCircle2 } from 'lucide-react';

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Concierge Overview', href: '/support/dashboard', icon: Headphones },
    { label: 'Support Tickets', href: '/support/tickets', icon: LifeBuoy },
  ];

  return (
    <DepartmentShell departmentId="D007" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
