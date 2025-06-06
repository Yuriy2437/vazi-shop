'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/product.module.css';
import type { Language } from '../types';

interface Props {
  productId: number;
  lang: Language;
  productData: {
    descriptions: Record<Language, string>;
  };
}

const paymentOptions: Record<Language, string[]> = {
  ENGLISH: ['Cash to courier', 'Payment by terminal', 'Pay by card'],
  RUSSIAN: ['Оплата курьеру', 'Оплата по терминалу', 'Оплата картой'],
  GEORGIAN: [
    'ნაღდი ფული კურიერთან',
    'ტერმინალის მეშვეობით გადახდა',
    'ბანკის ბარათით',
  ],
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
    amount: 1,
  });

  // Функция определения цены
  const getPrice = (id: number): number | null => {
    const priceMap: Record<string, number> = {
      '1': 26,
      '2': 20,
      '3-4': 16,
      '5': 65,
      '6-7': 13,
      '8-9': 34,
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

  const handleSubmit = async (methodIndex: number) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: `p${productId}.jpg`,
          amount: formData.amount,
          payment: `${paymentOptions[lang][methodIndex]} ${currentPrice} GEL`,
          paid: 'NO',
        }),
      });

      if (response.ok) {
        if (methodIndex === 2) {
          setShowPaymentModal(true);
        } else {
          alert(
            lang === 'RUSSIAN'
              ? 'Заказ оформлен!'
              : lang === 'GEORGIAN'
              ? 'შეკვეთა გაფორმდა!'
              : 'Order created!'
          );
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
          src={`/images/paul/p${productId}.jpg`}
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
          {lang === 'RUSSIAN'
            ? 'Стоимость: '
            : lang === 'GEORGIAN'
            ? 'ფასი: '
            : 'Price: '}
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
              <h2>
                {lang === 'RUSSIAN'
                  ? 'Ваше имя:'
                  : lang === 'GEORGIAN'
                  ? 'თქვენი სახელი:'
                  : 'Your name:'}
              </h2>
              <input
                type='text'
                name='name'
                maxLength={20}
                onChange={handleInputChange}
              />

              <h2>
                {lang === 'RUSSIAN'
                  ? 'Адрес доставки:'
                  : lang === 'GEORGIAN'
                  ? 'მიწოდების მისამართი:'
                  : 'Delivery address:'}
              </h2>
              <input
                type='text'
                name='address'
                maxLength={30}
                onChange={handleInputChange}
              />

              <h2>
                {lang === 'RUSSIAN'
                  ? 'Ваш телефон:'
                  : lang === 'GEORGIAN'
                  ? 'თქვენი ტელეფონი:'
                  : 'Your phone:'}
              </h2>
              <input
                type='tel'
                name='phone'
                maxLength={20}
                onChange={handleInputChange}
              />

              <h2>
                {lang === 'RUSSIAN'
                  ? 'Ваш мэйл/телеграм:'
                  : lang === 'GEORGIAN'
                  ? 'თქვენი ელფოსტა/ტელეგრამი:'
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
                  handleSubmit(paymentOptions[lang].indexOf(showModal))
                }
              >
                {lang === 'RUSSIAN'
                  ? 'Оформить заказ'
                  : lang === 'GEORGIAN'
                  ? 'შეკვეთის დადასტურება'
                  : 'Place Order'}
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
                {lang === 'RUSSIAN'
                  ? 'ОПЛАТИТЬ КАРТОЙ'
                  : lang === 'GEORGIAN'
                  ? 'ბარათით გადახდა'
                  : 'PAY BY CARD'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
