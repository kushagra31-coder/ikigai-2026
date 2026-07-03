import { Role } from '../permissions';
import { AuditLog } from '../types';
import { adminRepository } from '../repository/admin.repository';

// This utility ensures all admin logs are perfectly structured and consistent.

const createBaseLog = (user: string, role: Role, action: string, module: string, target: string, result: 'SUCCESS' | 'FAILURE' | 'WARNING', severity: 'INFO' | 'WARN' | 'ERROR'): AuditLog => ({
  id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  timestamp: new Date().toISOString(),
  user,
  role,
  action,
  module,
  target,
  result,
  severity
});

export const auditLogger = {
  logCreate: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'CREATE', module, target, 'SUCCESS', 'INFO');
    await adminRepository.logs.addLog(log);
  },
  logUpdate: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'UPDATE', module, target, 'SUCCESS', 'INFO');
    await adminRepository.logs.addLog(log);
  },
  logDelete: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'DELETE', module, target, 'SUCCESS', 'WARN');
    await adminRepository.logs.addLog(log);
  },
  logAssign: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'ASSIGN', module, target, 'SUCCESS', 'INFO');
    await adminRepository.logs.addLog(log);
  },
  logPublish: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'PUBLISH', module, target, 'SUCCESS', 'INFO');
    await adminRepository.logs.addLog(log);
  },
  logLock: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'LOCK', module, target, 'SUCCESS', 'WARN');
    await adminRepository.logs.addLog(log);
  },
  logUnlock: async (user: string, role: Role, module: string, target: string) => {
    const log = createBaseLog(user, role, 'UNLOCK', module, target, 'SUCCESS', 'WARN');
    await adminRepository.logs.addLog(log);
  }
};
