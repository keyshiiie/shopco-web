'use client';

import React, {useState} from 'react';
import styles from './main.module.scss';

const Main: React.FC = () => {
    return (
        <section className={styles["main"]}>
            {/* Звёздочки */}
            <img
                src="/icons/star-small.svg"
                alt=""
                className={`${styles['main__star']} ${styles['main__star--small']}`}
            />
            <img
                src="/icons/star-big.svg"
                alt=""
                className={`${styles['main__star']} ${styles['main__star--big']}`}
            />
            <div className="container">
                <div className={styles["main__row"]}>
                    <div className={styles["main__hero"]}>
                        {/* Герой-секция */}
                        <div className={styles["main__hero-content"]}>
                            <h1 className={styles["main__title"]}>
                                FIND CLOTHES THAT MATCHes YOUR STYLE
                            </h1>
                            <p className={styles["main__description"]}>
                                Browse through our diverse range of meticulously crafted garments,
                                designed to bring out your individuality and cater to your sense of style.
                            </p>
                            <a href="№" className={styles["main__hero-btn"]}>
                                Shop Now
                            </a>
                            {/* Преимущества */}
                            <div className={styles["main__benefits"]}>
                                <div className={styles['main__benefit']}>
                                    <h3 className={styles['main__benefit-title']}>200+</h3>
                                    <p className={styles['main__benefit-description']}>
                                        International Brands
                                    </p>
                                </div>
                                <div className={styles['main__benefit']}>
                                    <h3 className={styles['main__benefit-title']}>2,000+</h3>
                                    <p className={styles['main__benefit-description']}>
                                        High-Quality Products
                                    </p>
                                </div>
                                <div className={styles['main__benefit']}>
                                    <h3 className={styles['main__benefit-title']}>30,000+</h3>
                                    <p className={styles['main__benefit-description']}>
                                        Happy Customers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Бренды*/}
            <div className={styles['main__brands-wrapper']}>
                <div className="container">
                <div className={styles['main__brands']}>
                    <img src="/images/brands/versace.svg" alt="Versace" />
                    <img src="/images/brands/zara.svg" alt="Zara" />
                    <img src="/images/brands/gucci.svg" alt="Gucci" />
                    <img src="/images/brands/prada.svg" alt="Prada" />
                    <img src="/images/brands/calvin-klein.svg" alt="Calvin Klein" />
                </div>
                </div>
            </div>
        </section>
    );
};

export default Main;