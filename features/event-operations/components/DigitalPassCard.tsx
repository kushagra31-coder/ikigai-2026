'use client';

import React from 'react';
import { DigitalPass, PassStatus } from '../types';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
// Normally we'd use 'qrcode.react' or similar to render the actual QR code image
// Here we simulate the QR display

interface DigitalPassCardProps {
  pass: DigitalPass;
}

export function DigitalPassCard({ pass }: DigitalPassCardProps) {
  const isBlocked = pass.status === PassStatus.BLOCKED;
  const isExpired = pass.status === PassStatus.EXPIRED;

  return (
    <GlassCard className={`p-6 relative overflow-hidden transition-all max-w-sm mx-auto ${
      isBlocked ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
      isExpired ? 'border-yellow-500 opacity-80' : 
      'border-primary/50 hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.15)]'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

      <div className="relative z-10 text-center space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-foreground">{pass.teamName}</h2>
          <p className="text-sm font-medium text-primary tracking-widest uppercase mt-1">{pass.trackId.replace('T_', '').replace('_', ' ')}</p>
        </div>

        {/* MOCK QR CODE GRAPHIC */}
        <div className="bg-white p-4 rounded-xl inline-block relative mx-auto group">
          {/* In production: <QRCode value={pass.qrPayload} size={200} /> */}
          <div className={`w-[200px] h-[200px] flex items-center justify-center ${isBlocked || isExpired ? 'opacity-20 grayscale' : ''}`}>
            <Icons.qrCode className="w-full h-full text-black" />
          </div>

          {(isBlocked || isExpired) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-black uppercase tracking-widest text-xl">
              <Icons.warning className="w-12 h-12 mb-2 text-red-600" />
              {pass.status}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Team Members</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {pass.members.map(member => (
              <span key={member.id} className="text-xs px-2 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-1">
                {member.role === 'LEADER' && <Icons.star className="w-3 h-3 text-yellow-500" />}
                {member.name}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-muted-foreground font-mono">
          <span>ID: {pass.id}</span>
          <span>{new Date(pass.issuedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </GlassCard>
  );
}
