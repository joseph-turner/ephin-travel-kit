# Ephin Travel Kit - Sanity CMS Studio

This is the **Sanity Content Studio** for the Ephin Travel Kit, a modern travel website built with Next.js and Sanity CMS. The studio provides a real-time content editing environment with live preview functionality.

## 🏗️ Project Structure

This Sanity Studio is part of a **Turborepo monorepo** setup:

- **`apps/web`**: Next.js 15 frontend (port 3001) with cinematic travel design
- **`apps/sanity`**: This Sanity Studio (port 3333)
- **`apps/docs`**: Documentation site
- **`packages/ui`**: Shared React components
- **`packages/*-config`**: Shared configurations

## 🎯 Content Types

### Documents

- **`page`**: Landing pages and static content with PageBuilder support
- **`post`**: Blog posts and travel stories
- **`person`**: Author profiles and team members

### Objects

- **`blockContent`**: Rich text content with custom formatting
- **`callToAction`**: Reusable CTA components
- **`infoSection`**: Content blocks for page building
- **`link`**: Internal and external link references

### Singletons

- **`settings`**: Global site configuration and metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ (managed by Volta)
- pnpm package manager (required)
- Sanity account and project setup

### Development Setup

1. **Start the entire development environment** (from repo root):

   ```bash
   pnpm dev
   ```

   This starts all apps including:
   - Web app: <http://localhost:3001>
   - Sanity Studio: <http://localhost:3333>
   - Docs: <http://localhost:3000>

2. **Start only Sanity Studio** (from this directory):

   ```bash
   pnpm dev
   ```

3. **Type Generation**: After schema changes, regenerate types:

   ```bash
   pnpm typegen  # From web app directory
   ```

### Environment Configuration

Set up your environment variables in the web app's `.env.local`:

```env
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="http://localhost:3001"
```

## ✨ Features

### Live Preview Integration

- **Real-time updates**: Content changes reflect immediately in the web app
- **Page Builder**: Modular content blocks with visual editing
- **Draft previews**: Preview unpublished content before going live

### Enhanced Editing Experience

- **Unsplash integration**: Search and insert images directly from Unsplash
- **AI Assist**: Sanity Assist for content generation and editing help
- **Vision tool**: Query testing and development interface
- **Custom structure**: Organized content tree for better navigation

### Content Management

- **Rich text editing**: Custom portable text components
- **Image optimization**: Automatic image processing and CDN delivery
- **SEO-friendly**: Meta tags and Open Graph configuration
- **Internationalization ready**: Schema designed for multi-language support

## 🛠️ Development Commands

```bash
# Development
pnpm dev                # Start development server
pnpm start             # Start production server

# Building & Deployment
pnpm build             # Build for production
pnpm deploy            # Deploy studio to Sanity hosting

# Type Safety
pnpm extract-types     # Extract schema types
pnpm type-check        # TypeScript type checking

# Code Quality
pnpm lint              # Lint code
pnpm lint:fix          # Fix linting issues
```

## 📁 Key Files

- **`sanity.config.ts`**: Main studio configuration
- **`src/schemaTypes/`**: Content schema definitions
- **`src/structure/`**: Custom studio structure
- **`sanity.cli.ts`**: CLI configuration

### Folder Structure

```text
apps/sanity/
├── README.md                    # This documentation
├── package.json                 # Dependencies and scripts
├── sanity.config.ts             # Main studio configuration
├── sanity.cli.ts                # CLI configuration
├── sanity-typegen.json          # Type generation config
├── schema.json                  # Generated schema definitions
├── tsconfig.json                # TypeScript configuration
├── eslint.config.js             # ESLint configuration
├── .env                         # Environment variables (local)
├── .env.example                 # Environment template
├── sample-data.tar.gz           # Sample content data
├── src/
│   ├── lib/
│   │   └── initialValues.ts     # Default field values
│   ├── schemaTypes/
│   │   ├── index.ts             # Schema type exports
│   │   ├── documents/           # Main content types
│   │   │   ├── page.ts          # Landing pages
│   │   │   ├── post.ts          # Blog posts/articles
│   │   │   └── person.ts        # Author profiles
│   │   ├── objects/             # Reusable content blocks
│   │   │   ├── blockContent.ts  # Rich text content
│   │   │   ├── callToAction.ts  # CTA components
│   │   │   ├── infoSection.ts   # Page builder blocks
│   │   │   └── link.ts          # Link references
│   │   └── singletons/          # Global settings
│   │       └── settings.tsx     # Site configuration
│   └── structure/
│       └── index.ts             # Custom studio navigation
└── static/
    └── page-builder-thumbnails/ # PageBuilder preview images
        ├── callToAction.webp    # CTA block thumbnail
        └── infoSection.webp     # Info section thumbnail
```

## 🔗 Integration with Web App

The Sanity Studio is tightly integrated with the Next.js web app:

- **Type generation**: Schemas generate TypeScript types for the web app
- **Live queries**: Real-time content updates using `sanityFetch`
- **Preview mode**: Draft content preview in the web app
- **Image optimization**: Sanity CDN integration for optimized images

## 📚 Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Studio Configuration](https://www.sanity.io/docs/configuration)
- [Community Slack](https://slack.sanity.io/)

## 🎨 Design Integration

This CMS supports the **cinematic travel aesthetic** of the Ephin Travel Kit:

- **Page Builder**: Modular sections for creating immersive travel content
- **Rich media support**: High-quality image handling for travel photography
- **Typography controls**: Support for display fonts and editorial styling
- **SEO optimization**: Travel-focused metadata and social sharing

For more information about the overall project architecture, see the main project README.Clean Content Studio
