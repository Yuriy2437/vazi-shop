import Image from 'next/image';
import styles from '../styles/gallery.module.css';

// Функция определения цены
const getPrice = (id: number): number | null => {
  if (id >= 1 && id <= 15) return 46;
  if (id >= 16 && id <= 24) return 130;
  if (id >= 25 && id <= 27) return 200;
  if (id >= 28 && id <= 32) return 160;
  if (id === 33) return 130;
  if (id >= 34 && id <= 37) return 160;
  if (id >= 38 && id <= 40) return 130;
  return null;
};

export default function EugeniaWorksPage() {
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
            href={`/eugenia-works/${image.id}`}
            className={styles.galleryItem}
          >
            <Image
              src={`/images/eugenia/${image.id}.jpg`}
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
