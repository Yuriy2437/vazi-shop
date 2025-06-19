import Image from 'next/image';
import styles from '../styles/page2.module.css';

// Клиентский компонент
function PageContent({ lang }: { lang: string }) {
  const buttonTexts = {
    ENGLISH: [
      'SOUVENIRS OF THE ARTIST EVGENIA',
      'POSTCARDS',
      'CHRISTIAN POSTCARDS',
      'WORKSHOP "MARKOV-DOM"',
    ],
    RUSSIAN: [
      'СУВЕНИРЫ ХУДОЖНИКА ЕВГЕНИИ',
      'ОТКРЫТКИ',
      'ХРИСТИАНСКИЕ ОТКРЫТКИ',
      'МАСТЕРСКАЯ "MARKOV-DOM"',
    ],
    GEORGIAN: [
      'მხატვარ ევგენიას სუვენირები'.toUpperCase(),
      'საფოსტო ბარათები'.toUpperCase(),
      'ქრისტიანული ბარათები'.toUpperCase(),
      'სახელოსნო "მარკოვის სახლი"'.toUpperCase(),
    ],
  };

  return (
    <main className={styles.container}>
      <Image
        src='/page2.jpeg'
        alt='Background'
        fill
        priority
        className={styles.background}
        sizes='(max-width: 768px) 100vw, 50vw'
      />

      <div className={styles.buttonContainer}>
        <a href={`/eugenia-works?lang=${lang}`} className={styles.masterBtn}>
          {buttonTexts[lang as keyof typeof buttonTexts][0]}
        </a>
        <a href={`/cards?lang=${lang}`} className={styles.masterBtn}>
          {buttonTexts[lang as keyof typeof buttonTexts][1]}
        </a>
        <a href={`/christian-cards?lang=${lang}`} className={styles.masterBtn}>
          {buttonTexts[lang as keyof typeof buttonTexts][2]}
        </a>
        <a href={`/paul-works?lang=${lang}`} className={styles.masterBtn}>
          {buttonTexts[lang as keyof typeof buttonTexts][3]}
        </a>
      </div>
    </main>
  );
}

// Серверный компонент
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  // Ожидаем параметры
  const { lang } = await searchParams;

  // Валидация языка
  const validLang = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
    lang?.toUpperCase() || ''
  )
    ? lang!.toUpperCase()
    : 'ENGLISH';

  return <PageContent lang={validLang} />;
}
