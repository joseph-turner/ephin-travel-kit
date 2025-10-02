import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

import * as demo from '../../lib/initialValues';

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  fields: [
    defineField({
      description: 'This field is the title of your blog.',
      initialValue: demo.title,
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: 'Used on the Homepage',
      initialValue: demo.description,
      name: 'description',
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                fields: [
                  defineField({
                    initialValue: 'href',
                    name: 'linkType',
                    options: {
                      layout: 'radio',
                      list: [
                        { title: 'URL', value: 'href' },
                        { title: 'Page', value: 'page' },
                        { title: 'Post', value: 'post' },
                      ],
                    },
                    title: 'Link Type',
                    type: 'string',
                  }),
                  defineField({
                    hidden: ({ parent }) =>
                      parent?.linkType !== 'href' && parent?.linkType != null,
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'href' && !value) {
                          return 'URL is required when Link Type is URL';
                        }
                        return true;
                      }),
                  }),
                  defineField({
                    hidden: ({ parent }) => parent?.linkType !== 'page',
                    name: 'page',
                    title: 'Page',
                    to: [{ type: 'page' }],
                    type: 'reference',
                    validation: (Rule) =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'page' && !value) {
                          return 'Page reference is required when Link Type is Page';
                        }
                        return true;
                      }),
                  }),
                  defineField({
                    hidden: ({ parent }) => parent?.linkType !== 'post',
                    name: 'post',
                    title: 'Post',
                    to: [{ type: 'post' }],
                    type: 'reference',
                    validation: (Rule) =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'post' && !value) {
                          return 'Post reference is required when Link Type is Post';
                        }
                        return true;
                      }),
                  }),
                  defineField({
                    initialValue: false,
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                  }),
                ],
                name: 'link',
                title: 'Link',
                type: 'object',
              },
            ],
            decorators: [],
          },
          options: {},
          styles: [],
          type: 'block',
        }),
      ],
      title: 'Description',
      type: 'array',
    }),
    defineField({
      description: 'Displayed on social cards and search engine results.',
      fields: [
        defineField({
          description: 'Important for accessibility and SEO.',
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        }),
        defineField({
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
          name: 'metadataBase',
          type: 'url',
        }),
      ],
      name: 'ogImage',
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
        },
        hotspot: true,
      },
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
  icon: CogIcon,
  name: 'settings',
  preview: {
    prepare() {
      return {
        title: 'Settings',
      };
    },
  },
  title: 'Settings',
  type: 'document',
});
