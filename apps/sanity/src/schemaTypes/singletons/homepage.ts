import { HomeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Homepage',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'infoSection' }),
        defineArrayMember({ type: 'callToAction' }),
      ],
    }),
  ],
  icon: HomeIcon,
  preview: {
    select: {
      title: 'title',
    },
  },
});
