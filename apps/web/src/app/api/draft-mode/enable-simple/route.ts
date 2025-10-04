import type { NextRequest } from 'next/server';

import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const redirect = searchParams.get('redirect') || '';

  // Simple secret check for local testing (timing attack warning disabled for development)
  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (secret !== 'test-secret') {
    return new NextResponse('Invalid secret', { status: 401 });
  }

  // Enable draft mode
  (await draftMode()).enable();

  // Redirect to specified page or home page
  const redirectUrl = redirect ? decodeURIComponent(redirect) : '/';
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
