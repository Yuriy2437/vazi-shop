// 'use client';
// import { useState } from 'react';
// import Image from 'next/image';
// import styles from '../../styles/product.module.css';
// import type { Language } from '../types';

// // Добавьте константу цены ВНЕ компонента
// const CARD_PRICE = 7;

// interface Props {
//   productId: number;
//   lang: Language;
//   productData: {
//     descriptions: Record<Language, string>;
//   };
// }

// const paymentOptions: Record<Language, string[]> = {
//   ENGLISH: ['Cash to courier', 'Payment by terminal', 'Pay by card'],
//   RUSSIAN: ['Оплата курьеру', 'Оплата по терминалу', 'Оплата картой'],
//   GEORGIAN: [
//     'ნაღდი ფული კურიერთან',
//     'ტერმინალის მეშვეობით გადახდა',
//     'ბანკის ბარათით',
//   ],
// };

// export default function ProductDetails({
//   productId,
//   lang,
//   productData,
// }: Props) {
//   const [showModal, setShowModal] = useState<string | null>(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     mail: '',
//     amount: 1,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'amount' ? Math.max(1, parseInt(value) || 1) : value,
//     });
//   };

//   const handleSubmit = async (methodIndex: number) => {
//     // Определяем расширение файла
//     const ext = productId <= 3 ? '.jpg' : '.png';
//     try {
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           image: `k${productId}${ext}`,
//           amount: formData.amount,
//           payment: `${paymentOptions[lang][methodIndex]} ${
//             CARD_PRICE * Number(formData.amount)
//           } GEL`,
//           paid: 'NO',
//         }),
//       });

//       if (response.ok) {
//         if (methodIndex === 2) {
//           setShowPaymentModal(true);
//         } else {
//           alert(
//             lang === 'RUSSIAN'
//               ? 'Заказ оформлен!'
//               : lang === 'GEORGIAN'
//               ? 'შეკვეთა გაფორმდა!'
//               : 'Order created!'
//           );
//         }
//         setShowModal(null);
//       }
//     } catch (error) {
//       console.error('Ошибка:', error);
//     }
//   };

//   // Определяем расширение файла
//   const ext = productId <= 3 ? '.jpg' : '.png';

//   return (
//     <div className={styles.container}>
//       <div className={styles.imageSection}>
//         <Image
//           src={`/images/cards/k${productId}${ext}`}
//           alt={`Card ${productId}`}
//           width={800}
//           height={800}
//           className={styles.productImage}
//           priority
//         />
//       </div>

//       <div className={styles.divider}></div>

//       <div className={styles.detailsSection}>
//         <h1 className={styles.sectionTitle}>
//           {productData.descriptions[lang]}
//         </h1>

//         <h2 className={styles.sectionTitle}>
//           {lang === 'RUSSIAN'
//             ? 'Стоимость: '
//             : lang === 'GEORGIAN'
//             ? 'ფასი: '
//             : 'Price: '}
//           <span className={styles.price}>{CARD_PRICE} GEL</span>
//         </h2>

//         <div className={styles.optionsContainer}>
//           {paymentOptions[lang].map((option, index) => (
//             <button
//               key={index}
//               className={styles.paymentButton}
//               onClick={() => setShowModal(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         {/* Модальные окна */}
//         {showModal && (
//           <div className={styles.modalOverlay}>
//             <div className={styles.modal}>
//               <h2>
//                 {lang === 'RUSSIAN'
//                   ? 'Ваше имя:'
//                   : lang === 'GEORGIAN'
//                   ? 'თქვენი სახელი:'
//                   : 'Your name:'}
//               </h2>
//               <input
//                 type='text'
//                 name='name'
//                 maxLength={20}
//                 onChange={handleInputChange}
//                 value={formData.name}
//               />

//               <h2>
//                 {lang === 'RUSSIAN'
//                   ? 'Адрес доставки:'
//                   : lang === 'GEORGIAN'
//                   ? 'მიწოდების მისამართი:'
//                   : 'Delivery address:'}
//               </h2>
//               <input
//                 type='text'
//                 name='address'
//                 maxLength={30}
//                 onChange={handleInputChange}
//                 value={formData.address}
//               />

