'use client';

import { useState } from 'react';
import ProductForm from '@/app/_components/ProductDetails/ProductForm';
import { createOrder, OrderData } from '@/app/_utils/api';
import type { Language } from '@/app/_utils/types';
import styles from '@/app/styles/product.module.css';
import Image from 'next/image';
import { getPrice } from '../priceUtils';

interface ProductDetailsProps {
  productId: number;
  lang: Language;
  productData: {
    descriptions: Record<Language, string>;
  };
}

export default function ProductDetails({
  productId,
  lang,
  productData,
}: ProductDetailsProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const price = getPrice(productId);

  const handleSubmit = async (data: { formData: OrderData }) => {
    try {
      await createOrder(data.formData);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(
        'Order creation failed:',
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  };

  if (!price) {
    return <div className={styles.error}>Price information not available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={`/images/eugenia/${productId}.jpg`}
          alt={`Work ${productId}`}
          width={800}
          height={800}
          className={styles.productImage}
          priority
        />
      </div>

      <div className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>
          {productData.descriptions[lang]}
        </h2>
        <p className={styles.price}>Price: {price} GEL</p>

        <ProductForm
          lang={lang}
          price={price}
          imagePath={`/images/eugenia/${productId}.jpg`}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Модальное окно успеха */}
      {isSuccessModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>
              {lang === 'ENGLISH'
                ? 'Thank you for your order!'
                : lang === 'RUSSIAN'
                ? 'Спасибо за заказ!'
                : 'გმადლობთ შეკვეთისთვის!'}
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              {lang === 'ENGLISH'
                ? 'We will contact you soon to confirm the details.'
                : lang === 'RUSSIAN'
                ? 'Мы свяжемся с вами для подтверждения деталей.'
                : 'დეტალების დასადასტურებლად მალე დაგიკავშირდებით.'}
            </p>
            <button
              className={styles.submitButton}
              onClick={() => setIsSuccessModalOpen(false)}
            >
              {lang === 'ENGLISH'
                ? 'OK'
                : lang === 'RUSSIAN'
                ? 'Хорошо'
                : 'კარგი'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
