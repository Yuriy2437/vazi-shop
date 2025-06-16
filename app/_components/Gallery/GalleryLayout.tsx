import { Suspense } from 'react';
import GallerySkeleton from './GallerySkeleton';

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<GallerySkeleton />}>{children}</Suspense>;
}
