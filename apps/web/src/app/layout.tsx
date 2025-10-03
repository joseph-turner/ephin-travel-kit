import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { toPlainText } from 'next-sanity';
import { VisualEditing } from 'next-sanity/visual-editing';
import '@ephin-travel-kit/ui/styles.css';

import './globals.css';
import { Geist } from 'next/font/google';
import { draftMode } from 'next/headers';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

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
        {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
        <SanityLive onError={handleError} />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
