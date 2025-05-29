// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import styles from '../styles/gallery.module.css';

// // type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN';

// export default function EugeniaWorks() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const lang = searchParams.get('lang') || 'ENGLISH';

//   // Функция для определения цены по номеру изображения
//   const getPrice = (id: number): number | null => {
//     if (id >= 1 && id <= 15) return 46;
//     if (id >= 16 && id <= 24) return 130;
//     if (id >= 25 && id <= 27) return 200;
//     if (id >= 28 && id <= 32) return 160;
//     if (id === 33) return 130;
//     if (id >= 34 && id <= 37) return 160;
//     if (id >= 38 && id <= 40) return 130;
//     return null;
//   };

//   const images = Array.from({ length: 57 }, (_, i) => {
//     const id = i + 1;
//     return {
//       id,
//       src: `/images/eugenia/${id}.jpg`,
//       price: getPrice(id),
//     };
//   });

//   const handleImageClick = (id: number) => {
//     router.push(`/eugenia-works/${id}?lang=${lang}`);
//   };

//   return (
//     <div className={styles.galleryContainer}>
//       <div className={styles.galleryGrid}>
//         {images.map((image) => (
//           <div
//             key={image.id}
//             className={styles.galleryItem}
//             onClick={() => handleImageClick(image.id)}
//             style={{ cursor: 'pointer' }}
//           >
//             <Image
//               src={image.src}
//               alt={`Work ${image.id} (${lang})`}
//               width={400}
//               height={400}
//               className={styles.image}
//               loading='lazy'
//             />
//             {image.price !== null && (
//               <div className={styles.priceBadge}>{image.price} GEL</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/eugenia-works/page.tsx
// import { productDetails } from '@/lib/productDetails';
// import styles from '../styles/gallery.module.css';

// export async function generateStaticParams() {
//   return Object.keys(productDetails).map((id) => ({
//     id: id.toString(),
//   }));
// }

// export default function EugeniaWorksPage() {
//   const images = Array.from({ length: 57 }, (_, i) => i + 1);

//   return (
//     <div className={styles.galleryContainer}>
//       <div className={styles.galleryGrid}>
//         {images.map((id) => (
//           <a
//             key={id}
//             href={`/eugenia-works/${id}`}
//             className={styles.galleryItem}
//           >
//             <Image
//               src={`/images/eugenia/${id}.jpg`}
//               alt={`Work ${id}`}
//               width={400}
//               height={400}
//               className={styles.image}
//               loading='lazy'
//             />
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

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
  const images = Array.from({ length: 57 }, (_, i) => {
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
