# Ephin Travel Kit - AI Coding Instructions

This is a **Turborepo monorepo** with Next.js apps and Sanity CMS integration. Follow these patterns when working in this codebase.

## Project Architecture

### Monorepo Structure

- **`apps/web`**: Main Next.js frontend (port 3001) - customer-facing travel site
- **`apps/sanity`**: Sanity Studio CMS for content management
- **`apps/docs`**: Documentation site (Next.js + Tailwind)
- **`packages/ui`**: Shared React components with `ui:` class prefix
- **`packages/*-config`**: Shared configurations (ESLint, TypeScript, Tailwind)

### Key Dependencies & Task Flow

- **Package manager**: `pnpm` (required - see `packageManager` in root package.json)
- **Build system**: Turborepo with dependency-aware task running
- **Critical task sequence**: `typegen` → `build` (Sanity types must generate before building)

## Development Workflows

### Starting Development

```bash
# From root - starts all apps concurrently
pnpm dev

# Individual apps
cd apps/web && pnpm dev      # Port 3001 with Turbopack
cd apps/sanity && pnpm dev   # Sanity Studio
```

### Type Generation (Critical)

Always run `pnpm typegen` after Sanity schema changes:

- Generates `sanity.types.ts` in web app
- Required before building or type-checking
- Turborepo handles this dependency automatically

## Sanity CMS Integration Patterns

### Data Fetching

- Use `sanityFetch` from `@/lib/sanity/live` for queries with live preview
- Queries in `@/lib/sanity/queries.ts` use `defineQuery` from `next-sanity`
- Client configuration in `@/lib/sanity/client.ts` with Stega integration

### Content Types

- **Documents**: `page`, `post`, `person` (in `apps/sanity/src/schemaTypes/documents/`)
- **Objects**: `blockContent`, `callToAction`, `infoSection`, `link`
- **Singletons**: `settings`
- Schema defined in `apps/sanity/src/schemaTypes/index.ts`

### Live Preview

- Uses `useOptimistic` hook for real-time Studio updates
- `createDataAttribute` for edit overlays (see `Posts.tsx`)
- PageBuilder pattern for modular content blocks

## Component & Styling Conventions

### UI Package Components

- All classes prefixed with `ui:` to avoid conflicts
- Example: `ui:rounded-lg ui:border ui:px-5`
- Import from `@ephin-travel-kit/ui` workspace package

### Web App Components

- Located in `apps/web/src/components/`
- Use regular Tailwind classes (no prefix)
- Server Components by default, mark Client Components with `'use client'`

### Page Builder Pattern

- Modular content blocks in `PageBuilder.tsx`
- Uses `BlockRenderer.tsx` for rendering different block types
- Supports real-time editing with `useOptimistic`

## File Organization

### Import Paths

- Use `@/` alias for `apps/web/src/`
- Use `~/` for generated types (`~/sanity.types`)
- Workspace packages: `@ephin-travel-kit/ui`

### Content Queries

- GROQ queries in `@/lib/sanity/queries.ts`
- Common patterns: reference resolution, draft/published status
- Use `linkReference` pattern for internal linking

## Development Notes

### Type Safety

- TypeScript strict mode enabled
- Sanity schemas generate TypeScript types
- Build ignores TS errors (see `next.config.ts`) - fix this for production

### Performance

- Next.js 15 with App Router
- Turbopack for fast dev builds
- Sanity CDN enabled for production

### Key Files to Reference

- `turbo.json`: Task dependencies and caching
- `apps/web/src/lib/sanity/`: All Sanity integration logic
- `apps/sanity/src/schemaTypes/`: Content model definitions
- `packages/ui/src/`: Shared component library

## Common Tasks

- **Add new content type**: Create schema in `apps/sanity/src/schemaTypes/`, run `pnpm typegen`
- **New shared component**: Add to `packages/ui/src/`, use `ui:` prefix for classes
- **Web app component**: Add to `apps/web/src/components/`, import with `@/`
- **Update queries**: Modify `@/lib/sanity/queries.ts`, regenerate types if needed
