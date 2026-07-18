'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProfileButton.module.scss';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const ProfileDropdown: React.FC = () => {
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);      

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.user || data.doc || data;

          setUser(userData); 
        } else {
          console.warn('Ответ не OK:', response.status);
          setUser(null);
        }
      } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);             
        router.push('/');          
        router.refresh();          
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleLogin = () => router.push('/login');
  const handleRegister = () => router.push('/register');

  const getDisplayName = (user: User): string => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    return user.email; 
  };

  if (loading) {
    return (
      <div className={styles['profile__dropdown']}>
        <div className={styles['dropdown__loading']}>
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className={styles['profile__dropdown']}>
      {user ? (
        <div className={styles['dropdown__authorized']}>
          <div className={styles['dropdown__user-info']}>
            <div className={styles['dropdown__user-email']}>
              {user.email}
            </div>
          </div>

          <div className={styles['dropdown__divider']} />

          <button 
            className={styles['dropdown__link']}
            onClick={() => router.push('/profile')}
          >
            My account
          </button>
          <button 
            className={styles['dropdown__link']}
            onClick={() => router.push('/profile/orders')}
          >
            Orders
          </button>

          <div className={styles['dropdown__divider']} />

          <button 
            className={`${styles['dropdown__link']} ${styles['dropdown__link--danger']}`}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className={styles['dropdown__unauthorized']}>
          <button 
            className={styles['dropdown__button']} 
            onClick={handleLogin}>
            LogIn
          </button>
          <button 
            className={`${styles['dropdown__button']} ${styles['dropdown__button--secondary']}`}
            onClick={handleRegister}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;