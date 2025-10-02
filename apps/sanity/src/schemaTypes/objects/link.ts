import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  fields: [
    defineField({
      initialValue: 'url',
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
      hidden: ({ parent }) => parent?.linkType !== 'href',
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
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
        // Custom validation to ensure page reference is provided if the link type is 'page'
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
        // Custom validation to ensure post reference is provided if the link type is 'post'
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
  icon: LinkIcon,
  name: 'link',
  title: 'Link',
  type: 'object',
});
