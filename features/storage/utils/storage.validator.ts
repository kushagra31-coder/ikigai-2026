import { StorageBucket, StorageError } from '../../../types/storage';

export const BUCKET_CONFIGS: Record<StorageBucket, { maxSizeBytes: number; allowedMimes: string[] }> = {
  avatars: {
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp']
  },
  submissions: {
    maxSizeBytes: 50 * 1024 * 1024, // 50MB
    allowedMimes: ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/octet-stream'] // .zip sometimes comes as octet-stream
  },
  presentations: {
    maxSizeBytes: 20 * 1024 * 1024, // 20MB
    allowedMimes: ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  },
  videos: {
    maxSizeBytes: 100 * 1024 * 1024, // 100MB
    allowedMimes: ['video/mp4', 'video/quicktime', 'video/webm']
  },
  documents: {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedMimes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
  },
  sponsors: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  },
  logos: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  },
  passes: {
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedMimes: ['image/png']
  },
  exports: {
    maxSizeBytes: 20 * 1024 * 1024, // 20MB
    allowedMimes: ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf']
  },
  assets: {
    maxSizeBytes: 20 * 1024 * 1024, // 20MB
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf', 'video/mp4']
  }
};

export class StorageValidator {
  
  static validate(file: File, bucket: StorageBucket): void {
    const config = BUCKET_CONFIGS[bucket];
    if (!config) {
      throw new StorageError(`Bucket ${bucket} configuration not found`, 'INVALID_BUCKET');
    }

    if (file.size > config.maxSizeBytes) {
      throw new StorageError(
        `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum limit for ${bucket} (${(config.maxSizeBytes / 1024 / 1024).toFixed(2)}MB)`,
        'FILE_TOO_LARGE'
      );
    }

    if (file.type && !config.allowedMimes.includes(file.type)) {
      throw new StorageError(
        `File type ${file.type} is not allowed for bucket ${bucket}. Allowed types: ${config.allowedMimes.join(', ')}`,
        'INVALID_EXTENSION'
      );
    }
    
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
      throw new StorageError(`Invalid filename: ${file.name}`, 'INVALID_FILE');
    }
  }

  static async generateChecksum(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
