import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  name: 'blockContent',
  of: [
    defineArrayMember({
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
      },
      type: 'block',
    }),
  ],
  title: 'Block Content',
  type: 'array',
});
