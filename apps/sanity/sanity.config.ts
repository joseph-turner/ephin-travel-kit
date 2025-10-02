/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import {
  defineDocuments,
  defineLocations,
  type DocumentLocation,
  presentationTool,
} from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './src/schemaTypes';
import { structure } from './src/structure';

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

// Define the home location for the presentation tool
const homeLocation = {
  href: '/',
  title: 'Home',
} satisfies DocumentLocation;

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'post':
      return slug ? `/posts/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

// Main Sanity configuration
export default defineConfig({
  dataset,
  name: 'default',

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          page: defineLocations({
            resolve: (doc) => ({
              locations: [
                {
                  href: resolveHref('page', doc?.slug)!,
                  title: doc?.name || 'Untitled',
                },
              ],
            }),
            select: {
              name: 'name',
              slug: 'slug.current',
            },
          }),
          post: defineLocations({
            resolve: (doc) => ({
              locations: [
                {
                  href: resolveHref('post', doc?.slug)!,
                  title: doc?.title || 'Untitled',
                },
                {
                  href: '/',
                  title: 'Home',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
            select: {
              slug: 'slug.current',
              title: 'title',
            },
          }),
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
        },
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            filter: `_type == "settings" && _id == "siteSettings"`,
            route: '/',
          },
          {
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
            route: '/:slug',
          },
          {
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
            route: '/posts/:slug',
          },
        ]),
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],
  projectId,

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },

  title: 'Sanity + Next.js Starter Template',
});
