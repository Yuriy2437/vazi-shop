'use client';

import { useState } from 'react';
import ProductForm from '@/app/_components/ProductDetails/ProductForm';
import { createOrder, OrderData } from '@/app/_utils/api';
import type { Language } from '@/app/_utils/types';
import styles from '@/app/styles/product.module.css';
import Image from 'next/image';

interface ProductDetailsProps {
  productId: number;
  lang: Language;
  productData: {
    descriptions: Record<Language, string>;
    price?: number;
  };
}

export default function ProductDetails({
  productId,
  lang,
  productData,
}: ProductDetailsProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const price = productData.price ?? 7;

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

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={`/images/christian-cards/c${productId}.jpeg`}
          alt={`Christian card ${productId}`}
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

        <ProductForm
          lang={lang}
          price={price}
          imagePath={`/images/christian-cards/c${productId}.jpeg`}
          onSubmit={handleSubmit}
        />
      </div>

      {isSuccessModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{/* Локализованный текст */}</h2>
            <button
              className={styles.submitButton}
              onClick={() => setIsSuccessModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
