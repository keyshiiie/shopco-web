import type { CollectionConfig } from "payload";

export const Styles: CollectionConfig = {
    slug: 'styles',
    admin: {
        useAsTitle: 'name',
        group: 'Товары',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Название стиля',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'URL-адрес (slug)',
            admin: {
                description: 'Например: "Casual, formal, party, gum"',
            },
        },
        {
        name: 'description',
        type: 'textarea',
        label: 'Описание стиля',
        },
        {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Изображение стиля',
        },
        {
        name: 'parent',
        type: 'relationship',
        relationTo: 'styles' as any,
        label: 'Родительский стиль',
        admin: {
            description: 'Для создания иерархии стилей',
        },
    },
  ],
};