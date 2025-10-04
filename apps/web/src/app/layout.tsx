import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { toPlainText } from 'next-sanity';
import '@ephin-travel-kit/ui/styles.css';

import './globals.css';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Geist } from 'next/font/google';
import { cookies, draftMode } from 'next/headers';
import { Toaster } from 'sonner';

import DevModeToaster from '../components/DevModeToaster';
import DraftModeToast from '../components/DraftModeToaster';
import { handleError } from '../lib/sanity/client-utils';
import { sanityFetch, SanityLive } from '../lib/sanity/live';
import { settingsQuery } from '../lib/sanity/queries';
import { resolveOpenGraphImage } from '../lib/sanity/utils';

const geist = Geist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['100', '400', '800'],
});

export async function metadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  const title = settings?.title ?? 'Ephin Travel Kit';
  const description = toPlainText(
    settings?.description ?? 'An awesome travel kit',
  );

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: undefined | URL;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings?.metadataBase ?? '')
      : undefined;
  } catch {
    // noop
  }

  return {
    description,
    metadataBase,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { isEnabled: isDraftMode } = await draftMode();
  const cookieStore = await cookies();
  const isDevMode = cookieStore.get('isDevMode')?.value === 'true';

  console.log('Draft Mode:', isDraftMode);
  console.log('Dev Mode:', isDevMode);
  console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Has Read Token:', !!process.env.SANITY_API_READ_TOKEN);

  return (
    <html lang="en">
      <body className={geist.className}>
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        {/* Show dev mode toaster if in dev mode but not draft mode */}
        <DevModeToaster isDevMode={isDevMode} isDraftMode={isDraftMode} />
        {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
        <SanityLive onError={handleError} />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
