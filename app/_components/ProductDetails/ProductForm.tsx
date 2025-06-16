'use client';

import { useState } from 'react';
import { paymentOptions, formLabels } from '@/app/_utils/i18n';
import type { Language } from '@/app/_utils/types';
import styles from '@/app/styles/form.module.css';

interface ProductFormProps {
  lang: Language;
  price: number;
  imagePath: string;
  onSubmit: (data: {
    paymentMethod: string;
    amount: number;
    formData: {
      name: string;
      address: string;
      phone: string;
      mail: string;
      image: string;
      payment: string;
      amount: number;
    };
  }) => void;
}

export default function ProductForm({
  lang,
  price,
  imagePath,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    phone: string;
    mail: string;
    amount: number;
  }>({
    name: '',
    address: '',
    phone: '',
    mail: '',
    amount: 1,
  });
  const [selectedPayment, setSelectedPayment] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const labels = formLabels[lang];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayment(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        paymentMethod: paymentOptions[lang][selectedPayment],
        amount: formData.amount,
        formData: {
          ...formData,
          image: imagePath,
          payment: `${paymentOptions[lang][selectedPayment]} ${
            price * formData.amount
          } GEL`,
          amount: formData.amount,
        },
      });
      setSuccess(true);
      setFormData({
        name: '',
        address: '',
        phone: '',
        mail: '',
        amount: 1,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while submitting the order.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {labels.name}
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.formInput}
            autoComplete='name'
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {labels.address}
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className={styles.formInput}
            autoComplete='street-address'
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {labels.phone}
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.formInput}
            autoComplete='tel'
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {labels.mail}
          <input
            type='text'
            name='mail'
            value={formData.mail}
            onChange={handleChange}
            required
            className={styles.formInput}
            autoComplete='email'
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {labels.amount}
          <input
            type='number'
            name='amount'
            value={formData.amount}
            min={1}
            onChange={handleChange}
            required
            className={styles.formInput}
            style={{ maxWidth: 100 }}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {lang === 'ENGLISH'
            ? 'Payment method:'
            : lang === 'RUSSIAN'
            ? 'Способ оплаты:'
            : 'გადახდის მეთოდი:'}
          <select
            value={selectedPayment}
            onChange={handlePaymentChange}
            className={styles.formSelect}
          >
            {paymentOptions[lang].map((option, idx) => (
              <option key={option} value={idx}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.total}>
        {lang === 'ENGLISH'
          ? 'Total:'
          : lang === 'RUSSIAN'
          ? 'Итого:'
          : 'ჯამი:'}{' '}
        {price * formData.amount} GEL
      </div>
      <button
        type='submit'
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting
          ? lang === 'ENGLISH'
            ? 'Sending...'
            : lang === 'RUSSIAN'
            ? 'Отправка...'
            : 'გაგზავნა...'
          : labels.submit}
      </button>
      {success && (
        <div className={styles.successMessage}>
          {lang === 'ENGLISH'
            ? 'Order sent!'
            : lang === 'RUSSIAN'
            ? 'Заказ отправлен!'
            : 'შეკვეთა გაიგზავნა!'}
        </div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
}
