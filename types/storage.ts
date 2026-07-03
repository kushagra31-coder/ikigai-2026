import { RepositoryError } from './result';

export type StorageErrorCode = 
  | 'INVALID_FILE'
  | 'INVALID_BUCKET'
  | 'PERMISSION_DENIED'
  | 'FILE_TOO_LARGE'
  | 'INVALID_EXTENSION'
  | 'UPLOAD_FAILED'
  | 'DELETE_FAILED'
  | 'SIGNED_URL_FAILED'
  | 'NOT_FOUND';

export class StorageError extends RepositoryError {
  constructor(message: string, code: StorageErrorCode, retryable: boolean = false, details?: unknown) {
    super(message, code, 'StorageLayer', retryable, details);
    this.name = 'StorageError';
  }
}

export interface FileMetadata {
  id: string;
  bucket: string;
  path: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  extension: string;
  size: number;
  checksum: string;
  uploadedBy: string;
  teamId?: string;
  submissionId?: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  status: 'ACTIVE' | 'DELETED' | 'ARCHIVED';
  version: number;
  createdAt: string;
  updatedAt: string;
}

export type StorageBucket = 
  | 'avatars'
  | 'submissions'
  | 'presentations'
  | 'videos'
  | 'documents'
  | 'sponsors'
  | 'logos'
  | 'passes'
  | 'exports'
  | 'assets';

export const PUBLIC_BUCKETS: StorageBucket[] = ['avatars', 'sponsors', 'logos', 'assets'];

export interface UploadOptions {
  bucket: StorageBucket;
  path: string;
  teamId?: string;
  submissionId?: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
  upsert?: boolean;
}
