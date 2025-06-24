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
      <div className='w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-blue-900 border-4 border-[#8B4513] rounded-2xl px-3 py-5 sm:px-8 sm:py-10 shadow-lg mx-2'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-red-400 text-center drop-shadow'>
          {currentContent.title}
        </h1>

        <div className='space-y-4'>
          {currentContent.contacts.map((contact, index) => (
            <div
              key={index}
              className='text-yellow-200 text-base sm:text-lg md:text-xl font-bold drop-shadow break-words'
            >
              {contact}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
