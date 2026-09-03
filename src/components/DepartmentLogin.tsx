'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldAlert, ArrowRight, User, KeyRound, Delete, CheckCircle2 } from 'lucide-react';
import { DEPARTMENT_METADATA } from '@/lib/departments';

interface DepartmentLoginProps {
  departmentId: string;
  defaultUsername?: string;
  demoPin?: string;
}

export default function DepartmentLogin({
  departmentId,
  defaultUsername = '',
  demoPin = '',
}: DepartmentLoginProps) {
  const router = useRouter();
  const dept = DEPARTMENT_METADATA[departmentId] || {
    name: departmentId,
    title: `${departmentId} Department Portal`,
    defaultPath: '/',
    loginPath: '#',
  };

  const [username, setUsername] = useState(defaultUsername);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle numeric keypad clicks
  const handleDigitClick = (digit: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + digit);
      setErrorMessage('');
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleClear = () => {
    setPin('');
    setErrorMessage('');
  };

  const fillDemo = () => {
    if (defaultUsername) setUsername(defaultUsername);
    if (demoPin) setPin(demoPin);
    setErrorMessage('');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter your operational username.');
      return;
    }

    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
      setErrorMessage('Security constraint: 6 numeric digits required for PIN.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          pin,
          department_id: departmentId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(`Access Granted. Launching ${dept.title}...`);
        setTimeout(() => {
          router.push(data.redirectUrl || dept.defaultPath);
        }, 800);
      } else {
        setErrorMessage(data.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setErrorMessage('System error during authentication: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut for pressing Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && pin.length === 6 && username) {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, username]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-on-primary">
      {/* Top Breadcrumb */}
      <div className="w-full max-w-md mb-md flex items-center justify-between text-xs">
        <Link
          href="/departments"
          className="text-secondary hover:text-on-surface uppercase tracking-widest font-label-md flex items-center gap-1 transition-colors"
        >
          <span>← Central Department Directory</span>
        </Link>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-container-low text-secondary border border-surface-container">
          {departmentId} • ISOLATED
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container rounded-2xl p-lg shadow-sm">
        {/* Department Identification Header */}
        <div className="text-center mb-lg">
          <div className="w-12 h-12 rounded-xl bg-primary text-on-primary mx-auto flex items-center justify-center mb-sm shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary block mb-1 font-mono">
            {departmentId} • {dept.name}
          </span>
          <h1 className="font-headline-lg text-2xl font-bold uppercase tracking-tight text-on-surface">
            {dept.title}
          </h1>
          <p className="font-body-sm text-xs text-secondary mt-1">
            Isolated Operational Terminal • 6-Digit Numeric Verification
          </p>
        </div>

        {/* Demo Quick-Fill Helper Badge */}
        {defaultUsername && demoPin && (
          <div className="mb-md p-2.5 bg-surface-container-low border border-surface-container rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-secondary uppercase tracking-wider block font-semibold">Demo Credentials:</span>
              <span className="font-mono text-on-surface font-semibold">
                User: <span className="underline">{defaultUsername}</span> • PIN: <span className="underline">{demoPin}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="px-2.5 py-1 bg-primary text-on-primary rounded font-label-md text-[10px] uppercase tracking-wider hover:bg-inverse-surface transition-colors"
            >
              Fill Credentials
            </button>
          </div>
        )}

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="mb-md p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-700">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-md p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
          {/* Username Input */}
          <div className="space-y-1">
            <label className="font-label-md text-xs uppercase tracking-wider text-secondary font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Department Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. superadmin"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg font-mono text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              required
            />
          </div>

          {/* 6-Digit PIN Display Dots */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-xs uppercase tracking-wider text-secondary font-medium flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>6-Digit Security PIN</span>
              </label>
              <span className="font-mono text-[11px] text-secondary">
                {pin.length} / 6
              </span>
            </div>

            {/* Direct Input fallback */}
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 6) setPin(val);
              }}
              placeholder="••••••"
              className="w-full p-2.5 bg-surface-container-low border border-surface-container rounded-lg text-center font-mono text-xl tracking-[0.6em] text-on-surface focus:outline-none focus:border-primary transition-all"
            />

            {/* Visual Indicator Dots */}
            <div className="flex justify-center items-center gap-2 py-1">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const filled = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-150 ${
                      filled ? 'bg-primary scale-110 shadow-sm' : 'bg-surface-container-high'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Numeric Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigitClick(digit)}
                className="py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-headline-sm text-lg font-semibold border border-surface-container transition-all active:scale-95 shadow-sm"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary font-label-md text-xs uppercase font-medium border border-surface-container transition-all"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleDigitClick('0')}
              className="py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-headline-sm text-lg font-semibold border border-surface-container transition-all active:scale-95 shadow-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary flex items-center justify-center border border-surface-container transition-all"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || pin.length !== 6 || !username}
            className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-inverse-surface transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Security Watermark */}
      <div className="mt-lg text-center text-[11px] text-secondary space-y-1">
        <p>Enterprise Isolation Engine • Zero Shared Role Permissions</p>
        <p className="font-mono text-[10px]">Session Timeout: 12 Hours • Failed Attempt Limit: 5</p>
      </div>
    </div>
  );
}
