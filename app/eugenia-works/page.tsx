import Image from 'next/image';
import styles from '../styles/gallery.module.css';

// Функция определения цены
const getPrice = (id: number): number | null => {
  if (id >= 1 && id <= 15) return 48;
  if (id >= 16 && id <= 24) return 134;
  if (id >= 25 && id <= 27) return 206;
  if (id >= 28 && id <= 32) return 165;
  if (id === 33) return 134;
  if (id >= 34 && id <= 37) return 165;
  if (id >= 38 && id <= 40) return 134;
  if (id >= 41 && id <= 44) return 268;
  if (id === 45) return 165;
  if (id === 46) return 206;
  if (id >= 47 && id <= 48) return 412;
  if (id === 49) return 335;
  if (id === 50) return 310;
  if (id >= 51 && id <= 52) return 330;
  if (id >= 53 && id <= 54) return 310;
  if (id === 55) return 268;
  if (id === 56) return 412;
  if (id === 57) return 206;
  if (id >= 58 && id <= 61) return 268;
  if (id >= 62 && id <= 63) return 94;
  if (id === 64) return 165;
  if (id === 65) return 268;
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
