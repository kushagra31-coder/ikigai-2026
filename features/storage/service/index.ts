import { createClient } from '../../../lib/supabase/client';
import { SupabaseStorageRepository } from '../../../lib/supabase/repository/storage.repository';
import { StorageService } from './storage.service';

export function getStorageService() {
  const supabase = createClient();
  // We cast to any here because createBrowserClient returns a slightly different type than the standard SupabaseClient,
  // but it implements the same interface.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const repository = new SupabaseStorageRepository(supabase as any);
  return new StorageService(repository);
}
