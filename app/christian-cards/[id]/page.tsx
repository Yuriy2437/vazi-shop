import { productDetails } from '../productDetails';
import type { Language } from '@/app/_utils/types';
import ProductDetails from './ProductDetails';

export async function generateStaticParams() {
  return Array.from({ length: 41 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  const langUpper = searchParams.lang?.toUpperCase() ?? 'ENGLISH';
  const validLang: Language = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
    langUpper
  )
    ? (langUpper as Language)
    : 'ENGLISH';

  const productId = parseInt(params.id, 10);
  const productData = productDetails[productId];

  if (!productData) return <div>Card not found</div>;

  return (
    <ProductDetails
      productId={productId}
      lang={validLang}
      productData={productData}
    />
  );
}
