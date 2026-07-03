import { Role, AdminPermission } from './permission.types';
import { PERMISSION_MATRIX } from './permission.matrix';

export function hasPermission(role: Role, permission: AdminPermission): boolean {
  const allowed = PERMISSION_MATRIX[role];
  if (!allowed) return false;
  return allowed.includes(permission);
}

export function requirePermission(role: Role, permission: AdminPermission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Access Denied: Role ${role} lacks permission ${permission}`);
  }
}
