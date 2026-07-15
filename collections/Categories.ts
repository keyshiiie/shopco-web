// collections/Categories.ts
import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
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
      label: 'Название категории',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL-адрес (slug)',
      admin: {
        description: 'Например: "mens-clothing"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание категории',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение категории',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories' as any,
      label: 'Родительская категория',
      admin: {
        description: 'Для создания иерархии категорий',
      },
    },
  ],
};