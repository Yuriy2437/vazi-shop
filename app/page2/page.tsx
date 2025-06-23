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

// Конфигурация кнопок
const BUTTON_CONFIG = {
  main: {
    ENGLISH: [
      { label: 'SOUVENIRS', value: 'SOUVENIRS' as Category },
      { label: 'POSTCARDS', value: 'POSTCARDS' as Category },
      { label: 'TEA AND COFFEE', value: 'TEA_COFFEE' as Category },
      { label: 'BOOKS', value: 'BOOKS' as Category },
      { label: 'OUR CONTACTS', value: 'CONTACTS' as Category },
    ],
    RUSSIAN: [
      { label: 'СУВЕНИРЫ', value: 'SOUVENIRS' as Category },
      { label: 'ОТКРЫТКИ', value: 'POSTCARDS' as Category },
      { label: 'ЧАЙ И КОФЕ', value: 'TEA_COFFEE' as Category },
      { label: 'КНИГИ', value: 'BOOKS' as Category },
      { label: 'НАШИ КОНТАКТЫ', value: 'CONTACTS' as Category },
    ],
    GEORGIAN: [
      { label: 'სუვენირები', value: 'SOUVENIRS' as Category },
      { label: 'ღია ბარათები', value: 'POSTCARDS' as Category },
      { label: 'ჩაი და ყავა', value: 'TEA_COFFEE' as Category },
      { label: 'წიგნები', value: 'BOOKS' as Category },
      { label: 'ჩვენი კონტაქტები', value: 'CONTACTS' as Category },
    ],
  },
  souvenirs: {
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
  postcards: {
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
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={styles.masterBtn}
              style={{ background: '#ccc' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Определяем язык из параметров URL
  const langParam = searchParams.get('lang') || 'ENGLISH';
  const langUpper = langParam.toUpperCase();
  const validLang: Language = (
    ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(langUpper)
      ? langUpper
      : 'ENGLISH'
  ) as Language;

  // Строим параметр языка для URL
  const langQuery = `?lang=${validLang}`;

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

      {/* Основные категории */}
      {!category && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.main[validLang].map((btn) => (
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

      {/* Подкатегории для сувениров */}
      {category === 'SOUVENIRS' && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.souvenirs[validLang].map((btn) => (
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
            {BUTTON_CONFIG.back[validLang]}
          </button>
        </div>
      )}

      {/* Подкатегории для открыток */}
      {category === 'POSTCARDS' && (
        <div className={styles.buttonContainer}>
          {BUTTON_CONFIG.postcards[validLang].map((btn) => (
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
            {BUTTON_CONFIG.back[validLang]}
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
            {BUTTON_CONFIG.comingSoon[validLang]}
          </div>
          <button
            className={styles.masterBtn}
            onClick={() => setCategory(null)}
          >
            {BUTTON_CONFIG.back[validLang]}
          </button>
        </div>
      )}
    </div>
  );
}
