// collections/Products.ts
import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',

  access: {
    read: () => true,
    // Для остальных операций можно оставить по умолчанию
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'totalStock', 'isAvailable', 'averageRating'],
    group: 'Товары',
  },
  
  fields: [
    // ========== ОСНОВНАЯ ИНФОРМАЦИЯ ==========
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название товара',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL-адрес (slug)',
      admin: {
        description: 'Например: "krossovki-nike-air-max"',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories' as any, // 👈 добавляем as any
      label: 'Категория',
      admin: {
        description: 'Выберите категорию из списка',
      },
    },
    {
      name: 'brand',
      type: 'text',
      label: 'Бренд',
      admin: {
        description: 'Например: "Nike", "Adidas"',
      },
    },
    {
      name: 'vendorCode',
      type: 'text',
      label: 'Артикул',
      admin: {
        description: 'Для синхронизации с 1С',
      },
    },

    // ========== ОПИСАНИЕ ==========
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Краткое описание',
      admin: {
        rows: 3,
        description: 'Показывается в карточке товара и в списке',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Полное описание',
      admin: {
        description: 'Подробное описание с форматированием',
      },
    },

    // ========== ЦЕНЫ ==========
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена (₽)',
      min: 0,
    },
    {
      name: 'discountPrice',
      type: 'number',
      label: 'Цена со скидкой (₽)',
      min: 0,
      admin: {
        description: 'Если заполнено, показывается как акционная цена',
      },
    },
    // ВЫЧИСЛЯЕМОЕ: размер скидки в процентах
    {
      name: 'discountPercent',
      type: 'number',
      label: 'Размер скидки (%)',
      admin: {
        description: 'Вычисляется автоматически',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.price && data?.discountPrice && data.discountPrice < data.price) {
              return Math.round(((data.price - data.discountPrice) / data.price) * 100);
            }
            return 0;
          },
        ],
      },
    },

    // ========== ИЗОБРАЖЕНИЯ ==========
    {
      name: 'images',
      type: 'array',
      label: 'Изображения товара',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt текст',
          admin: {
            description: 'Для SEO и доступности',
          },
        },
        {
          name: 'isMain',
          type: 'checkbox',
          label: 'Основное изображение',
          defaultValue: false,
        },
      ],
    },

    // ========== ВАРИАЦИИ (РАЗМЕРЫ + ЦВЕТА) ==========
    {
      name: 'variants',
      type: 'array',
      label: 'Вариации товара',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'size',
          type: 'text',
          label: 'Размер',
          required: true,
          admin: {
            description: 'Например: "S", "M", "L", "42", "44"',
          },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Цвет',
          required: true,
          admin: {
            description: 'Например: "Красный", "Синий", "Black"',
          },
        },
        {
          name: 'colorCode',
          type: 'text',
          label: 'HEX код цвета',
          admin: {
            description: 'Например: "#FF0000" для отображения в интерфейсе',
          },
        },
        {
          name: 'stock',
          type: 'number',
          label: 'Количество на складе',
          required: true,
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Цена для этой вариации (если отличается)',
          min: 0,
          admin: {
            description: 'Оставьте пустым, чтобы использовать основную цену товара',
          },
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU (артикул вариации)',
          admin: {
            description: 'Уникальный код для каждой вариации',
          },
        },
        {
          name: 'images',
          type: 'array',
          label: 'Изображения для этой вариации',
          maxRows: 5,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // ========== ВЫЧИСЛЯЕМЫЕ ПОЛЯ ==========
    // Общий остаток (сумма всех вариаций)
    {
      name: 'totalStock',
      type: 'number',
      label: 'Общий остаток на складе',
      admin: {
        description: 'Сумма остатков по всем вариациям',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.variants && Array.isArray(data.variants)) {
              return data.variants.reduce((total: number, variant: any) => {
                return total + (variant.stock || 0);
              }, 0);
            }
            return 0;
          },
        ],
      },
    },
    // В наличии (true если totalStock > 0)
    {
      name: 'isAvailable',
      type: 'checkbox',
      label: 'В наличии',
      admin: {
        description: 'Автоматически: true если totalStock > 0',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.totalStock !== undefined) {
              return data.totalStock > 0;
            }
            return false;
          },
        ],
      },
    },
    // Товар со скидкой (true если discountPrice заполнен)
    {
      name: 'isOnSale',
      type: 'checkbox',
      label: 'Товар со скидкой',
      admin: {
        description: 'Автоматически: true если discountPrice заполнен',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return !!(data?.discountPrice && data.discountPrice < data?.price);
          },
        ],
      },
    },

    // ========== ОТЗЫВЫ ==========
    {
      name: 'reviews',
      type: 'array',
      label: 'Отзывы о товаре',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          label: 'Пользователь',
          required: true,
          admin: {
            description: 'Зарегистрированный пользователь, оставивший отзыв',
          },
        },
        {
          name: 'variant',
          type: 'group',
          label: 'Вариация, к которой относится отзыв',
          fields: [
            {
              name: 'size',
              type: 'text',
              label: 'Размер',
            },
            {
              name: 'color',
              type: 'text',
              label: 'Цвет',
            },
          ],
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Оценка',
          required: true,
          min: 1,
          max: 5,
          admin: {
            description: 'Оценка от 1 до 5',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок отзыва',
          required: true,
        },
        {
          name: 'comment',
          type: 'textarea',
          label: 'Текст отзыва',
          required: true,
          admin: {
            rows: 5,
          },
        },
        {
          name: 'advantages',
          type: 'textarea',
          label: 'Достоинства',
          admin: {
            rows: 3,
          },
        },
        {
          name: 'disadvantages',
          type: 'textarea',
          label: 'Недостатки',
          admin: {
            rows: 3,
          },
        },
        {
          name: 'images',
          type: 'array',
          label: 'Фото в отзыве',
          maxRows: 5,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'isVerified',
          type: 'checkbox',
          label: 'Подтвержденный отзыв',
          defaultValue: false,
          admin: {
            description: 'Отзыв от покупателя, который подтвердил покупку',
          },
        },
        {
          name: 'createdAt',
          type: 'date',
          label: 'Дата отзыва',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },

    // ========== ВЫЧИСЛЯЕМЫЙ РЕЙТИНГ ==========
    {
      name: 'averageRating',
      type: 'number',
      label: 'Средний рейтинг',
      admin: {
        description: 'Среднее арифметическое всех оценок',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
              const total = data.reviews.reduce((sum: number, review: any) => {
                return sum + (review.rating || 0);
              }, 0);
              return Number((total / data.reviews.length).toFixed(1));
            }
            return 0;
          },
        ],
      },
    },
    {
      name: 'reviewsCount',
      type: 'number',
      label: 'Количество отзывов',
      admin: {
        description: 'Общее количество отзывов',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.reviews && Array.isArray(data.reviews)) {
              return data.reviews.length;
            }
            return 0;
          },
        ],
      },
    },

    // ========== ДОПОЛНИТЕЛЬНЫЕ ПОЛЯ ==========
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Тег',
        },
      ],
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      label: 'Популярный товар',
      defaultValue: false,
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'Новинка',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO настройки',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO заголовок',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO описание',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Ключевые слова',
        },
      ],
    },
  ],
};