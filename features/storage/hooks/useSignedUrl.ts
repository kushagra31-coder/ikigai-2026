import { useState, useEffect } from 'react';
import { getStorageService } from '../service';

const cache = new Map<string, { url: string; expiresAt: number }>();

export function useSignedUrl(fileMetadataId: string | null | undefined, expiresIn: number = 3600) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fileMetadataId) {
      // eslint-disable-next-line
      setUrl(null);
      return;
    }

    const cached = cache.get(fileMetadataId);
    if (cached && cached.expiresAt > Date.now() + 60000) { // Valid for at least 1 more minute
      setUrl(cached.url);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    const fetchUrl = async () => {
      const service = getStorageService();
      const result = await service.createSignedUrl(fileMetadataId, expiresIn);
      
      if (isMounted) {
        if (result.success) {
          setUrl(result.data);
          cache.set(fileMetadataId, {
            url: result.data,
            expiresAt: Date.now() + expiresIn * 1000
          });
        } else {
          setUrl(null);
        }
        setIsLoading(false);
      }
    };

    fetchUrl();

    return () => {
      isMounted = false;
    };
  }, [fileMetadataId, expiresIn]);

  return { url, isLoading };
}
