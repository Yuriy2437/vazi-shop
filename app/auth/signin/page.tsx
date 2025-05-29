'use client';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from './signin.module.css';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Сброс состояния формы при монтировании компонента
  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (res?.error) {
      setError('Неверный логин или пароль');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          placeholder='Логин'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          autoComplete='new-password'
        />
        <button type='submit' className={styles.button}>
          Войти
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
