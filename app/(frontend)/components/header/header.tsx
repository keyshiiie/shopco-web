'use client';

import React, { useState, useEffect } from 'react';
import styles from './header.module.scss';

interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string | null;
  description?: string;
}

const Header: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleShopMenu = () => {
    setIsShopOpen(!isShopOpen);
  };

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Запрос к API Payload
        const response = await fetch('/api/categories?depth=1&limit=100');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        // Payload возвращает { docs: [...] }
        setCategories(data.docs || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Заглушки на случай ошибки
        setCategories([
          { id: '1', name: "Men's Clothing", slug: 'mens-clothing' },
          { id: '2', name: "Women's Clothing", slug: 'womens-clothing' },
          { id: '3', name: 'Accessories', slug: 'accessories' },
          { id: '4', name: 'Footwear', slug: 'footwear' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles['header__row']}>
          {/* Логотип */}
          <div className={styles['header__logo']}>
            <h2 className={styles['header__logo-text']}>Shop.co</h2>
          </div>

          {/* Навигация */}
          <nav className={styles['header__nav']}>
            <ul className={styles['header__nav-list']}>
              <li className={styles['header__nav-item']}>
                {/* Кнопка Shop с выпадающим списком */}
                <button
                  className={`${styles['header__nav-link']} ${styles['header__nav-link--dropdown']}`}
                  onClick={toggleShopMenu}
                >
                  Shop
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${styles['header__nav-arrow']} ${isShopOpen ? styles['header__nav-arrow--open'] : ''}`}
                  >
                    <path
                      d="M11.2826 1.28318L6.28255 6.28318C6.21287 6.3531 6.13008 6.40857 6.03892 6.44643C5.94775 6.48428 5.85001 6.50377 5.7513 6.50377C5.65259 6.50377 5.55485 6.48428 5.46369 6.44643C5.37252 6.40857 5.28973 6.3531 5.22005 6.28318L0.220051 1.28318C0.0791548 1.14228 -2.09952e-09 0.951183 0 0.751926C2.09952e-09 0.552669 0.0791548 0.361572 0.220051 0.220676C0.360947 0.0797797 0.552044 0.000625136 0.751301 0.000625133C0.950558 0.000625131 1.14165 0.0797797 1.28255 0.220676L5.75193 4.69005L10.2213 0.220051C10.3622 0.079155 10.5533 0 10.7526 0C10.9518 0 11.1429 0.079155 11.2838 0.220051C11.4247 0.360948 11.5039 0.552044 11.5039 0.751301C11.5039 0.950559 11.4247 1.14165 11.2838 1.28255L11.2826 1.28318Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Выпадающий список с категориями */}
                {isShopOpen && (
                  <ul className={styles['header__dropdown']}>
                    {isLoading ? (
                      <li className={styles['header__dropdown-item']}>
                        <span>Загрузка...</span>
                      </li>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id} className={styles['header__dropdown-item']}>
                          <a href={`/category/${category.slug}`}>
                            {category.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className={styles['header__dropdown-item']}>
                        <span>Нет категорий</span>
                      </li>
                    )}
                  </ul>
                )}
              </li>

              <li className={styles['header__nav-item']}>
                <a href="#" className={styles['header__nav-link']}>On Sale</a>
              </li>
              <li className={styles['header__nav-item']}>
                <a href="#" className={styles['header__nav-link']}>New arrivals</a>
              </li>
              <li className={styles['header__nav-item']}>
                <a href="#" className={styles['header__nav-link']}>Brands</a>
              </li>
            </ul>
          </nav>

          {/* Действия (поиск, корзина, профиль) */}
          <div className={styles['header__actions']}>
            <div className={styles['header__search']}>
              <div className={styles['header__search-icon']}>
                <img src="/icons/search.svg" alt="Поиск"/>
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className={styles['header__search-input']}
              />
              <button className={styles['header__clear-btn']}>
                <img src="/icons/clear.svg" alt="Очистить" />
              </button>
            </div>

            <button className={styles['header__cart']}>
              <img src="/icons/cart.svg" alt="Корзина" />
              <span className={styles['header__cart-count']}>0</span>
            </button>

            <button className={styles['header__profile']}>
              <img src="/icons/profile.svg" alt="Личный кабинет" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;