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

const CARD_PRICE = 7;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Math.max(1, Number(value) || 1) : value,
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
          image: `c${productId}.jpeg`,
          amount: formData.amount,
          payment: `${paymentOptions[lang][methodIndex]} ${
            CARD_PRICE * Number(formData.amount)
          } GEL`,
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
          src={`/images/christian-cards/c${productId}.jpeg`}
          alt={`Christian card ${productId}`}
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
          <span className={styles.price}>{CARD_PRICE} GEL</span>
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
                value={formData.name}
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
                value={formData.address}
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
                value={formData.phone}
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
                value={formData.mail}
                className={styles.mailInput}
              />
              <h2>
                {lang === 'RUSSIAN'
                  ? 'Количество:'
                  : lang === 'GEORGIAN'
                  ? 'რაოდენობა:'
                  : 'Amount:'}
              </h2>
              <input
                type='number'
                name='amount'
                min={1}
                max={999}
                value={formData.amount}
                onChange={handleInputChange}
                style={{ width: '60px' }}
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
