'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ephin-travel-kit/ui/avatar';
import { Button } from '@ephin-travel-kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ephin-travel-kit/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ephin-travel-kit/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@ephin-travel-kit/ui/navigation-menu';

const navigationLinks = [
  { href: '/trips', label: 'Trips' },
  { href: '/gear', label: 'Gear' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

interface HeaderProps {
  user?:
    | {
        email?: string | null;
        image?: string | null;
        name?: string | null;
      }
    | null;
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          aria-label="Toggle navigation menu"
          className="lg:hidden"
          size="icon"
          variant="ghost"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Navigation</DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col space-y-4">
          {navigationLinks.map((link) => (
            <Link
              className="text-lg font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-50"
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}

function UserMenu({ user }: Readonly<{ user: HeaderProps['user'] }>) {
  if (!user) {
    return (
      <Button asChild size="sm" variant="default">
        <Link href="/auth/signin">Sign in</Link>
      </Button>
    );
  }

  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() ??
    user.email?.[0]?.toUpperCase() ??
    'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open user menu"
          className="relative h-9 w-9 rounded-full"
          size="icon"
          variant="ghost"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              alt={user.name ?? user.email ?? 'User'}
              src={user.image ?? ''}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/signout">Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ user }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          aria-label="Home"
          className="flex items-center space-x-2"
          href="/"
        >
          <Image
            alt="Ephin Travel Kit"
            height={32}
            priority
            src="/logo.svg"
            width={96}
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: User menu or sign in */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex">
            <UserMenu user={user} />
          </div>

          {/* Mobile navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
