export enum PassStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  EXPIRED = 'EXPIRED'
}

export enum Checkpoint {
  REGISTRATION_DESK = 'REGISTRATION_DESK',
  HACKATHON_HALL_ENTRY = 'HACKATHON_HALL_ENTRY',
  MEAL_DAY1_LUNCH = 'MEAL_DAY1_LUNCH',
  MEAL_DAY1_DINNER = 'MEAL_DAY1_DINNER',
  MEAL_DAY2_MIDNIGHT = 'MEAL_DAY2_MIDNIGHT',
  MEAL_DAY2_BREAKFAST = 'MEAL_DAY2_BREAKFAST',
  MEAL_DAY2_LUNCH = 'MEAL_DAY2_LUNCH',
  MEAL_DAY2_HIGH_TEA = 'MEAL_DAY2_HIGH_TEA',
  MENTOR_SESSION_1 = 'MENTOR_SESSION_1',
  MENTOR_SESSION_2 = 'MENTOR_SESSION_2',
  FINAL_PRESENTATION = 'FINAL_PRESENTATION',
  CLOSING_CEREMONY = 'CLOSING_CEREMONY'
}

export enum ScanResultStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
  ALREADY_SCANNED = 'ALREADY_SCANNED',
  BLOCKED = 'BLOCKED',
  NOT_FOUND = 'NOT_FOUND',
  OFFLINE_PENDING = 'OFFLINE_PENDING'
}

export interface QRPayload {
  passId: string;
  encryptedToken: string;
  version: string;
  checksum: string;
  timestamp: number;
}

export interface DigitalPass {
  id: string; // passId
  teamId: string;
  teamName: string;
  trackId: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  status: PassStatus;
  issuedAt: string;
  qrPayload: string; // JSON stringified QRPayload
  lastScan?: {
    checkpoint: Checkpoint;
    timestamp: string;
  };
}

export interface ScanLog {
  id: string;
  passId: string;
  teamId: string;
  checkpoint: Checkpoint;
  timestamp: string;
  volunteerId: string;
  result: ScanResultStatus;
  deviceId: string;
  isOfflineSync?: boolean;
}

export interface ScanResult {
  status: ScanResultStatus;
  message: string;
  pass?: DigitalPass;
}

export interface OfflineQueueItem {
  id: string;
  payload: string; // the raw scanned string
  checkpoint: Checkpoint;
  timestamp: string;
  volunteerId: string;
  deviceId: string;
}
