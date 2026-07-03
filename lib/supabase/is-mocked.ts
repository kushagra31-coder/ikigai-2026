/**
 * Single source of truth for detecting if Supabase is configured.
 * Next.js inlines NEXT_PUBLIC_* at build time so we check at module level.
 * This is evaluated once and tree-shaken correctly by Turbopack.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const IS_MOCKED = !SUPABASE_URL || SUPABASE_URL.trim() === '' || SUPABASE_URL === 'undefined';
