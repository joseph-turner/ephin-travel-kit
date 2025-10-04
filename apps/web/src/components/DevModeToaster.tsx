'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface DevModeToasterProps {
  isDevMode: boolean;
  isDraftMode: boolean;
}

export default function DevModeToaster({
  isDevMode,
  isDraftMode,
}: DevModeToasterProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Only show the dev mode toaster if we're in dev mode but NOT in draft mode
    if (isDevMode && !isDraftMode) {
      const toastId = toast('Development Mode', {
        action: {
          label: 'Enable Draft Mode',
          onClick: () => {
            // Enable draft mode and redirect to current page
            const currentUrl =
              window.location.pathname + window.location.search;
            const enableUrl = `/api/draft-mode/enable-simple?secret=test-secret&redirect=${encodeURIComponent(currentUrl)}`;
            window.location.href = enableUrl;
          },
        },
        description: 'Enable draft mode to preview unpublished content',
        duration: Infinity,
        id: 'dev-mode-toast', // Prevent duplicate toasts
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [isDevMode, isDraftMode, pathname]);

  return null;
}
