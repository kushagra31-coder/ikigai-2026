'use client';

import { useState } from 'react';
import { Checkpoint, ScanResult, ScanResultStatus } from '../types';
import { scanService } from '../services/scan.service';

export function useScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);

  const scan = async (
    rawPayload: string, 
    checkpoint: Checkpoint, 
    volunteerId: string, 
    deviceId: string,
    isOfflineMode: boolean = false
  ) => {
    setIsScanning(true);
    setLastResult(null);
    try {
      // Simulate network delay for realism
      await new Promise(res => setTimeout(res, 500));
      
      const result = await scanService.performScan(
        rawPayload, 
        checkpoint, 
        volunteerId, 
        deviceId, 
        isOfflineMode
      );
      
      setLastResult(result);
      
      // Optional: trigger sounds based on result status
      // if (result.status === ScanResultStatus.VALID) playSuccessSound();
      
      return result;
    } catch {
      const errorResult: ScanResult = { 
        status: ScanResultStatus.INVALID, 
        message: 'A system error occurred during scan.' 
      };
      setLastResult(errorResult);
      return errorResult;
    } finally {
      setIsScanning(false);
    }
  };

  const clearResult = () => setLastResult(null);

  return {
    scan,
    isScanning,
    lastResult,
    clearResult
  };
}
