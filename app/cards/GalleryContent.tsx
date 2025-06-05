'use client';

import Image from 'next/image';
import styles from '../styles/gallery.module.css';

const CARD_PRICE = 7;

export default function GalleryContent({ lang }: { lang: string }) {
  // Первые 3 — jpg, остальные — png
  const images = [
    ...Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      src: `/images/cards/k${i + 1}.jpg`,
    })),
    ...Array.from({ length: 42 }, (_, i) => ({
      id: i + 4,
      src: `/images/cards/k${i + 4}.png`,
    })),
  ];

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <a
            key={image.id}
            href={`/cards/${image.id}?lang=${lang}`}
            className={styles.galleryItem}
          >
            <Image
              src={image.src}
              alt={`Card ${image.id}`}
              width={400}
              height={400}
              className={styles.image}
              loading='lazy'
            />
            <div className={styles.priceBadge}>{CARD_PRICE} GEL</div>
          </a>
        ))}
      </div>
    </div>
  );
}
