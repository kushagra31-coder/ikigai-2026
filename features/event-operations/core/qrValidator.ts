import { QRPayload, ScanResultStatus, DigitalPass, PassStatus } from '../types';
import { cryptoUtils } from './cryptoUtils';

export const qrValidator = {
  /**
   * Parse a raw QR code string.
   */
  parseRawPayload(raw: string): QRPayload | null {
    try {
      const payload = JSON.parse(raw) as QRPayload;
      if (!payload.passId || !payload.checksum || !payload.timestamp) {
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  },

  /**
   * Validates the integrity of the QR Payload itself.
   */
  validatePayloadIntegrity(payload: QRPayload): ScanResultStatus | null {
    if (payload.version !== '1.0') {
      return ScanResultStatus.INVALID;
    }

    if (!cryptoUtils.verifyChecksum(payload)) {
      return ScanResultStatus.INVALID;
    }

    // Expiry Check (e.g., QR codes might expire after 7 days, or end of event)
    // For IKIGAI, we'll assume a QR lives for 7 days maximum from generation.
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - payload.timestamp > SEVEN_DAYS_MS) {
      return ScanResultStatus.EXPIRED;
    }

    return null; // Null means it passed basic integrity checks
  },

  /**
   * Validates the state of the Pass.
   */
  validatePassState(pass: DigitalPass): ScanResultStatus | null {
    if (pass.status === PassStatus.BLOCKED) {
      return ScanResultStatus.BLOCKED;
    }
    if (pass.status === PassStatus.EXPIRED) {
      return ScanResultStatus.EXPIRED;
    }

    return null;
  }
};
