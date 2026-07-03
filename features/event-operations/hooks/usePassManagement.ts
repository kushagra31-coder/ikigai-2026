'use client';

import { useState, useCallback } from 'react';
import { DigitalPass } from '../types';
import { passService } from '../services/pass.service';

export function usePassManagement() {
  const [passes, setPasses] = useState<DigitalPass[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPasses = useCallback(async () => {
    setIsLoading(true);
    try {
      const allPasses = await passService.getAllPasses();
      setPasses(allPasses);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const blockPass = async (passId: string) => {
    await passService.blockPass(passId);
    await fetchPasses(); // refresh state
  };

  const reactivatePass = async (passId: string) => {
    await passService.reactivatePass(passId);
    await fetchPasses();
  };

  const refreshQR = async (passId: string) => {
    // In reality this updates the DB. For our mock, we just generate the new string.
    const newPayload = await passService.refreshQRPayload(passId);
    // You would typically save this back to passRepository here.
    return newPayload;
  };

  return {
    passes,
    isLoading,
    fetchPasses,
    blockPass,
    reactivatePass,
    refreshQR
  };
}
