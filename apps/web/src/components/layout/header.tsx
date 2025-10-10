'use client';

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
} from '@ephin-travel-kit/ui/navigation-menu';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const navigationLinks = [
  { href: '/trips', label: 'Trips' },
  { href: '/gear', label: 'Gear' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

interface HeaderProps {
  user?: null | {
    email?: null | string;
    image?: null | string;
    name?: null | string;
  };
}

export function Header({ user }: Readonly<HeaderProps>) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral/80 backdrop-blur-sm border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link
          aria-label="Home"
          className="flex items-center space-x-2"
          href="/"
        >
          <Image
            alt="Ephin Travel Kit"
            className={`transition-all duration-300 ${
              isScrolled ? 'brightness-0' : 'brightness-100 invert'
            }`}
            height={32}
            priority
            src="/logo.svg"
            width={96}
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-8">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    className={`
                      font-sans text-sm font-medium transition-all duration-300
                      hover:after:w-full after:content-[''] after:absolute after:bottom-0
                      after:left-0 after:h-px after:w-0 after:bg-current after:transition-all
                      relative pb-1 ${
                        isScrolled
                          ? 'text-primary hover:text-accent'
                          : 'text-neutral hover:text-neutral/80'
                      }
                    `}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: User menu or sign in */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex">
            <UserMenu isScrolled={isScrolled} user={user} />
          </div>

          {/* Mobile navigation */}
          <MobileNav isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ isScrolled }: Readonly<{ isScrolled: boolean }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          aria-label="Toggle navigation menu"
          className={`lg:hidden ${
            isScrolled ? 'text-primary' : 'text-neutral'
          }`}
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
              className="text-lg font-medium transition-colors hover:text-accent text-primary"
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

function UserMenu({
  isScrolled,
  user,
}: Readonly<{
  isScrolled: boolean;
  user: HeaderProps['user'];
}>) {
  if (!user) {
    return (
      <Button
        asChild
        className={`${
          isScrolled
            ? 'bg-accent hover:bg-accent/90 text-neutral'
            : 'bg-neutral text-primary hover:bg-neutral/90'
        }`}
        size="sm"
        variant="default"
      >
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
