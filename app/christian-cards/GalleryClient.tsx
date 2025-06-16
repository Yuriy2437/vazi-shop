'use client';

import { useSearchParams } from 'next/navigation';
import ChristianCardsGallery from './ChristianCardsGallery';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <ChristianCardsGallery lang={lang} />;
}
