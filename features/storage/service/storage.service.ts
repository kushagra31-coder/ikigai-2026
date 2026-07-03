import { IStorageRepository } from '../../../lib/supabase/repository/storage.interface';
import { FileMetadata, StorageBucket, UploadOptions, StorageError, PUBLIC_BUCKETS } from '../../../types/storage';
import { Result } from '../../../types/result';
import { StorageValidator } from '../utils/storage.validator';

export class StorageService {
  constructor(private readonly repository: IStorageRepository) {}

  async upload(file: File, options: UploadOptions, userId: string): Promise<Result<FileMetadata>> {
    try {
      // 1. Validation
      StorageValidator.validate(file, options.bucket);
      const checksum = await StorageValidator.generateChecksum(file);

      // 2. Prevent duplicate uploads (check checksum in bucket for same user/team)
      const existing = await this.repository.listMetadata({ checksum, bucket: options.bucket, uploadedBy: userId });
      if (existing.success && existing.data.length > 0) {
        return { success: true, data: existing.data[0] };
      }

      // 3. Stored name generation
      const extension = file.name.split('.').pop() || '';
      const storedName = `${crypto.randomUUID()}.${extension}`;
      
      // Path construction
      const fullPath = options.path ? `${options.path}/${storedName}` : storedName;

      // 4. Determine visibility
      const visibility = options.visibility || (PUBLIC_BUCKETS.includes(options.bucket) ? 'PUBLIC' : 'PRIVATE');

      const metadata: Omit<FileMetadata, 'id' | 'createdAt' | 'updatedAt' | 'version'> = {
        bucket: options.bucket,
        path: fullPath,
        originalName: file.name,
        storedName,
        mimeType: file.type || 'application/octet-stream',
        extension,
        size: file.size,
        checksum,
        uploadedBy: userId,
        teamId: options.teamId,
        submissionId: options.submissionId,
        visibility,
        status: 'ACTIVE'
      };

      return this.repository.uploadFile(file, options.bucket, fullPath, metadata);
    } catch (error) {
      if (error instanceof StorageError) {
        return { success: false, error };
      }
      return { success: false, error: new StorageError('Unexpected error in storage service', 'UPLOAD_FAILED', false, error) };
    }
  }

  async replace(fileMetadataId: string, file: File): Promise<Result<FileMetadata>> {
    try {
      const current = await this.repository.getFileMetadata(fileMetadataId);
      if (!current.success) return current;

      StorageValidator.validate(file, current.data.bucket as StorageBucket);
      const checksum = await StorageValidator.generateChecksum(file);

      const extension = file.name.split('.').pop() || '';

      const metadataUpdates = {
        originalName: file.name,
        mimeType: file.type || 'application/octet-stream',
        extension,
        size: file.size,
        checksum
      };

      return this.repository.replaceFile(fileMetadataId, file, metadataUpdates);
    } catch (error) {
      if (error instanceof StorageError) {
        return { success: false, error };
      }
      return { success: false, error: new StorageError('Unexpected error in storage service', 'UPLOAD_FAILED', false, error) };
    }
  }

  async delete(fileMetadataId: string): Promise<Result<void>> {
    return this.repository.deleteFile(fileMetadataId);
  }

  async softDelete(fileMetadataId: string): Promise<Result<void>> {
    return this.repository.softDeleteFile(fileMetadataId);
  }

  async restore(fileMetadataId: string): Promise<Result<FileMetadata>> {
    return this.repository.restoreFile(fileMetadataId);
  }

  async list(filters: Partial<FileMetadata>): Promise<Result<FileMetadata[]>> {
    return this.repository.listMetadata(filters);
  }

  async createSignedUrl(fileMetadataId: string, expiresIn: number = 3600): Promise<Result<string>> {
    return this.repository.getSignedUrl(fileMetadataId, expiresIn);
  }

  async createPublicUrl(fileMetadataId: string): Promise<Result<string>> {
    const meta = await this.repository.getFileMetadata(fileMetadataId);
    if (!meta.success) return meta;
    if (meta.data.visibility !== 'PUBLIC') {
      return { success: false, error: new StorageError('Cannot create public URL for private file', 'PERMISSION_DENIED') };
    }
    return this.repository.getPublicUrl(fileMetadataId);
  }

  validate(file: File, bucket: StorageBucket): Result<void> {
    try {
      StorageValidator.validate(file, bucket);
      return { success: true, data: undefined };
    } catch (error) {
      if (error instanceof StorageError) {
        return { success: false, error };
      }
      return { success: false, error: new StorageError('Validation failed', 'INVALID_FILE', false, error) };
    }
  }

  async preview(fileMetadataId: string): Promise<Result<string>> {
    const meta = await this.repository.getFileMetadata(fileMetadataId);
    if (!meta.success) return meta;

    if (meta.data.visibility === 'PUBLIC') {
      return this.repository.getPublicUrl(fileMetadataId);
    } else {
      return this.repository.getSignedUrl(fileMetadataId, 60 * 15);
    }
  }

  async download(fileMetadataId: string): Promise<Result<string>> {
    const meta = await this.repository.getFileMetadata(fileMetadataId);
    if (!meta.success) return meta;

    if (meta.data.visibility === 'PUBLIC') {
      return this.repository.getPublicUrl(fileMetadataId);
    } else {
      return this.repository.getSignedUrl(fileMetadataId, 60 * 60); // 1 hour for download
    }
  }
}
