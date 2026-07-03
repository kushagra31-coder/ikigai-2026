import { useState, useCallback } from 'react';
import { getStorageService } from '../service';
import { UploadOptions, FileMetadata, StorageError } from '../../../types/storage';

interface UseUploadResult {
  upload: (file: File, options: UploadOptions, userId: string) => Promise<FileMetadata | null>;
  replace: (fileMetadataId: string, file: File) => Promise<FileMetadata | null>;
  isUploading: boolean;
  error: StorageError | null;
  progress: number;
}

export function useUpload(): UseUploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<StorageError | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file: File, options: UploadOptions, userId: string) => {
    setIsUploading(true);
    setError(null);
    setProgress(0); // Progress tracking could be added via Supabase client events if supported

    try {
      const service = getStorageService();
      
      // Fast validation before upload starts
      const validation = service.validate(file, options.bucket);
      if (!validation.success) {
        throw validation.error;
      }

      setProgress(50); // Fake progress
      
      const result = await service.upload(file, options, userId);
      
      if (!result.success) {
        throw result.error;
      }
      
      setProgress(100);
      return result.data;
    } catch (err) {
      const storageError = err instanceof StorageError ? err : new StorageError('Upload failed', 'UPLOAD_FAILED', false, err);
      setError(storageError);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const replace = useCallback(async (fileMetadataId: string, file: File) => {
    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      const service = getStorageService();
      setProgress(50);
      
      const result = await service.replace(fileMetadataId, file);
      
      if (!result.success) {
        throw result.error;
      }
      
      setProgress(100);
      return result.data;
    } catch (err) {
      const storageError = err instanceof StorageError ? err : new StorageError('Replace failed', 'UPLOAD_FAILED', false, err);
      setError(storageError);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, replace, isUploading, error, progress };
}
