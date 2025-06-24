import type { Language } from '@/app/_utils/types';

export const productDetails: Record<
  number,
  {
    descriptions: Record<Language, string>;
  }
> = {
  1: {
    descriptions: {
      ENGLISH: 'Herbal tea chaga with sagan-daylya, 50 gr',
      RUSSIAN: 'Чай травяной чаговый с саган-дайля, 50 гр.',
      GEORGIAN: 'მცენარეული ჩაი ჩაგა საგან-დეილიით, 50 გრ',
    },
  },
  2: {
    descriptions: {
      ENGLISH: 'Cedar tea "Power of the Taiga", 50 gr.',
      RUSSIAN: 'Чай кедровый "Сила тайги", 50 гр.',
      GEORGIAN: 'კედრის ჩაი "ტაიგის ძალა", 50 გრ.',
    },
  },
};
