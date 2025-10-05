import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from './lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ children, className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      'ui:flex ui:cursor-default ui:select-none ui:items-center ui:rounded-sm ui:px-2 ui:py-1.5 ui:text-sm ui:outline-none focus:ui:bg-neutral-100 data-[state=open]:ui:bg-neutral-100 dark:focus:ui:bg-neutral-800 dark:data-[state=open]:ui:bg-neutral-800',
      inset && 'ui:pl-8',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ui:ml-auto ui:h-4 ui:w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'ui:z-50 ui:min-w-[8rem] ui:overflow-hidden ui:rounded-md ui:border ui:border-neutral-200 ui:bg-white ui:p-1 ui:text-neutral-950 ui:shadow-lg data-[state=open]:ui:animate-in data-[state=closed]:ui:animate-out data-[state=closed]:ui:fade-out-0 data-[state=open]:ui:fade-in-0 data-[state=closed]:ui:zoom-out-95 data-[state=open]:ui:zoom-in-95 data-[side=bottom]:ui:slide-in-from-top-2 data-[side=left]:ui:slide-in-from-right-2 data-[side=right]:ui:slide-in-from-left-2 data-[side=top]:ui:slide-in-from-bottom-2 dark:ui:border-neutral-800 dark:ui:bg-neutral-950 dark:ui:text-neutral-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        'ui:z-50 ui:min-w-[8rem] ui:overflow-hidden ui:rounded-md ui:border ui:border-neutral-200 ui:bg-white ui:p-1 ui:text-neutral-950 ui:shadow-md dark:ui:border-neutral-800 dark:ui:bg-neutral-950 dark:ui:text-neutral-50',
        'data-[state=open]:ui:animate-in data-[state=closed]:ui:animate-out data-[state=closed]:ui:fade-out-0 data-[state=open]:ui:fade-in-0 data-[state=closed]:ui:zoom-out-95 data-[state=open]:ui:zoom-in-95 data-[side=bottom]:ui:slide-in-from-top-2 data-[side=left]:ui:slide-in-from-right-2 data-[side=right]:ui:slide-in-from-left-2 data-[side=top]:ui:slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'ui:relative ui:flex ui:cursor-default ui:select-none ui:items-center ui:rounded-sm ui:px-2 ui:py-1.5 ui:text-sm ui:outline-none ui:transition-colors focus:ui:bg-neutral-100 focus:ui:text-neutral-900 data-[disabled]:ui:pointer-events-none data-[disabled]:ui:opacity-50 dark:focus:ui:bg-neutral-800 dark:focus:ui:text-neutral-50',
      inset && 'ui:pl-8',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ checked, children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      'ui:relative ui:flex ui:cursor-default ui:select-none ui:items-center ui:rounded-sm ui:py-1.5 ui:pl-8 ui:pr-2 ui:text-sm ui:outline-none ui:transition-colors focus:ui:bg-neutral-100 focus:ui:text-neutral-900 data-[disabled]:ui:pointer-events-none data-[disabled]:ui:opacity-50 dark:focus:ui:bg-neutral-800 dark:focus:ui:text-neutral-50',
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="ui:absolute ui:left-2 ui:flex ui:h-3.5 ui:w-3.5 ui:items-center ui:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="ui:h-4 ui:w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'ui:relative ui:flex ui:cursor-default ui:select-none ui:items-center ui:rounded-sm ui:py-1.5 ui:pl-8 ui:pr-2 ui:text-sm ui:outline-none ui:transition-colors focus:ui:bg-neutral-100 focus:ui:text-neutral-900 data-[disabled]:ui:pointer-events-none data-[disabled]:ui:opacity-50 dark:focus:ui:bg-neutral-800 dark:focus:ui:text-neutral-50',
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="ui:absolute ui:left-2 ui:flex ui:h-3.5 ui:w-3.5 ui:items-center ui:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon className="ui:h-2 ui:w-2 ui:fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      'ui:px-2 ui:py-1.5 ui:text-sm ui:font-semibold',
      inset && 'ui:pl-8',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={cn('ui:-mx-1 ui:my-1 ui:h-px ui:bg-neutral-100 dark:ui:bg-neutral-800', className)}
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ui:ml-auto ui:text-xs ui:tracking-widest ui:opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
