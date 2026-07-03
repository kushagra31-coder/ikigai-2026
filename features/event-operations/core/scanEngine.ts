import { Checkpoint, ScanResult, ScanResultStatus, DigitalPass } from '../types';
import { qrValidator } from './qrValidator';
import { passRepository } from '../repository/pass.repository';
import { scanLogRepository } from '../repository/scanLog.repository';
import { liveEventBus } from '@/features/live/core/eventBus';
import { LiveEventType } from '@/features/live/core/eventRegistry';

interface ScanParams {
  rawPayload: string;
  checkpoint: Checkpoint;
  volunteerId: string;
  deviceId: string;
}

export const scanEngine = {
  /**
   * Process a QR scan attempt.
   */
  async processScan(params: ScanParams): Promise<ScanResult> {
    const { rawPayload, checkpoint, volunteerId, deviceId } = params;

    // 1. Parse Payload
    const payload = qrValidator.parseRawPayload(rawPayload);
    if (!payload) {
      return this.recordFailure(ScanResultStatus.INVALID, 'Unrecognized QR Format', params);
    }

    // 2. Validate Payload Integrity
    const integrityError = qrValidator.validatePayloadIntegrity(payload);
    if (integrityError) {
      return this.recordFailure(integrityError, `QR Integrity Check Failed: ${integrityError}`, params);
    }

    // 3. Lookup Pass
    const passResult = await passRepository.getPassById(payload.passId);
    if (!passResult.success) {
      return this.recordFailure(ScanResultStatus.NOT_FOUND, 'Digital Pass not found in system', params);
    }
    const pass = passResult.data;

    // 4. Validate Pass State
    const stateError = qrValidator.validatePassState(pass);
    if (stateError) {
      return this.recordFailure(stateError, `Pass is ${stateError}`, params, pass);
    }

    // 5. Verify Duplicate Checkpoint Rules (e.g. Cannot have 2 Lunches)
    const hasScannedResult = await scanLogRepository.hasScanned(pass.teamId, checkpoint);
    if (hasScannedResult.success && hasScannedResult.data) {
      return this.recordFailure(ScanResultStatus.ALREADY_SCANNED, `Team has already scanned at ${checkpoint}`, params, pass);
    }

    // 6. Record Success
    const recordResult = await scanLogRepository.recordScan({
      id: `scan_${Date.now()}`,
      passId: pass.id,
      teamId: pass.teamId,
      checkpoint,
      timestamp: new Date().toISOString(),
      volunteerId,
      result: ScanResultStatus.VALID,
      deviceId
    });
    const logId = recordResult.success ? recordResult.data.id : `scan_${Date.now()}`;

    // Update last scan on pass
    await passRepository.updateLastScan(pass.id, checkpoint);

    // 7. Emit Live Event for Realtime System (Leaderboard / Attendance)
    liveEventBus.emit({
      id: `evt_scan_${logId}`,
      type: LiveEventType.TEAM_UPDATED, // Reuse team updated event for attendance
      timestamp: new Date().toISOString(),
      actor: volunteerId,
      target: pass.teamName,
      payload: { checkpoint, passId: pass.id, teamId: pass.teamId },
      priority: 'MEDIUM',
      source: 'ScanEngine'
    });

    return {
      status: ScanResultStatus.VALID,
      message: 'Scan Successful',
      pass
    };
  },

  /**
   * Helper to consistently record and return failures.
   */
  async recordFailure(
    status: ScanResultStatus, 
    message: string, 
    params: ScanParams,
    pass?: DigitalPass
  ): Promise<ScanResult> {
    
    // Log the failed attempt if we have enough info
    await scanLogRepository.recordScan({
      id: `scan_${Date.now()}`,
      passId: pass?.id || 'UNKNOWN',
      teamId: pass?.teamId || 'UNKNOWN',
      checkpoint: params.checkpoint,
      timestamp: new Date().toISOString(),
      volunteerId: params.volunteerId,
      result: status,
      deviceId: params.deviceId
    });

    return { status, message, pass };
  }
};
