'use client';

import Image from 'next/image';
import styles from '../styles/gallery.module.css';

const getPrice = (id: number): number | null => {
  if (id === 1) return 26;
  if (id === 2) return 20;
  if (id >= 3 && id <= 4) return 16;
  if (id === 5) return 65;
  if (id >= 6 && id <= 7) return 13;
  if (id >= 8 && id <= 9) return 34;
  return null;
};

export default function GalleryContent({ lang }: { lang: string }) {
  const images = Array.from({ length: 9 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      src: `/images/paul/p${id}.jpg`,
      price: getPrice(id),
    };
  });

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <a
            key={image.id}
            href={`/paul-works/${image.id}?lang=${lang}`}
            className={styles.galleryItem}
          >
            <Image
              src={image.src}
              alt={`Work ${image.id}`}
              width={400}
              height={400}
              className={styles.image}
              loading='lazy'
            />
            {image.price !== null && (
              <div className={styles.priceBadge}>{image.price} GEL</div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
