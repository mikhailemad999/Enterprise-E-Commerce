'use client';

import React from 'react';
import DepartmentShell from '@/components/DepartmentShell';
import { ShieldCheck, Building2, Users, FileText } from 'lucide-react';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Overview', href: '/super-admin/dashboard', icon: ShieldCheck },
    { label: 'Tenants', href: '/super-admin/tenants', icon: Building2 },
    { label: 'Global Users', href: '/super-admin/users', icon: Users },
    { label: 'Audit Logs', href: '/super-admin/audit-logs', icon: FileText },
  ];

  return (
    <DepartmentShell departmentId="D001" navItems={navItems}>
      {children}
    </DepartmentShell>
  );
}
