'use client';

import React, { useEffect, useState } from 'react';
import styles from './newarrivals.module.scss';
import ProductCard from '../productCard/productCard';

// 👇 Обновлённый интерфейс Product под структуру Payload
interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  images: {
    id: string;
    image: {
      id: number;
      url: string;
      alt?: string;
      filename?: string;
    };
    isMain?: boolean;
    alt?: string;
  }[];
  variants: {
    id: string;
    size: string;
    color: string;
    colorCode?: string;
    stock: number;
    price?: number;
    sku: string;
  }[];
  averageRating: number;
  reviewsCount: number;
  isNew: boolean;
  isOnSale: boolean;
  isAvailable: boolean;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
  category?: string;
  brand?: string;
  tags?: { tag: string }[];
  shortDescription?: string;
  description?: string;
}

interface ProductsResponse {
  docs: Product[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  pagingCounter: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const Newarrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Получаем новинки (isNew = true) и сортируем по дате создания
        const url = `${API_URL}/api/products?depth=1&limit=4&sort=-createdAt`;

        console.log('🔍 Запрос к:', url);

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Ошибка API:', errorData);
          throw new Error(`Ошибка API: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();

        // Фильтруем только новые товары (isNew === true)
        // Если в Payload есть поле isNew, можно отфильтровать
        const newProducts = data.docs?.filter((product) => product.isNew === true) || [];
        
        setProducts(newProducts);
      } catch (err) {
        setError('Не удалось загрузить новинки');
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Состояние загрузки
  if (isLoading) {
    return (
      <section className={styles.newarrivals}>
        <div className="container">
          <div className={styles['newarrivals__row']}>
            <h2 className={styles['newarrivals__title']}>New Arrivals</h2>
            <div className={styles['newarrivals__products']}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles['newarrivals__skeleton']} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.newarrivals}>
        <div className="container">
          <div className={styles['newarrivals__row']}>
            <h2 className={styles['newarrivals__title']}>New Arrivals</h2>
            <p className={styles['newarrivals__error']}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.newarrivals}>
        <div className="container">
          <div className={styles['newarrivals__row']}>
            <h2 className={styles['newarrivals__title']}>New Arrivals</h2>
            <p className={styles['newarrivals__empty']}>Новых товаров пока нет</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.newarrivals}>
      <div className="container">
        <div className={styles['newarrivals__row']}>
          <h2 className={styles['newarrivals__title']}>New Arrivals</h2>

          <div className={styles['newarrivals__products']}>
            {products.map((product) => {
              // Берём главное изображение (isMain: true) или первое
              const mainImage = product.images?.find((img) => img.isMain === true) || product.images?.[0];
              const imageUrl = mainImage?.image?.url 
                ? `${API_URL}${mainImage.image.url}` 
                : '/images/placeholder.jpg';

              // Проверяем, есть ли скидка
              const isOnSale = !!(product.discountPrice && product.discountPrice < product.price);
              const displayPrice = isOnSale ? product.discountPrice : product.price;
              const displaySalePrice = isOnSale ? product.price : undefined;

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  salePrice={product.discountPrice}
                  imageUrl={imageUrl}
                  rating={product.averageRating || 0}
                  reviewsCount={product.reviewsCount || 0}
                  isNew={product.isNew === true}
                  onSale={product.isOnSale === true}
                />
              );
            })}
          </div>

          <a href="/shop" className={styles['newarrivals__view-all']}>
            View All
          </a>
        </div>
      </div>
    </section>
  );
};

export default Newarrivals;