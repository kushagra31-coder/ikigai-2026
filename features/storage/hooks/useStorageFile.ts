import { useState, useEffect } from 'react';
import { getStorageService } from '../service';
import { FileMetadata } from '../../../types/storage';
import { useSignedUrl } from './useSignedUrl';

export function useStorageFile(fileMetadataId: string | null | undefined) {
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  // We only fetch signed URL if visibility is PRIVATE, but since we don't know visibility 
  // until we fetch metadata, we'll wait for metadata first.
  const signedUrlResult = useSignedUrl(metadata?.visibility === 'PRIVATE' ? fileMetadataId : null);

  useEffect(() => {
    if (!fileMetadataId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMetadata(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPublicUrl(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    const fetchMetadata = async () => {
      const service = getStorageService();
      
      const result = await service.list({ id: fileMetadataId });
      
      if (isMounted) {
        if (result.success && result.data.length > 0) {
          const meta = result.data[0];
          setMetadata(meta);
          
          if (meta.visibility === 'PUBLIC') {
            const urlResult = await service.createPublicUrl(meta.id);
            if (urlResult.success) {
              setPublicUrl(urlResult.data);
            }
          }
        } else {
          setMetadata(null);
        }
        setIsLoading(false);
      }
    };

    fetchMetadata();

    return () => {
      isMounted = false;
    };
  }, [fileMetadataId]);

  const url = metadata?.visibility === 'PUBLIC' ? publicUrl : signedUrlResult.url;
  const isUrlLoading = metadata?.visibility === 'PUBLIC' ? isLoading : (isLoading || signedUrlResult.isLoading);

  return { metadata, url, isLoading: isUrlLoading };
}
