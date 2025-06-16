'use client';

import Image from 'next/image';
import styles from '@/app/styles/gallery.module.css';
import { getPrice } from './priceUtils';

export default function EugeniaGallery({ lang }: { lang: string }) {
  const images = Array.from({ length: 65 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      src: `/images/eugenia/${id}.jpg`,
      price: getPrice(id),
    };
  });

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <a
            key={image.id}
            href={`/eugenia-works/${image.id}?lang=${lang}`}
            className={styles.galleryItem}
          >
            <Image
              src={image.src}
              alt={`Work ${image.id}`}
              width={400}
              height={400}
              className={styles.image}
              loading='lazy'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
            {image.price && (
              <div className={styles.priceBadge}>{image.price} GEL</div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
