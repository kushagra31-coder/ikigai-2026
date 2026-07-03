import { QRPayload } from '../types';

/**
 * Mocks cryptographic operations for the QR System.
 * In production, this would use a robust library like 'crypto-js' or Web Crypto API.
 */
export const cryptoUtils = {
  /**
   * Generates a deterministic mock checksum based on passId and timestamp.
   * Ensures the QR hasn't been tampered with.
   */
  generateChecksum(passId: string, timestamp: number): string {
    // Simple mock hashing logic
    const str = `${passId}_IKIGAI_SECRET_${timestamp}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  },

  /**
   * Validates if the checksum in the payload is authentic.
   */
  verifyChecksum(payload: QRPayload): boolean {
    const expected = this.generateChecksum(payload.passId, payload.timestamp);
    return expected === payload.checksum;
  },

  /**
   * Mocks encrypting a token.
   */
  encryptToken(passId: string): string {
    return btoa(`${passId}_${Date.now()}`); // Mock encryption
  },

  /**
   * Create a full secure QR payload for a team pass.
   */
  createPayload(passId: string): QRPayload {
    const timestamp = Date.now();
    return {
      passId,
      encryptedToken: this.encryptToken(passId),
      version: '1.0',
      timestamp,
      checksum: this.generateChecksum(passId, timestamp)
    };
  }
};
