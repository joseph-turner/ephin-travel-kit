'use client';

import type { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

export function Providers({
  children,
  session,
}: Readonly<PropsWithChildren<{ session: any }>>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
