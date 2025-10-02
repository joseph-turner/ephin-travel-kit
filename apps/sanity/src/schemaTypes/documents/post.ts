import { DocumentTextIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const post = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: 'A slug is required for the post to show up in the preview',
      name: 'slug',
      options: {
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        maxLength: 96,
        source: 'title',
      },
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      fields: [
        {
          description: 'Important for SEO and accessibility.',
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        },
      ],
      name: 'coverImage',
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
        },
        hotspot: true,
      },
      title: 'Cover Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      initialValue: () => new Date().toISOString(),
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      to: [{ type: 'person' }],
      type: 'reference',
    }),
  ],
  icon: DocumentTextIcon,
  name: 'post',
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    prepare({ authorFirstName, authorLastName, date, media, title }) {
      const subtitles = [
        authorFirstName &&
          authorLastName &&
          `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return { media, subtitle: subtitles.join(' '), title };
    },
    select: {
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
      title: 'title',
    },
  },
  title: 'Post',
  type: 'document',
});
