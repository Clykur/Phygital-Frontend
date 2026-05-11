import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'features',
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'about',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'contact',
    }),
  ],
})
