import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'user', 'rating', 'isApproved', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      // Используем (user as any) для доступа к role
      if (user && (user as any).role === 'admin') return true
      return {
        user: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user && (user as any).role === 'admin') return true
      return {
        user: {
          equals: user?.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок отзыва',
      admin: {
        placeholder: 'Например: "Отличный магазин!"',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Текст отзыва',
      admin: {
        placeholder: 'Поделитесь своим опытом...',
        rows: 4,
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      label: 'Оценка',
      min: 1,
      max: 5,
      admin: {
        step: 1,
        description: 'Оценка от 1 до 5 звезд',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Автор отзыва',
      admin: {
        description: 'Пользователь, оставивший отзыв',
      },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Одобрен',
      defaultValue: false,
      admin: {
        description: 'Отображать отзыв на сайте',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Фотографии в отзыве',
      admin: {
        description: 'Дополнительные фото к отзыву (необязательно)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      label: 'Дата создания',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      defaultValue: () => new Date(),
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req?.user && !data?.user) {
          data.user = req.user.id
        }
        return data
      },
    ],
  },
}