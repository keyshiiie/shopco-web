'use client';

import React, { useState, useEffect } from 'react';
import ShopButton from './shopButton/ShopButton';
import ProfileButton from './profileButton/ProfileButton';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles['header__row']}>
          <div className={styles['header__logo']}>
            <h2 className={styles['header__logo-text']}>Shop.co</h2>
          </div>
          <nav className={styles['header__nav']}>
            <ul className={styles['header__nav-list']}>
              <li className={styles['header__nav-item']}>
                <ShopButton/>
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
            <ProfileButton/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;