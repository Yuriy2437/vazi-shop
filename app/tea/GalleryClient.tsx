'use client';

import { useSearchParams } from 'next/navigation';
import TeaGallery from './TeaGallery';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <TeaGallery lang={lang} />;
}
