'use client';

import { useSearchParams } from 'next/navigation';
import EugeniaGallery from './EugeniaGallery';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'ENGLISH';

  return <EugeniaGallery lang={lang} />;
}
