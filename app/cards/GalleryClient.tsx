'use client';

import { useSearchParams } from 'next/navigation';
import CardsGallery from './CardsGallery';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <CardsGallery lang={lang} />;
}
