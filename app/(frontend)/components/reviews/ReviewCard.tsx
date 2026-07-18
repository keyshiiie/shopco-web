'use client';

import React from 'react';
import styles from './Reviews.module.scss';

interface ReviewCardProps {
  title: string;
  content: string;
  rating: number;
  user: {
    firstName: string;
    lastName: string;
    email?: string;
  };
  createdAt: string;
  isVerified?: boolean;
}

const VerifiedIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8485 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z" fill="#01AB31"/>
    </svg>
);

const StarIcon: React.FC = () => (
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7369 0L13.9354 6.8872L21.4739 7.80085L15.9121 12.971L17.3727 20.4229L10.7369 16.731L4.10114 20.4229L5.56173 12.971L-3.8147e-06 7.80085L7.53849 6.8872L10.7369 0Z" fill="#FFC633"/>
    </svg>
);

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  content,
  rating,
  user,
  createdAt,
  isVerified = false,
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return firstName ? firstName[0].toUpperCase() : 'U';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles['review-card']}>
      {/* Звезды рейтинга */}
      <div className={styles['review-card__rating']}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles['star']} ${
              star <= rating ? styles['star--filled'] : ''
            }`}>
            <StarIcon/>
          </span>
        ))}
      </div>

      {/* Автор с галочкой */}
      <div className={styles['review-card__author']}>
        <div className={styles['review-card__avatar']}>
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div className={styles['review-card__author-info']}>
          <div className={styles['review-card__author-name-wrapper']}>
            <span className={styles['review-card__author-name']}>
              {user.firstName} {user.lastName}
            </span>
            {isVerified && (
              <span 
                className={styles['review-card__verified']} 
                title="Подтверждённый покупатель">
                <VerifiedIcon/>
              </span>
            )}
          </div>
          <div className={styles['review-card__date']}>
            {formatDate(createdAt)}
          </div>
        </div>
      </div>

      {/* Текст отзыва */}
      <p className={styles['review-card__content']}>{content}</p>
    </div>
  );
};

export default ReviewCard;