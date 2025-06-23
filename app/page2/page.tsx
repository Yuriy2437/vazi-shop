// import Image from 'next/image';
// import styles from '../styles/page2.module.css';

// // Клиентский компонент
// function PageContent({ lang }: { lang: string }) {
//   const buttonTexts = {
//     ENGLISH: [
//       'SOUVENIRS OF THE ARTIST EVGENIA',
//       'POSTCARDS',
//       'CHRISTIAN POSTCARDS',
//       'WORKSHOP "MARKOV-DOM"',
//     ],
//     RUSSIAN: [
//       'СУВЕНИРЫ ХУДОЖНИКА ЕВГЕНИИ',
//       'ОТКРЫТКИ',
//       'ХРИСТИАНСКИЕ ОТКРЫТКИ',
//       'МАСТЕРСКАЯ "MARKOV-DOM"',
//     ],
//     GEORGIAN: [
//       'მხატვარ ევგენიას სუვენირები'.toUpperCase(),
//       'საფოსტო ბარათები'.toUpperCase(),
//       'ქრისტიანული ბარათები'.toUpperCase(),
//       'სახელოსნო "მარკოვის სახლი"'.toUpperCase(),
//     ],
//   };

//   return (
//     <main className={styles.container}>
//       <Image
//         src='/page2.jpeg'
//         alt='Background'
//         fill
//         priority
//         className={styles.background}
//         sizes='(max-width: 768px) 100vw, 50vw'
//       />

//       <div className={styles.buttonContainer}>
//         <a href={`/eugenia-works?lang=${lang}`} className={styles.masterBtn}>
//           {buttonTexts[lang as keyof typeof buttonTexts][0]}
//         </a>
//         <a href={`/cards?lang=${lang}`} className={styles.masterBtn}>
//           {buttonTexts[lang as keyof typeof buttonTexts][1]}
//         </a>
//         <a href={`/christian-cards?lang=${lang}`} className={styles.masterBtn}>
//           {buttonTexts[lang as keyof typeof buttonTexts][2]}
//         </a>
//         <a href={`/paul-works?lang=${lang}`} className={styles.masterBtn}>
//           {buttonTexts[lang as keyof typeof buttonTexts][3]}
//         </a>
//       </div>
//     </main>
//   );
// }

// // Серверный компонент
// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{ lang?: string }>;
// }) {
//   // Ожидаем параметры
//   const { lang } = await searchParams;

//   // Валидация языка
//   const validLang = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
//     lang?.toUpperCase() || ''
//   )
//     ? lang!.toUpperCase()
//     : 'ENGLISH';

//   return <PageContent lang={validLang} />;
// }

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/page2.module.css';

type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN';
type Category =
  | 'SOUVENIRS'
  | 'POSTCARDS'
  | 'TEA_COFFEE'
  | 'BOOKS'
  | 'CONTACTS'
  | null;

const mainButtons: Record<Language, { label: string; value: Category }[]> = {
  ENGLISH: [
    { label: 'SOUVENIRS', value: 'SOUVENIRS' },
    { label: 'POSTCARDS', value: 'POSTCARDS' },
    { label: 'TEA AND COFFEE', value: 'TEA_COFFEE' },
    { label: 'BOOKS', value: 'BOOKS' },
    { label: 'OUR CONTACTS', value: 'CONTACTS' },
  ],
  RUSSIAN: [
    { label: 'СУВЕНИРЫ', value: 'SOUVENIRS' },
    { label: 'ОТКРЫТКИ', value: 'POSTCARDS' },
    { label: 'ЧАЙ И КОФЕ', value: 'TEA_COFFEE' },
    { label: 'КНИГИ', value: 'BOOKS' },
    { label: 'НАШИ КОНТАКТЫ', value: 'CONTACTS' },
  ],
  GEORGIAN: [
    { label: 'სუვენირები', value: 'SOUVENIRS' },
    { label: 'ღია ბარათები', value: 'POSTCARDS' },
    { label: 'ჩაი და ყავა', value: 'TEA_COFFEE' },
    { label: 'წიგნები', value: 'BOOKS' },
    { label: 'ჩვენი კონტაქტები', value: 'CONTACTS' },
  ],
};

