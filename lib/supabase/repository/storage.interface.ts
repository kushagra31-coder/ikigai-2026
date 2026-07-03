import { Result } from '../../../types/result';
import { FileMetadata, StorageBucket } from '../../../types/storage';

export interface IStorageRepository {
  uploadFile(
    file: File,
    bucket: StorageBucket,
    path: string,
    metadata: Omit<FileMetadata, 'id' | 'createdAt' | 'updatedAt' | 'version'>
  ): Promise<Result<FileMetadata>>;

  replaceFile(
    id: string,
    file: File,
    metadataUpdates: Partial<Omit<FileMetadata, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Result<FileMetadata>>;

  deleteFile(id: string): Promise<Result<void>>;
  
  softDeleteFile(id: string): Promise<Result<void>>;

  restoreFile(id: string): Promise<Result<FileMetadata>>;

  getFileMetadata(id: string): Promise<Result<FileMetadata>>;

  listMetadata(filters: Partial<FileMetadata>): Promise<Result<FileMetadata[]>>;

  getSignedUrl(id: string, expiresIn: number): Promise<Result<string>>;

  getPublicUrl(id: string): Promise<Result<string>>;
}
