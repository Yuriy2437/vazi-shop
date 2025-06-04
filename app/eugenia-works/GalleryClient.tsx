'use client';

import { useSearchParams } from 'next/navigation';
import GalleryContent from './GalleryContent';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <GalleryContent lang={lang} />;
}
