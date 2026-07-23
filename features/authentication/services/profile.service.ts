import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/auth.types';

export class ProfileService {
  static async getProfile(authId: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*, tracks(name)')
      .eq('id', authId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data as Profile | null;
  }
}
