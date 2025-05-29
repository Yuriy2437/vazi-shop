'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/product.module.css';
import type { Language } from '@/lib/types';

// interface ProductDetailsProps {
interface Props {
  productId: number;
  lang: Language;
  productData: {
    descriptions: Record<Language, string>;
  };
}

const paymentOptions: Record<Language, string[]> = {
  ENGLISH: ['Cash to courier', 'Cash in warehouse', 'Pay by card'],
  RUSSIAN: ['Оплата курьеру', 'Оплата на складе', 'Оплата картой'],
  GEORGIAN: ['ნაღდი ფული კურიერთან', 'ნაღდი ფული მარაგში', 'ბანკის ბარათით'],
};

export default function ProductDetails({
  productId,
  lang,
  productData,
}: Props) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    mail: '',
  });

  // Функция определения цены
  const getPrice = (id: number): number | null => {
    const priceMap: Record<string, number> = {
      '1-15': 46,
      '16-24': 130,
      '25-27': 200,
      '28-32': 160,
      '33': 130,
      '34-37': 160,
      '38-40': 130,
    };

    for (const range in priceMap) {
      const [min, max] = range.split('-').map(Number);
      if ((max && id >= min && id <= max) || id === min) {
        return priceMap[range];
      }
    }
    return null;
  };

  const currentPrice = getPrice(productId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (method: string) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: `${productId}.jpg`,
          payment: `${
            paymentOptions[lang][method === 'card' ? 2 : 0]
          } ${currentPrice} GEL`,
          paid: 'NO',
        }),
      });

      if (response.ok) {
        if (method === 'card') {
          setShowPaymentModal(true);
        } else {
          alert(lang === 'RUSSIAN' ? 'Заказ оформлен!' : 'Order created!');
        }
        setShowModal(null);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={`/images/eugenia/${productId}.jpg`}
          alt={`Product ${productId}`}
          width={800}
          height={800}
          className={styles.productImage}
          priority
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.detailsSection}>
        <h1 className={styles.sectionTitle}>
          {productData.descriptions[lang]}
        </h1>

        <h2 className={styles.sectionTitle}>
          {lang === 'RUSSIAN' ? 'Стоимость: ' : 'Price: '}
          <span className={styles.price}>{currentPrice} GEL</span>
        </h2>

        <div className={styles.optionsContainer}>
          {paymentOptions[lang].map((option, index) => (
            <button
              key={index}
              className={styles.paymentButton}
              onClick={() => setShowModal(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Модальные окна */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{lang === 'RUSSIAN' ? 'Ваше имя:' : 'Your name:'}</h2>
              <input
                type='text'
                name='name'
                maxLength={20}
                onChange={handleInputChange}
              />

              <h2>
                {showModal === paymentOptions[lang][1]
                  ? lang === 'RUSSIAN'
                    ? 'Адрес получения:'
                    : 'Pickup address:'
                  : lang === 'RUSSIAN'
                  ? 'Адрес доставки:'
                  : 'Delivery address:'}
              </h2>

              {showModal === paymentOptions[lang][1] ? (
                <div className={styles.pickupAddress}>90, Besraion Zhgenti</div>
              ) : (
                <input
                  type='text'
                  name='address'
                  maxLength={30}
                  onChange={handleInputChange}
                />
              )}

              <h2>{lang === 'RUSSIAN' ? 'Ваш телефон:' : 'Your phone:'}</h2>
              <input
                type='tel'
                name='phone'
                maxLength={20}
                onChange={handleInputChange}
              />

              <h2>
                {lang === 'RUSSIAN'
                  ? 'Ваш мэйл/телеграм:'
                  : 'Your email/telegram:'}
              </h2>
              <input
                type='text'
                name='mail'
                maxLength={30}
                onChange={handleInputChange}
              />

              <button
                className={styles.submitButton}
                onClick={() =>
                  handleSubmit(
                    paymentOptions[lang].indexOf(showModal).toString()
                  )
                }
              >
                {lang === 'RUSSIAN' ? 'Оформить заказ' : 'Place Order'}
              </button>
            </div>
          </div>
        )}

        {showPaymentModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.paymentModal}>
              <button
                className={styles.paymentButton}
                onClick={() => setShowPaymentModal(false)}
              >
                {lang === 'RUSSIAN' ? 'ОПЛАТИТЬ КАРТОЙ' : 'PAY BY CARD'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
