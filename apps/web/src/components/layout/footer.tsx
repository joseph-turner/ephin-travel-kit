import Image from 'next/image';
import Link from 'next/link';
import { siInstagram, siX, siYoutube } from 'simple-icons';

const navigationLinks = [
  { href: '/trips', label: 'Trips' },
  { href: '/gear', label: 'Gear' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const socialLinks = [
  {
    href: 'https://x.com/ephintravelkit',
    icon: siX,
    label: 'Follow us on X',
  },
  {
    href: 'https://instagram.com/ephintravelkit',
    icon: siInstagram,
    label: 'Follow us on Instagram',
  },
  {
    href: 'https://youtube.com/@ephintravelkit',
    icon: siYoutube,
    label: 'Subscribe to our YouTube channel',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50">
      <div className="container mx-auto px-4 py-12">
        {/* Top section: Logo + Navigation */}
        <div className="flex flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0">
          {/* Logo */}
          <Link
            aria-label="Home"
            className="flex items-center space-x-2"
            href="/"
          >
            <Image
              alt="Ephin Travel Kit"
              height={32}
              src="/logo.svg"
              width={96}
            />
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-end"
          >
            {navigationLinks.map((link) => (
              <Link
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section: Copyright + Social Links */}
        <div className="mt-8 flex flex-col items-center justify-between space-y-6 border-t border-neutral-200 pt-8 lg:flex-row lg:space-y-0 dark:border-neutral-800">
          {/* Copyright */}
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 lg:text-left">
            © {currentYear} Ephin Travel Kit. All rights reserved.
          </p>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center space-x-4">
      <span className="sr-only">Follow us on social media</span>
      {socialLinks.map((social) => (
        <Link
          aria-label={social.label}
          className="text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          href={social.href}
          key={social.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{social.icon.title}</title>
            <path d={social.icon.path} />
          </svg>
        </Link>
      ))}
    </div>
  );
}
