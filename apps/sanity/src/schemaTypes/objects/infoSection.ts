import { TextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const infoSection = defineType({
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  icon: TextIcon,
  name: 'infoSection',
  preview: {
    prepare({ title }) {
      return {
        subtitle: 'Info Section',
        title: title ?? 'Untitled Info Section',
      };
    },
    select: {
      subtitle: 'subheading',
      title: 'heading',
    },
  },
  title: 'Info Section',
  type: 'object',
});
