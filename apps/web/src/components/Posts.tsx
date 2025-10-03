import { createDataAttribute } from 'next-sanity';
import Link from 'next/link';

import type { AllPostsQueryResult } from '~/sanity.types';

import Avatar from '@/components/Avatar';
import DateComponent from '@/components/Date';
import OnBoarding from '@/components/Onboarding';
import { sanityFetch } from '@/lib/sanity/live';
import { allPostsQuery, morePostsQuery } from '@/lib/sanity/queries';

type PostType = AllPostsQueryResult[number];

const Post = ({ post }: { post: PostType }) => {
  const { _id, author, date, excerpt, slug, title } = post;

  const attr = createDataAttribute({
    id: _id,
    path: 'title',
    type: 'post',
  });

  return (
    <article
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
      data-sanity={attr()}
      key={_id}
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/posts/${slug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <h3 className="text-2xl font-bold mb-4 leading-tight">{title}</h3>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
          {excerpt}
        </p>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {author && author.firstName && author.lastName && (
          <div className="flex items-center">
            <Avatar person={author} small={true} />
          </div>
        )}
        <time className="text-gray-500 text-xs font-mono" dateTime={date}>
          <DateComponent dateString={date} />
        </time>
      </div>
    </article>
  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
    )}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
);

export const MorePosts = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: string;
}) => {
  const { data } = await sanityFetch({
    params: { limit, skip },
    query: morePostsQuery,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Posts
      heading="Recent Posts"
      subHeading={`${data.length === 1 ? 'This blog post is' : `These ${data.length} blog posts are`} populated from your Sanity Studio.`}
    >
      {data.map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};
