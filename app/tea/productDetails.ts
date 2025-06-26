import type { Language } from '@/app/_utils/types';

export const productDetails: Record<
  number,
  {
    descriptions: Record<Language, string>;
  }
> = {
  1: {
    descriptions: {
      ENGLISH: 'Herbal tea from Siberia with chaga and "Saygon Dalia", 50 gr',
      RUSSIAN: 'Чай травяной из Сибири чаговый с саган-дайля, 50 гр.',
      GEORGIAN: 'მცენარეული ჩაი ჩაგა საგან-დეილიით, 50 გრ',
    },
  },
  2: {
    descriptions: {
      ENGLISH: 'Siberian cedar tea "Power of the Taiga", 50 gr.',
      RUSSIAN: 'Чай кедровый из Сибири "Сила тайги", 50 гр.',
      GEORGIAN: 'კედრის ჩაი "ტაიგის ძალა", 50 გრ.',
    },
  },
};
