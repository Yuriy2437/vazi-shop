'use client';

import Image from 'next/image';
import styles from '../styles/gallery.module.css';

const CARD_PRICE = 7;

export default function GalleryContent({ lang }: { lang: string }) {
  // 41 изображение: c1.jpeg ... c41.jpeg
  const images = Array.from({ length: 41 }, (_, i) => ({
    id: i + 1,
    src: `/images/christian-cards/c${i + 1}.jpeg`,
  }));

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <a
            key={image.id}
            href={`/christian-cards/${image.id}?lang=${lang}`}
            className={styles.galleryItem}
          >
            <Image
              src={image.src}
              alt={`Christian card ${image.id}`}
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
