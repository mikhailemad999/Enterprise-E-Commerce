'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Shield, Grid, User, ExternalLink } from 'lucide-react';
import { DEPARTMENT_METADATA, DepartmentUser } from '@/lib/departments';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface DepartmentShellProps {
  departmentId: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

export default function DepartmentShell({
  departmentId,
  navItems,
  children,
}: DepartmentShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dept = DEPARTMENT_METADATA[departmentId];

  const [user, setUser] = useState<DepartmentUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          // Verify department isolation
          if (data.user.department_id !== departmentId) {
            // Unauthorized for this department
            router.push(`${dept.loginPath}?error=isolated`);
            return;
          }
          setUser(data.user);
        } else {
          router.push(dept.loginPath);
        }
      } catch {
        router.push(dept.loginPath);
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [departmentId, dept.loginPath, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(dept.loginPath);
    } catch {
      router.push(dept.loginPath);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-sm" />
        <p className="font-label-md text-xs uppercase tracking-widest text-secondary">
          Verifying {dept.title} Security Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col text-on-surface antialiased">
      {/* Top Telemetry & Isolation Bar */}
      <header className="sticky top-0 z-30 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container px-4 lg:px-margin py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Department Badge */}
          <div className="flex items-center gap-3">
            <Link href={dept.defaultPath} className="flex items-center gap-2 group">
              <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                L
              </span>
              <div>
                <span className="font-headline-sm font-bold text-sm tracking-tight uppercase block group-hover:text-secondary transition-colors">
                  LUMIO
                </span>
                <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider block font-mono">
                  {departmentId} • {dept.name}
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block w-px h-5 bg-surface-container mx-1" />

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-[10px] uppercase tracking-wider font-semibold border border-surface-container">
              {dept.title}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    active
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-surface-container-low rounded-lg border border-surface-container text-xs">
                <User className="w-3.5 h-3.5 text-secondary" />
                <span className="font-medium text-on-surface">{user.name}</span>
                <span className="text-[10px] text-secondary font-mono">({user.username})</span>
              </div>
            )}

            <Link
              href="/departments"
              className="p-2 text-secondary hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors"
              title="Central Department Switcher"
            >
              <Grid className="w-4 h-4" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-surface-container-low hover:bg-red-500/10 hover:text-red-700 text-secondary border border-surface-container rounded-lg font-label-md text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Sign Out of Department Terminal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Department Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-margin py-md sm:py-lg">
        {children}
      </main>

      {/* Security Footer */}
      <footer className="border-t border-surface-container py-3 px-4 text-center text-[10px] text-secondary font-mono bg-surface-container-lowest">
        Department Isolation Enforced • Terminal ID: {departmentId}-TERM-01 • Secure Connection
      </footer>
    </div>
  );
}
