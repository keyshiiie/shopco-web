'use client';

import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.scss';
import ReviewCard from './ReviewCard';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  isApproved: boolean;
  isVerified?: boolean;
  createdAt: string;
}

interface ReviewsResponse {
  docs: Review[];
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

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Определяем количество карточек на экране
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);

        const url = `${API_URL}/api/reviews?where[isApproved][equals]=true&depth=2&sort=-createdAt&limit=20`;

        console.log('Запрос к:', url);

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Ошибка API:', errorData);
          throw new Error(`Ошибка API: ${response.status}`);
        }

        const data: ReviewsResponse = await response.json();
        console.log('📦 Получены отзывы:', data);

        const reviewsWithVerified = (data.docs || []).map((review) => ({
          ...review,
          isVerified: true,
        }));

        setReviews(reviewsWithVerified);
      } catch (err) {
        setError('Не удалось загрузить отзывы');
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const totalSlides = Math.max(0, reviews.length - itemsPerView);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
  };

  if (isLoading) {
    return (
      <section className={styles.reviews}>
        <div className="container">
          <div className={styles['reviews__loading']}>
            Загрузка отзывов...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.reviews}>
        <div className="container">
          <div className={styles['reviews__error']}>{error}</div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className={styles.reviews}>
        <div className="container">
          <div className={styles['reviews__header']}>
            <h2 className={styles['reviews__title']}>Отзывы наших клиентов</h2>
          </div>
          <div className={styles['reviews__empty']}>
            Пока нет отзывов. Станьте первым!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.reviews}>
      <div className="container">
        <div className={styles['reviews__header']}>
          <h2 className={styles['reviews__title']}>OUR HAPPY CUSTOMERS</h2>
          <div className={styles['reviews__controls']}>
            <button
              className={styles['reviews__control-btn']}
              onClick={handlePrev}
              disabled={currentSlide === 0}
              aria-label="Предыдущие отзывы">
              ←
            </button>
            <button
              className={styles['reviews__control-btn']}
              onClick={handleNext}
              disabled={currentSlide >= totalSlides}
              aria-label="Следующие отзывы">
              →
            </button>
          </div>
        </div>

        <div className={styles['reviews__slider']}>
          <div
            className={styles['reviews__track']}
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
            }}>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                title={review.title}
                content={review.content}
                rating={review.rating}
                user={{
                  firstName: review.user?.firstName || 'Пользователь',
                  lastName: review.user?.lastName || '',
                  email: review.user?.email,
                }}
                createdAt={review.createdAt}
                isVerified={review.isVerified || false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;