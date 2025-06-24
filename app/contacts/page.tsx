'use client';

import { useSearchParams } from 'next/navigation';

export default function ContactsPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  const content = {
    ENGLISH: {
      title: 'You can call or write to us:',
      contacts: [
        '+995 598 09 74 41 – Yuri (WhatsApp)',
        '@uaskar – Yuri (Telegram)',
        '+995 599 06 80 54 – Alexander (WhatsApp)',
      ],
    },
    RUSSIAN: {
      title: 'Вы можете позвонить или написать нам:',
      contacts: [
        '+995 598 09 74 41 – Юрий (WhatsApp)',
        '@uaskar – Юрий (Telegram)',
        '+995 599 06 80 54 – Александр (WhatsApp)',
      ],
    },
    GEORGIAN: {
      title: 'შეგიძლიათ დაგვირეკოთ ან მოგვწეროთ:',
      contacts: [
        '+995 598 09 74 41 – იური (WhatsApp)',
        '@uaskar – იური (Telegram)',
        '+995 599 06 80 54 – ალექსანდრე (WhatsApp)',
      ],
    },
  };

  const langKey = lang.toUpperCase() as keyof typeof content;
  const currentContent = content[langKey] || content.ENGLISH;

  return (
    <div className='min-h-screen flex items-center justify-center bg-black p-4'>
      <div className='w-full max-w-md bg-blue-900 border-4 border-amber-900 rounded-2xl p-8 shadow-lg'>
        <h1 className='text-2xl font-bold mb-6 text-red-500 text-center'>
          {currentContent.title}
        </h1>

        <div className='space-y-4'>
          {currentContent.contacts.map((contact, index) => (
            <div key={index} className='text-yellow-200 text-lg font-bold'>
              {contact}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
