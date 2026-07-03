import { useState, useCallback } from 'react';
import { getStorageService } from '../service';
import { StorageError } from '../../../types/storage';

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<StorageError | null>(null);

  const download = useCallback(async (fileMetadataId: string, customFilename?: string) => {
    setIsDownloading(true);
    setError(null);

    try {
      const service = getStorageService();
      

      const result = await service.download(fileMetadataId);
      
      if (!result.success) {
        throw result.error;
      }
      
      const url = result.data;

      // Trigger download in browser
      const link = document.createElement('a');
      link.href = url;
      // Fetch metadata to get original name
      const meta = await service.list({ id: fileMetadataId });
      let filename = customFilename || 'download';
      if (meta.success && meta.data.length > 0) {
        filename = customFilename || meta.data[0].originalName;
      }
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (err) {
      const storageError = err instanceof StorageError ? err : new StorageError('Download failed', 'SIGNED_URL_FAILED', false, err);
      setError(storageError);
      return false;
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { download, isDownloading, error };
}
