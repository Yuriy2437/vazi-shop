import { Suspense } from 'react';
import GallerySkeleton from './GallerySkeleton';
import GalleryClient from './GalleryClient';

export default function EugeniaWorksPage() {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <GalleryClient />
    </Suspense>
  );
}