//               <h2>
//                 {lang === 'RUSSIAN'
//                   ? 'Ваш телефон:'
//                   : lang === 'GEORGIAN'
//                   ? 'თქვენი ტელეფონი:'
//                   : 'Your phone:'}
//               </h2>
//               <input
//                 type='tel'
//                 name='phone'
//                 maxLength={20}
//                 onChange={handleInputChange}
//                 value={formData.phone}
//               />

//               <h2>
//                 {lang === 'RUSSIAN'
//                   ? 'Ваш мэйл/телеграм:'
//                   : lang === 'GEORGIAN'
//                   ? 'თქვენი ელფოსტა/ტელეგრამი:'
//                   : 'Your email/telegram:'}
//               </h2>
//               <input
//                 type='text'
//                 name='mail'
//                 maxLength={30}
//                 onChange={handleInputChange}
//                 className={styles.mailInput}
//                 value={formData.mail}
//               />

//               <h2>
//                 {lang === 'RUSSIAN'
//                   ? 'Количество:'
//                   : lang === 'GEORGIAN'
//                   ? 'რაოდენობა:'
//                   : 'Amount:'}
//               </h2>
//               <input
//                 type='number'
//                 name='amount'
//                 min={1}
//                 max={999}
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 style={{ width: '60px' }}
//               />

//               <button
//                 className={styles.submitButton}
//                 onClick={() =>
//                   handleSubmit(paymentOptions[lang].indexOf(showModal))
//                 }
//               >
//                 {lang === 'RUSSIAN'
//                   ? 'Оформить заказ'
//                   : lang === 'GEORGIAN'
//                   ? 'შეკვეთის დადასტურება'
//                   : 'Place Order'}
//               </button>
//             </div>
//           </div>
//         )}

//         {showPaymentModal && (
//           <div className={styles.modalOverlay}>
//             <div className={styles.paymentModal}>
//               <button
//                 className={styles.paymentButton}
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 {lang === 'RUSSIAN'
//                   ? 'ОПЛАТИТЬ КАРТОЙ'
//                   : lang === 'GEORGIAN'
//                   ? 'ბარათით გადახდა'
//                   : 'PAY BY CARD'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/product.module.css';
import type { Language } from '../types';

const CARD_PRICE = 7;

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
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Math.max(1, Number(value) || 1) : value,
    });
  };

  const handleSubmit = async (methodIndex: number) => {
    const ext = productId <= 3 ? '.jpg' : '.png';
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: `k${productId}${ext}`,
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

  const ext = productId <= 3 ? '.jpg' : '.png';

  if (!hydrated) return null;

  return (
    <>
      {isMobile ? (
        /* Мобильная версия */
        <div className={styles.mobileContainer}>
          <div className={styles.mobileImageWrapper}>
            <Image
              src={`/images/cards/k${productId}${ext}`}
              alt={`Card ${productId}`}
              fill
              className={styles.mobileImage}
              priority
            />
          </div>

          <div className={styles.mobileDetails}>
            <h1 className={styles.mobileTitle}>
              {productData.descriptions[lang]}
            </h1>
            <h2 className={styles.mobilePrice}>{CARD_PRICE} GEL</h2>

            <div className={styles.mobilePaymentButtons}>
              {paymentOptions[lang].map((option, index) => (
                <button
                  key={index}
                  className={styles.mobilePaymentButton}
                  onClick={() => setShowModal(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showModal && (
            <div className={styles.fullscreenModal}>
              <div className={styles.mobileModalContent}>
                <h2>
                  {lang === 'RUSSIAN'
                    ? 'Ваше имя:'
                    : lang === 'GEORGIAN'
                    ? 'თქვენი სახელი:'
                    : 'Your name:'}
                </h2>
                <input
                  type="text"
                  name="name"
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
                  type="text"
                  name="address"
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
                  type="tel"
                  name="phone"
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
                  type="text"
                  name="mail"
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
                  type="number"
                  name="amount"
                  min={1}
                  value={formData.amount}
                  onChange={handleInputChange}
                />

                <button
                  className={styles.mobileSubmitButton}
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
        </div>
      ) : (
        /* Десктопная версия */
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <Image
              src={`/images/cards/k${productId}${ext}`}
              alt={`Card ${productId}`}
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
                    type="text"
                    name="name"
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
                    type="text"
                    name="address"
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
                    type="tel"
                    name="phone"
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
                    type="text"
                    name="mail"
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
                    type="number"
                    name="amount"
                    min={1}
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
    </>
  );
}
