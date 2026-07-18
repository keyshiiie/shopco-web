'use client';

import React, { useState, useEffect} from 'react';
import styles from '../header.module.scss';

interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string | null;
  description?: string;
}

const ShopDropdown: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
    <div>
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
    </div>
    );
};

export default ShopDropdown;