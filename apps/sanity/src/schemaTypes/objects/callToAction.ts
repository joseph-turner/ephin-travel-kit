import { BulbOutlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Button link',
      type: 'link',
    }),
  ],
  icon: BulbOutlineIcon,
  name: 'callToAction',
  preview: {
    prepare(selection) {
      const { title } = selection;

      return {
        subtitle: 'Call to Action',
        title: title,
      };
    },
    select: {
      title: 'heading',
    },
  },
  title: 'Call to Action',
  type: 'object',
  validation: (Rule) =>
    // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
    Rule.custom((fields) => {
      const { buttonText, link } = fields || {};
      if ((buttonText && link) || (!buttonText && !link)) {
        return true;
      }
      return 'Both Button text and Button link must be set, or both must be empty';
    }),
});
