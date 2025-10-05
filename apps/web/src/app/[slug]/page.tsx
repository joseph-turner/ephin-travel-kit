import type { Metadata } from 'next';

import Head from 'next/head';

import type { GetPageQueryResult } from '~/sanity.types';

import { PageOnboarding } from '@/components/Onboarding';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/lib/sanity/live';
import { getPageQuery, pagesSlugs } from '@/lib/sanity/queries';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    params,
    query: getPageQuery,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    description: page?.heading,
    title: page?.name,
  } satisfies Metadata;
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    query: pagesSlugs,
    stega: false,
  });
  return data;
}

export default async function Page(props: Readonly<Props>) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ params, query: getPageQuery }),
  ]);

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    );
  }

  return (
    <main className="my-12 lg:my-24 max-w-6xl mx-auto px-4">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {page.heading}
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </main>
  );
}
