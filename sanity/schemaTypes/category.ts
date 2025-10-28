import { defineField, defineType } from "sanity";

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'select',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: "startup" }] }]
        }),
    ],
})