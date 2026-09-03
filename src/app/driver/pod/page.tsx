'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  KeyRound,
  PenTool,
  Camera,
  Banknote,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

export default function ProofOfDeliveryPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const [otpInput, setOtpInput] = useState('');
  const [codCollected, setCodCollected] = useState(true);
  const [photoTaken, setPhotoTaken] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Canvas drawing handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    setHasSignature(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSubmitPod = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otpInput.length < 4) {
      setErrorMsg('Please enter the client 4-digit verification OTP.');
      return;
    }

    setSubmitting(true);
    try {
      const signatureData = canvasRef.current?.toDataURL() || 'SIGNED_DIGITALLY';
      const res = await fetch('/api/driver/pod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_id: 1,
          order_id: 1,
          driver_id: 1,
          otp_code: otpInput,
          signature_data: signatureData,
          proof_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
          cod_collected: codCollected,
        }),
      });

      const json = await res.json();
      if (json.success) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#10b981', '#3b82f6'],
        });
        setTimeout(() => {
          router.push('/driver');
        }, 1500);
      } else {
        setErrorMsg(json.error || 'Failed to submit proof of delivery.');
        setSubmitting(false);
      }
    } catch (e: any) {
      setErrorMsg('Error submitting POD: ' + e.message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitPod} className="space-y-3 pb-6">
      {/* Header */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232]">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block">
          Stop 1: Zamalek Residence
        </span>
        <h3 className="font-bold text-base text-white">Proof of Delivery Handover</h3>
        <p className="text-xs text-zinc-400">Farida Mansour • Commission #LUM-2026-8891</p>
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-red-500/20 border border-red-500/30 rounded-lg text-xs text-red-300 font-semibold">
          {errorMsg}
        </div>
      )}

      {/* 1. OTP Verification Code Input */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-white" />
            <span>1. Customer 4-Digit Handover OTP</span>
          </label>
          <span className="text-[10px] text-zinc-400 font-mono">(Hint: 8492)</span>
        </div>
        <p className="text-[11px] text-zinc-400">
          Request the 4-digit code displayed on the client tracking screen to confirm identity.
        </p>
        <input
          type="text"
          maxLength={4}
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
          placeholder="8 4 9 2"
          className="w-full p-2.5 bg-[#1c1b1b] border border-[#333232] rounded-lg text-center font-mono text-2xl tracking-[0.5em] font-bold text-white focus:outline-none focus:border-white"
        />
      </div>

      {/* 2. Interactive Digital Signature Pad */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5 text-white" />
            <span>2. Client E-Signature Capture</span>
          </label>
          {hasSignature && (
            <button
              type="button"
              onClick={clearCanvas}
              className="text-[10px] text-zinc-400 hover:text-white uppercase flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <div className="relative rounded-lg overflow-hidden border border-[#333232] bg-[#141414] h-28 touch-none">
          <canvas
            ref={canvasRef}
            width={380}
            height={112}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-600 text-xs uppercase tracking-widest font-mono">
              Sign with finger / stylus here
            </div>
          )}
        </div>
      </div>

      {/* 3. Photo Proof of Placement */}
      <div className="p-3 bg-[#242323] rounded-xl border border-[#333232] space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 uppercase">
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>3. White-Glove Placement Photo</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Photo Verified</span>
          </span>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1c1b1b] border border-[#333232]">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
            alt="Placement photo"
            className="w-full h-full object-cover grayscale contrast-105"
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 rounded text-[10px] text-white font-mono">
            GPS: 30.0614 N, 31.2185 E (Zamalek)
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg disabled:opacity-50"
      >
        {submitting ? (
          <span>Verifying Handover with OMS...</span>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Complete & Confirm Handover</span>
          </>
        )}
      </button>
    </form>
  );
}
