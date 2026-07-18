'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../header.module.scss';
import ProfileDropdown from './ProfileDropdown';

const ProfileButton: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return(
    <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button className={`${styles['header__profile']} ${styles['headeer__profile--dropdown']}`}
            onClick={toggleProfileMenu}>
            <img src="/icons/profile.svg" alt="Личный кабинет" />
        </button>
        {/* Выпадающее окно профиля */}
        {isProfileOpen && <ProfileDropdown />}
    </div>
  );
};

export default ProfileButton;