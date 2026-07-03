import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Middleware runs on the Edge runtime — check env at evaluation time
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const IS_MOCKED = !SUPABASE_URL || SUPABASE_URL.trim() === '' || SUPABASE_URL === 'undefined';

export async function middleware(request: NextRequest) {
  // If no Supabase config, allow all traffic through (mock/dev mode)
  if (IS_MOCKED) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session and protect /workspace routes
  const { data: { user } } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith('/workspace') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
