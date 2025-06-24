'use client';

import Image from 'next/image';
import styles from '@/app/styles/gallery.module.css';
import { getPrice } from './priceUtils';

export default function TeaGallery({ lang }: { lang: string }) {
  const products = Array.from({ length: 2 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      src: `/images/tea/t${id}.jpg`,
      price: getPrice(id),
    };
  });

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {products.map((product) => (
          <a
            key={product.id}
            href={`/tea/${product.id}?lang=${lang}`}
            className={styles.galleryItem}
          >
            <Image
              src={product.src}
              alt={`Product ${product.id}`}
              width={400}
              height={400}
              className={styles.image}
              loading='lazy'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
            {product.price && (
              <div className={styles.priceBadge}>{product.price} GEL</div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
