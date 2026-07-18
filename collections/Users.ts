import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt', 'role'],
  },
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: false,
      label: 'Имя',
      admin: {
        placeholder: 'Введите имя',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
      label: 'Фамилия',
      admin: {
        placeholder: 'Введите фамилию',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Телефон',
      admin: {
        placeholder: '+7 (999) 123-45-67',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      label: 'Роль пользователя',
      options: [
        { label: 'Пользователь', value: 'user' },
        { label: 'Администратор', value: 'admin' },
      ],
      admin: {
        description: 'Определяет права доступа пользователя',
      },
    }
  ],
}