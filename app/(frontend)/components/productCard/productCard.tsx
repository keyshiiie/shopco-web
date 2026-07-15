'use client';

import React from 'react';
import styles from './productCard.module.scss';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  rating: number;
  reviewsCount?: number;
  isNew?: boolean;
  onSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  salePrice,
  imageUrl,
  rating,
  reviewsCount = 0,
  isNew,
  onSale,
}) => {
  const hasDiscount = salePrice !== undefined && salePrice < price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - salePrice! / price) * 100) 
    : 0;

  // Рендерим звезды (5 звезд)
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className={styles['product-card__stars']}>
        {/* Полные звезды */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className={styles['product-card__star--filled']}>★</span>
        ))}
        {/* Половина звезды */}
        {hasHalfStar && (
          <span className={styles['product-card__star--half']}>★</span>
        )}
        {/* Пустые звезды */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className={styles['product-card__star--empty']}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles['product-card']}>
      <div className={styles['product-card__image-wrapper']}>
        <img
          src={imageUrl}
          alt={name}
          className={styles['product-card__image']}
        />
      </div>

      <div className={styles['product-card__content']}>
        <h3 className={styles['product-card__title']}>{name}</h3>

        <div className={styles['product-card__rating']}>
          {renderStars()}
          <span className={styles['product-card__rating-text']}>
            {rating}/5
          </span>
          {reviewsCount > 0 && (
            <span className={styles['product-card__reviews-count']}>
              ({reviewsCount})
            </span>
          )}
        </div>

        <div className={styles['product-card__price']}>
          {hasDiscount ? (
            <>
              <span className={styles['product-card__price--sale']}>
                ${salePrice!.toFixed(2)}
              </span>
              <span className={styles['product-card__price--regular']}>
                ${price.toFixed(2)}
              </span>
              <span className={styles['product-card__price--discount']}>
                -{discountPercent}%
              </span>
            </>
          ) : (
            <span className={styles['product-card__price--regular']}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;