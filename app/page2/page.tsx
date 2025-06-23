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

import { useEffect, useState } from 'react';
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

const BUTTON_CONFIG = {
  main: {
    ENGLISH: [
      { label: 'SOUVENIRS', value: 'SOUVENIRS' as const },
      { label: 'POSTCARDS', value: 'POSTCARDS' as const },
      { label: 'TEA AND COFFEE', value: 'TEA_COFFEE' as const },
      { label: 'BOOKS', value: 'BOOKS' as const },
      { label: 'OUR CONTACTS', value: 'CONTACTS' as const },
    ],
    RUSSIAN: [
      { label: 'СУВЕНИРЫ', value: 'SOUVENIRS' as const },
      { label: 'ОТКРЫТКИ', value: 'POSTCARDS' as const },
      { label: 'ЧАЙ И КОФЕ', value: 'TEA_COFFEE' as const },
      { label: 'КНИГИ', value: 'BOOKS' as const },
      { label: 'НАШИ КОНТАКТЫ', value: 'CONTACTS' as const },
    ],
    GEORGIAN: [
      { label: 'სუვენირები', value: 'SOUVENIRS' as const },
      { label: 'ღია ბარათები', value: 'POSTCARDS' as const },
      { label: 'ჩაი და ყავა', value: 'TEA_COFFEE' as const },
      { label: 'წიგნები', value: 'BOOKS' as const },
      { label: 'ჩვენი კონტაქტები', value: 'CONTACTS' as const },
    ],
  },
  sub: {
    SOUVENIRS: {
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
    },
    POSTCARDS: {
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
    },
  },
  back: {
    ENGLISH: 'BACK',
    RUSSIAN: 'НАЗАД',
    GEORGIAN: 'უკან',
  },
  comingSoon: {
    ENGLISH: 'Coming soon',
    RUSSIAN: 'Скоро',
    GEORGIAN: 'მალე',
  },
};

export default function Page2() {
  const [category, setCategory] = useState<Category>(null);
  const [lang, setLang] = useState<Language>('ENGLISH');
  const searchParams = useSearchParams();

  useEffect(() => {
    const langParam = searchParams.get('lang') || 'ENGLISH';
    const langUpper = langParam.toUpperCase();
    if (['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(langUpper)) {
      setLang(langUpper as Language);
    }
  }, [searchParams]);

  const langQuery = `?lang=${lang}`;

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

      {/* Основное меню */}
      {!category && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.main[lang].map((btn) => (
            <button
              key={btn.value}
              className={styles.masterBtn}
              onClick={() => setCategory(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Меню сувениров */}
      {category === 'SOUVENIRS' && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.sub.SOUVENIRS[lang].map((btn) => (
            <a
              key={btn.href}
              href={`${btn.href}${langQuery}`}
              className={styles.masterBtn}
            >
              {btn.label}
            </a>
          ))}
          <button
            className={styles.masterBtn}
            onClick={() => setCategory(null)}
          >
            {BUTTON_CONFIG.back[lang]}
          </button>
        </div>
      )}

      {/* Меню открыток */}
      {category === 'POSTCARDS' && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.sub.POSTCARDS[lang].map((btn) => (
            <a
              key={btn.href}
              href={`${btn.href}${langQuery}`}
              className={styles.masterBtn}
            >
              {btn.label}
            </a>
          ))}
          <button
            className={styles.masterBtn}
            onClick={() => setCategory(null)}
          >
            {BUTTON_CONFIG.back[lang]}
          </button>
        </div>
      )}

      {/* Другие категории */}
      {category && category !== 'SOUVENIRS' && category !== 'POSTCARDS' && (
        <div className={styles.buttonContainer}>
          <div
            className={styles.masterBtn}
            style={{
              background: '#888',
              color: '#fff',
              cursor: 'default',
            }}
          >
            {BUTTON_CONFIG.comingSoon[lang]}
          </div>
          <button
            className={styles.masterBtn}
            onClick={() => setCategory(null)}
          >
            {BUTTON_CONFIG.back[lang]}
          </button>
        </div>
      )}
    </div>
  );
}
