import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '@/lib/sanity/api';

import { token } from './token';

export const client = createClient({
  apiVersion,
  dataset,
  perspective: 'published',
  projectId,
  stega: {
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true;
      }

      return props.filterDefault(props);
    },
    studioUrl,
  },
  token, // Required if you have a private dataset
  useCdn: true,
});
