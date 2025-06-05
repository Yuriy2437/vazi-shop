import { productDetails } from '../productDetails';
import type { Language } from '../types';
import ProductDetails from './ProductDetails';

export async function generateStaticParams() {
  return Object.keys(productDetails).map((id) => ({
    id: id.toString(),
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  // Ожидаем разрешения Promise
  const { id } = await params;
  const { lang } = await searchParams;

  // Валидация языка
  const langUpper = lang?.toUpperCase() ?? 'ENGLISH';
  const validLang: Language = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
    langUpper
  )
    ? (langUpper as Language)
    : 'ENGLISH';

  const productId = parseInt(id);
  const productData = productDetails[productId];

  if (!productData) return <div>Product not found</div>;

  return (
    <ProductDetails
      productId={productId}
      lang={validLang}
      productData={productData}
    />
  );
}