const souvenirsSub: Record<Language, { label: string; href: string }[]> = {
  ENGLISH: [
    { label: 'EUGENIA STRASHKO SOUVENIRS', href: '/eugenia-works' },
    { label: 'MARKOV-DOM WORKSHOP', href: '/paul-works' },
  ],
  RUSSIAN: [
    { label: 'СУВЕНИРЫ ХУДОЖНИКА ЕВГЕНИИ СТРАШКО', href: '/eugenia-works' },
    { label: 'МАСТЕРСКАЯ «MARKOV-DOM»', href: '/paul-works' },
  ],
  GEORGIAN: [
    { label: 'ევგენია სტრაშკოს სუვენირები', href: '/eugenia-works' },
    { label: 'სახელოსნო «MARKOV-DOM»', href: '/paul-works' },
  ],
};

const postcardsSub: Record<Language, { label: string; href: string }[]> = {
  ENGLISH: [
    { label: 'EUGENIA STRASHKO POSTCARDS', href: '/cards' },
    {
      label: 'CHRISTIAN POSTCARDS BY EUGENIA STRASHKO',
      href: '/christian-cards',
    },
  ],
  RUSSIAN: [
    { label: 'ОТКРЫТКИ ХУДОЖНИКА ЕВГЕНИИ СТРАШКО', href: '/cards' },
    {
      label: 'ХРИСТИАНСКИЕ ОТКРЫТКИ ХУДОЖНИКА ЕВГЕНИИ СТРАШКО',
      href: '/christian-cards',
    },
  ],
  GEORGIAN: [
    { label: 'ევგენია სტრაშკოს ღია ბარათები', href: '/cards' },
    {
      label: 'ევგენია სტრაშკოს ქრისტიანული ღია ბარათები',
      href: '/christian-cards',
    },
  ],
};

const backText: Record<Language, string> = {
  ENGLISH: 'BACK',
  RUSSIAN: 'НАЗАД',
  GEORGIAN: 'უკან',
};

export default function Page() {
  const [category, setCategory] = useState<Category>(null);
  const [lang, setLang] = useState<Language>('ENGLISH');
  const searchParams = useSearchParams();

  useEffect(() => {
    const langParam = searchParams.get('lang') || 'ENGLISH';
    const langUpper = langParam.toUpperCase();
    const validLang: Language = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
      langUpper
    )
      ? (langUpper as Language)
      : 'ENGLISH';
    setLang(validLang);
  }, [searchParams]);

  const langParam = `?lang=${lang}`;

  let content;

  if (!category) {
    content = (
      <div className={styles.buttonContainer}>
        {mainButtons[lang].map((btn) => (
          <button
            key={btn.value}
            className={styles.masterBtn}
            onClick={() => setCategory(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    );
  } else if (category === 'SOUVENIRS') {
    content = (
      <div className={styles.buttonContainer}>
        {souvenirsSub[lang].map((btn) => (
          <a
            key={btn.href}
            href={btn.href + langParam}
            className={styles.masterBtn}
          >
            {btn.label}
          </a>
        ))}
        <button className={styles.masterBtn} onClick={() => setCategory(null)}>
          {backText[lang]}
        </button>
      </div>
    );
  } else if (category === 'POSTCARDS') {
    content = (
      <div className={styles.buttonContainer}>
        {postcardsSub[lang].map((btn) => (
          <a
            key={btn.href}
            href={btn.href + langParam}
            className={styles.masterBtn}
          >
            {btn.label}
          </a>
        ))}
        <button className={styles.masterBtn} onClick={() => setCategory(null)}>
          {backText[lang]}
        </button>
      </div>
    );
  } else {
    content = (
      <div className={styles.buttonContainer}>
        <div
          className={styles.masterBtn}
          style={{ background: '#888', color: '#fff', cursor: 'default' }}
        >
          {lang === 'ENGLISH'
            ? 'Coming soon'
            : lang === 'RUSSIAN'
            ? 'Скоро'
            : 'მალე'}
        </div>
        <button className={styles.masterBtn} onClick={() => setCategory(null)}>
          {backText[lang]}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Image
        src='/page2.jpeg'
        alt='Background'
        fill
        priority
        className={styles.background}
        sizes='(max-width: 768px) 100vw, 50vw'
      />
      {content}
    </div>
  );
}
