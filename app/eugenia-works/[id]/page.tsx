// 'use client'
// import { useState } from 'react'
// import { useSearchParams, useParams } from 'next/navigation'
// import Image from 'next/image'
// import styles from '../../styles/product.module.css'
// import { productDetails } from '../../../lib/productDetails'

// type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN'
// type PaymentMethod = 'courier' | 'store' | 'card' | null
// const LANGUAGES = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'] as const

// const paymentOptions: Record<Language, string[]> = {
//   ENGLISH: ['Cash to courier', 'Cash in warehouse', 'Pay by card'],
//   RUSSIAN: ['Оплата курьеру', 'Оплата на складе', 'Оплата картой'],
//   GEORGIAN: ['ნაღდი ფული კურიერთან', 'ნაღდი ფული მარაგში', 'ბანკის ბარათით']
// }

// export default function ProductPage() {
//   const paramsRoute = useParams()
//   const searchParams = useSearchParams()
//   const [showModal, setShowModal] = useState<PaymentMethod>(null)
//   const [showPaymentModal, setShowPaymentModal] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     mail: '',
//   })

//   // Получаем ID товара и язык
//   const productId = parseInt(paramsRoute.id as string)
//   const langParam = searchParams.get('lang')
//   const lang: Language = LANGUAGES.includes(langParam as Language)
//     ? (langParam as Language)
//     : 'ENGLISH'

//   // Функция определения цены
//   const getPrice = (id: number): number | null => {
//     if (id >= 1 && id <= 15) return 46
//     if (id >= 16 && id <= 24) return 130
//     if (id >= 25 && id <= 27) return 200
//     if (id >= 28 && id <= 32) return 160
//     if (id === 33) return 130
//     if (id >= 34 && id <= 37) return 160
//     if (id >= 38 && id <= 40) return 130
//     return null
//   }

//   const productData = productDetails[productId]
//   const currentPrice = getPrice(productId)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (method: PaymentMethod) => {
//     try {
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           image: `${productId}.jpg`,
//           payment: `payment ${method === 'courier' ? 'to courier'
//                     : method === 'store' ? 'in store'
//                     : 'by card'} ${currentPrice} GEL`,
//           paid: 'NO'
//         })
//       })

//       if (response.ok) {
//         if (method === 'card') {
//           setShowModal(null)
//           setShowPaymentModal(true)
//         } else {
//           alert(lang === 'RUSSIAN' ? 'Заказ оформлен!' : 'Order created!')
//           setShowModal(null)
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка:', error)
//     }
//   }

//   if (!productData) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.error}>
//           {lang === 'RUSSIAN' ? 'Товар не найден' : 'Product not found'}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.imageSection}>
//         <Image
//           src={`/images/eugenia/${productId}.jpg`}
//           alt={`Product ${productId}`}
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
//           {lang === 'RUSSIAN' ? 'Стоимость: ' : 'Price: '}
//           <span className={styles.price}>{currentPrice} GEL</span>
//         </h2>

//         {/* Секция с кнопками оплаты */}
//         <h2 className={styles.sectionTitle}>
//           {lang === 'RUSSIAN' ? 'Варианты оплаты' : 'Payment options'}
//         </h2>
//         <div className={styles.optionsContainer}>
//           <button
//             className={styles.paymentButton}
//             onClick={() => setShowModal('courier')}
//           >
//             {paymentOptions[lang][0]}
//           </button>

//           <button
//             className={styles.paymentButton}
//             onClick={() => setShowModal('store')}
//           >
//             {paymentOptions[lang][1]}
//           </button>

//           <button
//             className={styles.paymentButton}
//             onClick={() => setShowModal('card')}
//           >
//             {paymentOptions[lang][2]}
//           </button>
//         </div>

//         {/* Модальные окна */}
//         {lang === 'RUSSIAN' && (
//           <>
//             {showModal && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <h2>Ваше имя:</h2>
//                   <input
//                     type="text"
//                     name="name"
//                     maxLength={20}
//                     onChange={handleInputChange}
//                   />

//                   <h2>
//                     {showModal === 'store' ? 'Адрес получения:' : 'Адрес доставки:'}
//                   </h2>
//                   {showModal === 'store' ? (
//                     <div className={styles.pickupAddress}>90, Besraion Zhgenti</div>
//                   ) : (
//                     <input
//                       type="text"
//                       name="address"
//                       maxLength={30}
//                       onChange={handleInputChange}
//                     />
//                   )}

//                   <h2>Ваш телефон:</h2>
//                   <input
//                     type="tel"
//                     name="phone"
//                     maxLength={20}
//                     onChange={handleInputChange}
//                   />

//                   <h2>Ваш мэйл/телеграм:</h2>
//                   <input
//                     type="text"
//                     name="mail"
//                     maxLength={30}
//                     onChange={handleInputChange}
//                   />

//                   <button
//                     className={styles.submitButton}
//                     onClick={() => handleSubmit(showModal)}
//                   >
//                     Оформить заказ
//                   </button>
//                 </div>
//               </div>
//             )}

//             {showPaymentModal && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.paymentModal}>
//                   <button
//                     className={styles.paymentButton}
//                     onClick={() => {
//                       setShowPaymentModal(false)
//                       // В будущем: переход на сервис оплаты
//                     }}
//                   >
//                     ОПЛАТИТЬ КАРТОЙ
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// Серверная часть - статическая генерация
// import { productDetails } from '@/lib/productDetails';
// import type { Language } from '@/lib/types';
// import ProductDetails from './ProductDetails';

// Генерация статических путей
// export async function generateStaticParams() {
//   return Object.keys(productDetails).map((id) => ({
//     id: id.toString(),
//   }));
// }

// Типы для пропсов
// interface PageProps {
//   params: { id: string };
//   searchParams: { lang?: Language };
// }

// Основной серверный компонент
// export default function ProductPage({ params, searchParams }: PageProps) {
//   const productId = parseInt(params.id);
//   const lang = validateLanguage(searchParams.lang);
//   const productData = productDetails[productId];

//   if (!productData) {
//     return <div className='error'>Product not found</div>;
//   }

//   return (
//     <ProductDetails
//       productId={productId}
//       lang={lang}
//       productData={productData}
//     />
//   );
// }

// Валидация языка
// function validateLanguage(lang?: string): Language {
//   const validLanguages: Language[] = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'];
//   return validLanguages.includes(lang as Language)
//     ? (lang as Language)
//     : 'ENGLISH';
// }

// Серверный компонент
import { productDetails } from '@/lib/productDetails';
import ProductDetails from './ProductDetails';

export async function generateStaticParams() {
  return Object.keys(productDetails).map((id) => ({ id }));
}

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  const lang = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
    searchParams.lang || ''
  )
    ? (searchParams.lang as 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN')
    : 'ENGLISH';

  const productId = parseInt(params.id);
  const productData = productDetails[productId];

  if (!productData) return <div>Product not found</div>;

  return (
    <ProductDetails
      productId={productId}
      lang={lang}
      productData={productData}
    />
  );
}
