# Layout Components

This directory contains layout-related components for the Ephin Travel Kit web application.

## Header Component

The Header component serves as the global navigation bar for the application.

### Features

- **Responsive Design**: Adapts between desktop and mobile layouts
- **Authentication Aware**: Displays different UI based on user authentication state
- **Accessible**: Full keyboard navigation and ARIA labels
- **Sticky Positioning**: Stays at the top of the page when scrolling

### Usage

```tsx
import { Header } from '@/components/layout';

// Guest user (shows "Sign in" button)
<Header />

// Authenticated user (shows avatar dropdown)
<Header user={{
  name: "John Doe",
  email: "john@example.com",
  image: "/avatar.jpg"
}} />
```

### Props

```typescript
interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}
```

### Navigation Links

The header includes links to:
- Trips (`/trips`)
- Gear (`/gear`)
- Blog (`/blog`)
- About (`/about`)

To modify navigation links, edit the `navigationLinks` array in `header.tsx`.

### Desktop Layout

- Left: App logo (links to home)
- Center: Navigation menu
- Right: User menu or "Sign in" button

### Mobile Layout

- Left: App logo
- Right: Hamburger menu button (opens mobile navigation dialog)

### Integration with NextAuth

To integrate with NextAuth for session management:

```tsx
import { getServerSession } from 'next-auth';
import { Header } from '@/components/layout';

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <Header user={session?.user} />
        {children}
      </body>
    </html>
  );
}
```

### Styling

The Header uses Tailwind CSS v4 with the `ui:` prefix convention for UI package components. It follows shadcn/ui v3 styling patterns.

### Dependencies

- `@radix-ui/react-navigation-menu` - Desktop navigation
- `@radix-ui/react-dialog` - Mobile navigation modal
- `@radix-ui/react-dropdown-menu` - User menu
- `@radix-ui/react-avatar` - User avatar
- `lucide-react` - Icons
- `next/link` - Client-side navigation
- `next/image` - Optimized images
