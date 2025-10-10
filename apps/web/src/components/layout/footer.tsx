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
    <footer className="bg-secondary border-t border-primary/10">
      <div className="container mx-auto px-6 py-16">
        {/* Top section: Logo + Tagline */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <Link
            aria-label="Home"
            className="flex items-center space-x-2"
            href="/"
          >
            <Image
              alt="Ephin Travel Kit"
              className="brightness-0"
              height={32}
              src="/logo.svg"
              width={96}
            />
          </Link>

          {/* Tagline */}
          <p className="font-display text-xl text-primary/80 max-w-md">
            Crafting intentional journeys for the mindful explorer.
          </p>

          {/* Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          >
            {navigationLinks.map((link) => (
              <Link
                className="font-sans text-sm font-medium text-primary/70 transition-colors hover:text-accent relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section: Copyright + Social Links */}
        <div className="mt-12 flex flex-col items-center justify-between space-y-6 border-t border-primary/10 pt-8 lg:flex-row lg:space-y-0">
          {/* Copyright */}
          <p className="text-center text-sm text-primary/60 lg:text-left">
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
    <div className="flex items-center space-x-6">
      <span className="sr-only">Follow us on social media</span>
      {socialLinks.map((social) => (
        <Link
          aria-label={social.label}
          className="text-primary/60 transition-colors hover:text-accent"
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
