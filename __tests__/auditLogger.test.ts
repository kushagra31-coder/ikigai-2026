/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { auditLogger } from '../features/admin/utils/auditLogger';
import { adminRepository } from '../features/admin/repository/admin.repository';

describe('auditLogger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs create actions correctly', async () => {
    const addLogSpy = vi.spyOn(adminRepository.logs, 'addLog').mockResolvedValue({ success: true, data: undefined });

    await auditLogger.logCreate('admin_1', 'ADMIN' as any, 'Users', 'user_2');

    expect(addLogSpy).toHaveBeenCalled();
    const passedLog = addLogSpy.mock.calls[0][0];
    expect(passedLog.action).toBe('CREATE');
    expect(passedLog.module).toBe('Users');
    expect(passedLog.target).toBe('user_2');
    expect(passedLog.severity).toBe('INFO');
  });

  it('logs delete actions with WARN severity', async () => {
    const addLogSpy = vi.spyOn(adminRepository.logs, 'addLog').mockResolvedValue({ success: true, data: undefined });

    await auditLogger.logDelete('admin_1', 'SUPER_ADMIN' as any, 'Teams', 'team_3');

    expect(addLogSpy).toHaveBeenCalled();
    const passedLog = addLogSpy.mock.calls[0][0];
    expect(passedLog.action).toBe('DELETE');
    expect(passedLog.severity).toBe('WARN');
  });
});
