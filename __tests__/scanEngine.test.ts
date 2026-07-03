/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scanEngine } from '../features/event-operations/core/scanEngine';
import { qrValidator } from '../features/event-operations/core/qrValidator';
import { passRepository } from '../features/event-operations/repository/pass.repository';
import { scanLogRepository } from '../features/event-operations/repository/scanLog.repository';
import { liveEventBus } from '../features/live/core/eventBus';
import { Checkpoint, ScanResultStatus, PassStatus } from '../features/event-operations/types';
import { cryptoUtils } from '../features/event-operations/core/cryptoUtils';

describe('scanEngine', () => {
  const mockVolunteer = 'vol_1';
  const mockDevice = 'dev_1';
  const mockCheckpoint = Checkpoint.HACKATHON_HALL_ENTRY;
  
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects invalid payload format', async () => {
    const result = await scanEngine.processScan({
      rawPayload: 'invalid_json',
      checkpoint: mockCheckpoint,
      volunteerId: mockVolunteer,
      deviceId: mockDevice
    });
    expect(result.status).toBe(ScanResultStatus.INVALID);
  });

  it('processes valid scan correctly and emits event', async () => {
    // 1. Mock payload
    const payload = cryptoUtils.createPayload('pass_1');
    const rawPayload = JSON.stringify(payload);

    // 2. Mock repository calls
    vi.spyOn(passRepository, 'getPassById').mockResolvedValue({
      id: 'pass_1',
      teamId: 'team_1',
      teamName: 'Alpha',
      status: PassStatus.ACTIVE,
    } as any);
    
    vi.mocked(scanLogRepository.hasScanned).mockResolvedValue({ success: true, data: false });
    vi.mocked(scanLogRepository.recordScan).mockResolvedValue({ success: true, data: { id: 'log123' } as any });
    vi.mocked(passRepository.updateLastScan).mockResolvedValue({ success: true, data: undefined });
    const emitSpy = vi.spyOn(liveEventBus, 'emit');

    // 3. Process
    const result = await scanEngine.processScan({
      rawPayload,
      checkpoint: mockCheckpoint,
      volunteerId: mockVolunteer,
      deviceId: mockDevice
    });

    // 4. Assert
    expect(result.status).toBe(ScanResultStatus.VALID);
    expect(scanLogRepository.recordScan).toHaveBeenCalled();
    expect(passRepository.updateLastScan).toHaveBeenCalledWith('pass_1', mockCheckpoint);
    expect(emitSpy).toHaveBeenCalled(); // Should emit Live Event
  });

  it('rejects already scanned passes at the same checkpoint', async () => {
    const payload = cryptoUtils.createPayload('pass_1');
    const rawPayload = JSON.stringify(payload);

    vi.spyOn(passRepository, 'getPassById').mockResolvedValue({
      id: 'pass_1',
      teamId: 'team_1',
      status: PassStatus.ACTIVE,
    } as any);
    
    vi.mocked(scanLogRepository.hasScanned).mockResolvedValue({ success: true, data: true }); // Already scanned

    const result = await scanEngine.processScan({
      rawPayload,
      checkpoint: mockCheckpoint,
      volunteerId: mockVolunteer,
      deviceId: mockDevice
    });

    expect(result.status).toBe(ScanResultStatus.ALREADY_SCANNED);
  });
});
