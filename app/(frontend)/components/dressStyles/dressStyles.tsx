'use client';

import React, { useEffect, useState } from 'react';
import styles from './dressStyles.module.scss';

interface Style {
  id: string;
  name: string;
  slug: string;
  image?: {
    url: string;
    alt?: string;
  };
  description?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const DressStyles: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stylesList, setStylesList] = useState<Style[]>([]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('/api/styles?depth=1&limit=100');

        if (!response.ok) {
          throw new Error('Failed to fetch styles');
        }

        const data = await response.json();

        const orderMap: { [key: string]: number } = {
            'Casual': 1,
            'Formal': 2,
            'Party': 3,
            'Gym': 4,
        };

        const sortedStyles = data.docs?.sort((a: Style, b: Style) => {
            return (orderMap[a.name] || 99) - (orderMap[b.name] || 99);
        }) || [];
        
        setStylesList(data.docs || []);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        // Заглушки на случай ошибки
        setStylesList([
          { id: '1', name: 'Casual', slug: 'casual' },
          { id: '2', name: 'Formal', slug: 'formal' },
          { id: '3', name: 'Party', slug: 'party' },
          { id: '4', name: 'Gym', slug: 'gym' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStyles();
  }, []);

  // Состояние загрузки
  if (isLoading) {
    return (
      <section className={styles.dressStyles}>
        <div className="container">
          <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>
          <div className={styles.grid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Если стилей нет
  if (stylesList.length === 0) {
    return (
      <section className={styles.dressStyles}>
        <div className="container">
          <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>
          <p className={styles.empty}>Стили пока не добавлены</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.dressStyles}>
      <div className="container">
        <div className={styles.dressStyles__row}>
            <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>

            <div className={styles.grid}>
            {stylesList.map((style) => {
                const imageUrl = style.image?.url 
                ? `${API_URL}${style.image.url}` 
                : '/images/placeholder.jpg';

                return (
                <div key={style.id} className={styles.item}>
                    <a href={`/style/${style.slug}`} className={styles.link}>
                    <div 
                        className={styles.image}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <span className={styles.name}>{style.name}</span>
                    </a>
                </div>
                );
            })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyles;