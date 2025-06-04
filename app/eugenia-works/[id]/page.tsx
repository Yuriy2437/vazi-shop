// import { productDetails } from '../productDetails';
// import type { Language } from '../types';
// import ProductDetails from './ProductDetails';

// export async function generateStaticParams() {
//   return Object.keys(productDetails).map((id) => ({
//     id: id.toString(), // Гарантируем строковый формат
//   }));
// }

// export default async function Page({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ lang?: string }>;
// }) {
// Ожидаем разрешения Promise
//   const { id } = await params;
//   const { lang } = await searchParams;

// Валидация языка
//   const langParam = searchParams.lang?.toUpperCase()
//   const validLang: Language = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
//     lang || ''
//   )
//     ? (lang as Language)
//     : 'ENGLISH';

//   const validLangs: Language[] = ['ENGLISH', 'RUSSIAN', 'GEORGIAN']
//   const lang: Language = validLangs.includes(langParam as Language)
//     ? (langParam as Language)
//     : 'ENGLISH'

//   const productId = parseInt(id);
//   const productData = productDetails[productId];

//   if (!productData) return <div>Product not found</div>;

//   return (
//     <ProductDetails
//       productId={productId}
//       lang={validLang}
//       productData={productData}
//     />
//   );
// }

import { productDetails } from '../productDetails';
import type { Language } from '../types';
import ProductDetails from './ProductDetails';

// export async function generateStaticParams() {
//   return Array.from({ length: 65 }, (_, i) => ({ id: (i + 1).toString() }));
// }

export async function generateStaticParams() {
  return Object.keys(productDetails).map((id) => ({
    id: id.toString(),
  }));
}

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  const validLangs: Language[] = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'];
  const langParam = searchParams.lang?.toUpperCase() || 'ENGLISH';

  // Явное приведение типа после проверки
  const lang: Language = validLangs.includes(langParam as Language)
    ? (langParam as Language)
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
