import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Overrides the title tag for this page. Recommended to keep under 60 characters.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value && value.length > 60) {
            return 'Warning: Title is over 60 characters. Google typically displays 50-60 characters, but longer titles may be used for specific SEO strategies.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Important for search engines and social sharing. Recommended to keep under 155 characters.',
      validation: (rule) =>
        rule.max(160).warning('Description should be under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Used when sharing on social media. Important for accessibility and SEO.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      media: 'ogImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'SEO Settings',
        media,
      };
    },
  },
});
