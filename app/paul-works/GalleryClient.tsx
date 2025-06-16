'use client';

import { useSearchParams } from 'next/navigation';
import PaulWorksGallery from './PaulWorksGallery';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <PaulWorksGallery lang={lang} />;
}
