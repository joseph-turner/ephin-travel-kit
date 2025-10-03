import Link from 'next/link';
import { PropsWithChildren } from 'react';

import type { Link as LinkType } from '~/sanity.types';

import { linkResolver } from '@/lib/sanity/utils';

interface ResolvedLinkProps extends PropsWithChildren {
  className?: string;
  link: LinkType | undefined;
}

export default function ResolvedLink({
  children,
  className,
  link,
}: Readonly<ResolvedLinkProps>) {
  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link);

  if (typeof resolvedLink === 'string') {
    return (
      <Link
        className={className}
        href={resolvedLink}
        rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
        target={link?.openInNewTab ? '_blank' : undefined}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
