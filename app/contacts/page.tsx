'use client';

import { useSearchParams } from 'next/navigation';
import styles from './contacts.module.css';

export default function ContactsPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  const content = {
    ENGLISH: {
      title: 'You can call or write to us:',
      contacts: [
        '+995 598 09 74 41 – Yuri (WhatsApp)',
        '@uaskar – Yuri (Telegram)',
      ],
    },
    RUSSIAN: {
      title: 'Вы можете позвонить или написать нам:',
      contacts: [
        '+995 598 09 74 41 – Юрий (WhatsApp)',
        '@uaskar – Юрий (Telegram)',
      ],
    },
    GEORGIAN: {
      title: 'შეგიძლიათ დაგვირეკოთ ან მოგვწეროთ:',
      contacts: [
        '+995 598 09 74 41 – იური (WhatsApp)',
        '@uaskar – იური (Telegram)',
      ],
    },
  };

  const langKey = lang.toUpperCase() as keyof typeof content;
  const currentContent = content[langKey] || content.ENGLISH;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{currentContent.title}</h1>
        <div>
          {currentContent.contacts.map((contact, index) => (
            <div key={index} className={styles.contact}>
              {contact}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
