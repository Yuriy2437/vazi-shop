import type { Language } from '@/app/_utils/types';

// Общее описание для всех открыток
const COMMON_DESCRIPTION: Record<Language, string> = {
  ENGLISH:
    'Christian postcard by master Evgeniya, A5 format, several copies can be ordered',
  RUSSIAN:
    'Открытка христианская мастера Евгении, формат А5, можно заказать несколько экземпляров',
  GEORGIAN:
    'ქრისტიანული საფოსტო ბარათი ოსტატ ევგენიას მიერ, A5 ფორმატი, შესაძლებელია რამდენიმე ეგზემპლარის შეკვეთა',
};

// Генерируем объект для 45 открыток
export const productDetails = Array.from(
  { length: 41 },
  (_, i) => i + 1
).reduce(
  (acc, id) => ({
    ...acc,
    [id]: { descriptions: COMMON_DESCRIPTION },
  }),
  {} as Record<number, { descriptions: Record<Language, string> }>
);
