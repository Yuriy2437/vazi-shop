export type Language = 'ENGLISH' | 'RUSSIAN' | 'GEORGIAN';

export type ProductData = {
  descriptions: Record<Language, string>;
  price?: number;
  imagePath: string;
};
