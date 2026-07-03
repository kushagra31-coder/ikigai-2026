/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { describe, it, expect, vi } from 'vitest';
import { qrValidator } from '../features/event-operations/core/qrValidator';
import { cryptoUtils } from '../features/event-operations/core/cryptoUtils';
import { ScanResultStatus, PassStatus } from '../features/event-operations/types';

describe('qrValidator', () => {
  it('parses valid raw payload correctly', () => {
    const validRaw = JSON.stringify({
      passId: 'pass_1',
      checksum: 'abc',
      timestamp: 123456,
      version: '1.0',
      encryptedToken: 'xyz'
    });
    const parsed = qrValidator.parseRawPayload(validRaw);
    expect(parsed).not.toBeNull();
    expect(parsed?.passId).toBe('pass_1');
  });

  it('rejects malformed raw payloads', () => {
    const invalidRaw = '{ bad_json }';
    expect(qrValidator.parseRawPayload(invalidRaw)).toBeNull();

    const missingFields = JSON.stringify({ passId: 'pass_1' });
    expect(qrValidator.parseRawPayload(missingFields)).toBeNull();
  });

  it('validates payload integrity (checksum & expiry)', () => {
    const validPayload = cryptoUtils.createPayload('pass_1');
    expect(qrValidator.validatePayloadIntegrity(validPayload)).toBeNull();

    const tamperedPayload = { ...validPayload, checksum: 'tampered' };
    expect(qrValidator.validatePayloadIntegrity(tamperedPayload)).toBe(ScanResultStatus.INVALID);

    // Let's mock verifyChecksum for the expired payload since the real checksum is deterministic based on timestamp
    vi.spyOn(cryptoUtils, 'verifyChecksum').mockReturnValueOnce(true);
    const expiredPayload = { ...validPayload, timestamp: Date.now() - (8 * 24 * 60 * 60 * 1000) };
    expect(qrValidator.validatePayloadIntegrity(expiredPayload)).toBe(ScanResultStatus.EXPIRED);
    vi.restoreAllMocks();
  });

  it('validates pass state', () => {
    const blockedPass = { status: PassStatus.BLOCKED } as any;
    expect(qrValidator.validatePassState(blockedPass)).toBe(ScanResultStatus.BLOCKED);

    const activePass = { status: PassStatus.ACTIVE } as any;
    expect(qrValidator.validatePassState(activePass)).toBeNull();
  });
});
