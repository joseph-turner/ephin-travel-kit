import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const person = defineType({
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      fields: [
        defineField({
          description: 'Important for SEO and accessibility.',
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        }),
      ],
      name: 'picture',
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
        },
        hotspot: true,
      },
      title: 'Picture',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
  icon: UserIcon,
  name: 'person',
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    prepare(selection) {
      return {
        media: selection.picture,
        subtitle: 'Person',
        title: `${selection.firstName} ${selection.lastName}`,
      };
    },
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
    },
  },
  title: 'Person',
  type: 'document',
});
