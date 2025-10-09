'use client';

import { isCorsOriginError } from 'next-sanity';
import { toast } from 'sonner';

export function handleError(error: unknown) {
  if (isCorsOriginError(error)) {
    // If the error is a CORS origin error, let's display that specific error.
    const { addOriginUrl } = error;
    toast.error(`Sanity Live couldn't connect`, {
      action: addOriginUrl
        ? {
            label: 'Manage',
            onClick: () => window.open(addOriginUrl.toString(), '_blank'),
          }
        : undefined,
      description: `Your origin is blocked by CORS policy`,
      duration: Infinity,
    });
  } else if (error instanceof Error) {
    console.error(error);
    toast.error(error.name, { description: error.message, duration: Infinity });
  } else {
    console.error(error);
    toast.error('Unknown error', {
      description: 'Check the console for more details',
      duration: Infinity,
    });
  }
}
