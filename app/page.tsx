'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles/page.module.css';

type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('ENGLISH');

  const titles: Record<Language, string> = {
    ENGLISH: 'VAZI SOUVENIR SHOP',
    RUSSIAN: 'МАГАЗИН СУВЕНИРОВ ВАЗИ',
    GEORGIAN: 'სუვენირების მაღაზია ვაზი'.toUpperCase(),
  };

  const enterTexts: Record<Language, string> = {
    ENGLISH: 'ENTER',
    RUSSIAN: 'ВОЙТИ',
    GEORGIAN: 'შეიყვანეთ'.toUpperCase(),
  };

  return (
    <main className={styles.container}>
      {/* Новая кнопка Admin */}
      <button
        className={styles.adminButton}
        onClick={() => router.push('/admin')}
      >
        Admin Page
      </button>
      <Image
        src='/background.jpg'
        alt='Background'
        fill
        priority
        className={styles.background}
      />

      <h1 className={styles.title}>{titles[language]}</h1>

      <div className={styles.languageButtons}>
        <button
          onClick={() => setLanguage('ENGLISH')}
          className={styles.langBtn}
        >
          ENGLISH
        </button>
        <button
          onClick={() => setLanguage('RUSSIAN')}
          className={styles.langBtn}
        >
          РУССКИЙ
        </button>
        <button
          onClick={() => setLanguage('GEORGIAN')}
          className={styles.langBtn}
        >
          ქართული
        </button>
      </div>

      <button
        onClick={() => router.push(`/page2?lang=${language}`)}
        className={styles.enterBtn}
      >
        {enterTexts[language]}
      </button>
    </main>
  );
}
