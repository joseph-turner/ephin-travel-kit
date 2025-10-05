import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './lib/utils';

const buttonVariants = cva(
  'ui:inline-flex ui:items-center ui:justify-center ui:gap-2 ui:whitespace-nowrap ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-1 focus-visible:ui:ring-neutral-950 disabled:ui:pointer-events-none disabled:ui:opacity-50 [&_svg]:ui:pointer-events-none [&_svg]:ui:size-4 [&_svg]:ui:shrink-0 dark:focus-visible:ui:ring-neutral-300',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'ui:h-9 ui:px-4 ui:py-2',
        icon: 'ui:h-9 ui:w-9',
        lg: 'ui:h-10 ui:rounded-md ui:px-8',
        sm: 'ui:h-8 ui:rounded-md ui:px-3 ui:text-xs',
      },
      variant: {
        default:
          'ui:bg-neutral-900 ui:text-neutral-50 ui:shadow hover:ui:bg-neutral-900/90 dark:ui:bg-neutral-50 dark:ui:text-neutral-900 dark:hover:ui:bg-neutral-50/90',
        destructive:
          'ui:bg-red-500 ui:text-neutral-50 ui:shadow-sm hover:ui:bg-red-500/90 dark:ui:bg-red-900 dark:ui:text-neutral-50 dark:hover:ui:bg-red-900/90',
        ghost:
          'hover:ui:bg-neutral-100 hover:ui:text-neutral-900 dark:hover:ui:bg-neutral-800 dark:hover:ui:text-neutral-50',
        link: 'ui:text-neutral-900 ui:underline-offset-4 hover:ui:underline dark:ui:text-neutral-50',
        outline:
          'ui:border ui:border-neutral-200 ui:bg-white ui:shadow-sm hover:ui:bg-neutral-100 hover:ui:text-neutral-900 dark:ui:border-neutral-800 dark:ui:bg-neutral-950 dark:hover:ui:bg-neutral-800 dark:hover:ui:text-neutral-50',
        secondary:
          'ui:bg-neutral-100 ui:text-neutral-900 ui:shadow-sm hover:ui:bg-neutral-100/80 dark:ui:bg-neutral-800 dark:ui:text-neutral-50 dark:hover:ui:bg-neutral-800/80',
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
