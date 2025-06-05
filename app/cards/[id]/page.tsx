import { productDetails } from '../productDetails';
import type { Language } from '../types';
import ProductDetails from './ProductDetails';

export async function generateStaticParams() {
  return Array.from({ length: 45 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang } = await searchParams;

  const langUpper = lang?.toUpperCase() ?? 'ENGLISH';
  const validLang: Language = ['ENGLISH', 'RUSSIAN', 'GEORGIAN'].includes(
    langUpper
  )
    ? (langUpper as Language)
    : 'ENGLISH';

  const productId = parseInt(id, 10);
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
