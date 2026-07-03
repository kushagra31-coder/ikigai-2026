'use client';

import React, { useState } from 'react';
import { useScanner } from '../hooks/useScanner';
import { Checkpoint, ScanResultStatus } from '../types';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { cryptoUtils } from '../core/cryptoUtils';

export function VolunteerScanner() {
  const { scan, isScanning, lastResult, clearResult } = useScanner();
  const [activeCheckpoint, setActiveCheckpoint] = useState<Checkpoint>(Checkpoint.MEAL_DAY1_LUNCH);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Mock a scan for the dev playground
  const handleMockScan = async (passId: string = 'pass_1', tamper: boolean = false) => {
    const payload = cryptoUtils.createPayload(passId);
    if (tamper) {
      payload.checksum = 'INVALID_CHECKSUM_123';
    }
    
    await scan(
      JSON.stringify(payload),
      activeCheckpoint,
      'vol_123',
      'device_abc',
      isOfflineMode
    );
  };

  const getStatusColor = (status: ScanResultStatus) => {
    switch (status) {
      case ScanResultStatus.VALID: return 'text-green-500 bg-green-500/10 border-green-500/50';
      case ScanResultStatus.ALREADY_SCANNED: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/50';
      case ScanResultStatus.OFFLINE_PENDING: return 'text-blue-500 bg-blue-500/10 border-blue-500/50';
      default: return 'text-red-500 bg-red-500/10 border-red-500/50';
    }
  };

  const getStatusIcon = (status: ScanResultStatus) => {
    switch (status) {
      case ScanResultStatus.VALID: return <Icons.success className="w-16 h-16 text-green-500" />;
      case ScanResultStatus.ALREADY_SCANNED: return <Icons.alert className="w-16 h-16 text-yellow-500" />;
      case ScanResultStatus.OFFLINE_PENDING: return <Icons.wifiOff className="w-16 h-16 text-blue-500" />;
      default: return <Icons.error className="w-16 h-16 text-red-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <GlassCard className="p-4 border-primary/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Icons.maximize className="w-5 h-5 text-primary" />
            Scanner Mode
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className={isOfflineMode ? 'text-red-400' : 'text-green-400'}>
              {isOfflineMode ? 'Offline' : 'Online'}
            </span>
            <button 
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10"
            >
              {isOfflineMode ? <Icons.wifiOff className="w-4 h-4" /> : <Icons.wifi className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Active Checkpoint</label>
            <select 
              className="w-full bg-background border border-white/10 rounded-md p-2 text-sm"
              value={activeCheckpoint}
              onChange={(e) => setActiveCheckpoint(e.target.value as Checkpoint)}
            >
              {Object.values(Checkpoint).map(cp => (
                <option key={cp} value={cp}>{cp.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          {!lastResult && (
            <div className="aspect-square bg-black/50 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              {isScanning ? (
                <div className="text-primary flex flex-col items-center">
                  <Icons.spinner className="w-8 h-8 animate-spin mb-2" />
                  Processing...
                </div>
              ) : (
                <>
                  <div className="w-[70%] h-[70%] border border-primary/50 relative">
                    {/* Scanner line animation */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),1)] animate-[scan_2s_ease-in-out_infinite]" />
                  </div>
                  <p className="absolute bottom-6 text-sm text-muted-foreground font-mono">Awaiting QR...</p>
                </>
              )}
            </div>
          )}

          {lastResult && (
            <div className={`aspect-square border-2 rounded-xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200 ${getStatusColor(lastResult.status)}`}>
              <div className="mb-4">
                {getStatusIcon(lastResult.status)}
              </div>
              <h2 className="text-2xl font-black mb-2">{lastResult.status.replace(/_/g, ' ')}</h2>
              <p className="font-medium opacity-90">{lastResult.message}</p>
              
              {lastResult.pass && (
                <div className="mt-4 pt-4 border-t border-current/20 w-full">
                  <p className="font-bold">{lastResult.pass.teamName}</p>
                  <p className="text-sm opacity-80">{lastResult.pass.members.length} Members</p>
                </div>
              )}

              <Button 
                variant="outline" 
                className="mt-6 border-current/30 hover:bg-current/10 w-full"
                onClick={clearResult}
              >
                Scan Next
              </Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* DEV TOOLS (Hidden in prod) */}
      <GlassCard className="p-4 border-dashed border-white/20">
        <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Dev Payload Injector</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleMockScan('pass_1')}>Inject Valid (Pass 1)</Button>
          <Button size="sm" variant="secondary" onClick={() => handleMockScan('pass_2')}>Inject Blocked (Pass 2)</Button>
          <Button size="sm" variant="secondary" onClick={() => handleMockScan('pass_1', true)}>Inject Tampered QR</Button>
          <Button size="sm" variant="secondary" onClick={() => handleMockScan('invalid_pass')}>Inject Not Found</Button>
        </div>
      </GlassCard>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}} />
    </div>
  );
}
