'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Login.module.scss';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payloadUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      // Отправляем запрос к вашему API-роуту для входа
      const response = await fetch(`${payloadUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Успешный вход
        router.push('/'); // Редирект на главную
        router.refresh(); // Обновляем кэш (чтобы хедер обновился)
      } else {
        setError(data.error || 'Неверный email или пароль');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <html>
      <body>
        <div className={styles['login-page']}>
          <div className={styles['login-container']}>
            <h1 className={styles['login-title']}>Вход в аккаунт</h1>
            
            {error && (
              <div className={styles['login-error']}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles['login-form']}>
              <div className={styles['form-group']}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="password">Пароль</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button 
                type="submit" 
                className={styles['login-button']}
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <div className={styles['login-footer']}>
              <p>
                Нет аккаунта?{' '}
                <Link href="/register" className={styles['login-link']}>
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    
  );
};

export default LoginPage;