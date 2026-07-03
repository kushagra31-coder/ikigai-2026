import { DigitalPass, PassStatus } from '../types';
import { passRepository } from '../repository/pass.repository';
import { cryptoUtils } from '../core/cryptoUtils';
import { Result } from '../../../types/result';

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw result.error;
  return result.data;
}

export const passService = {
  /**
   * Admin: Block a pass to prevent entry.
   */
  async blockPass(passId: string): Promise<void> {
    unwrap(await passRepository.updatePassStatus(passId, PassStatus.BLOCKED));
  },

  /**
   * Admin: Reactivate a blocked pass.
   */
  async reactivatePass(passId: string): Promise<void> {
    unwrap(await passRepository.updatePassStatus(passId, PassStatus.ACTIVE));
  },

  /**
   * Gets a specific team's pass.
   */
  async getTeamPass(teamId: string): Promise<DigitalPass | null> {
    const result = await passRepository.getPassByTeam(teamId);
    if (!result.success) return null; // Or throw depending on requirement, but old was returning null
    return result.data;
  },

  /**
   * Helper to re-generate the QR payload for an existing pass.
   * Useful if the QR needs to be refreshed for security reasons.
   */
  async refreshQRPayload(passId: string): Promise<string> {
    const newPayload = cryptoUtils.createPayload(passId);
    return JSON.stringify(newPayload);
  },

  /**
   * Admin: View all passes.
   */
  async getAllPasses(): Promise<DigitalPass[]> {
    return unwrap(await passRepository.getAll());
  }
};
