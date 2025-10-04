import React from 'react';

import Cta from '@/components/Cta';
import Info from '@/components/InfoSection';
import { dataAttr } from '@/lib/sanity/utils';

interface BlockProps {
  block: BlockType;
  index: number;
  pageId: string;
  pageType: string;
}

type BlocksType = Record<string, React.FC<any>>;

interface BlockType {
  _key: string;
  _type: string;
}

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
}: Readonly<BlockProps>) {
  // Block does exist
  const BlockComponent = Blocks[block._type];
  if (BlockComponent) {
    return (
      <div
        data-sanity={dataAttr({
          id: pageId,
          path: `pageBuilder[_key=="${block._key}"]`,
          type: pageType,
        }).toString()}
        key={block._key}
      >
        {React.createElement(BlockComponent, {
          block,
          index,
          key: block._key,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key },
  );
}
