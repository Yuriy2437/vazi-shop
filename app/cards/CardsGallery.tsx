'use client';

import Image from 'next/image';
import styles from '@/app/styles/gallery.module.css';

const CARD_PRICE = 7;
const TOTAL_CARDS = 45; // 3 jpg + 42 png

export default function CardsGallery({ lang }: { lang: string }) {
  const images = Array.from({ length: TOTAL_CARDS }, (_, i) => ({
    id: i + 1,
    src: `/images/cards/k${i + 1}.${i < 3 ? 'jpg' : 'png'}`,
  }));

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
              sizes='(max-width: 768px) 50vw, 33vw'
            />
            <div className={styles.priceBadge}>{CARD_PRICE} GEL</div>
          </a>
        ))}
      </div>
    </div>
  );
}
