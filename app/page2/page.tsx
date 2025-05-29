'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/page2.module.css';

type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN';

const LANGUAGES = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'] as const;

export default function Page2() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const langParam = searchParams.get('lang');
  const lang: Language = LANGUAGES.includes(langParam as Language)
    ? (langParam as Language)
    : 'ENGLISH';

  const buttonTexts: Record<Language, [string, string]> = {
    ENGLISH: ['SOUVENIRS OF MASTER EUGENIA', 'SOUVENIRS OF MASTER PAUL'],
    RUSSIAN: ['СУВЕНИРЫ МАСТЕРА ЕВГЕНИИ', 'СУВЕНИРЫ МАСТЕРА ПАВЛА'],
    GEORGIAN: [
      'ოსტატ ევგენიას სუვენირები'.toUpperCase(),
      'ოსტატ პაველის სუვენირები'.toUpperCase(),
    ],
  };

  const handleMasterClick = (master: 'eugenia' | 'paul') => {
    router.push(`/${master}-works?lang=${lang}`);
  };

  return (
    <main className={styles.container}>
      <Image
        src='/page2.jpeg'
        alt='Background'
        fill
        priority
        className={styles.background}
      />

      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleMasterClick('eugenia')}
          className={styles.masterBtn}
        >
          {buttonTexts[lang][0]}
        </button>
        <button
          onClick={() => handleMasterClick('paul')}
          className={styles.masterBtn}
        >
          {buttonTexts[lang][1]}
        </button>
      </div>
    </main>
  );
}
