import type { Language } from '@/app/_utils/types';

// Общее описание для всех открыток
const COMMON_DESCRIPTION: Record<Language, string> = {
  ENGLISH:
    'Postcard by the artist Evgeniya, A5 format, several copies can be ordered',
  RUSSIAN:
    'Открытка авторская художника Евгении, формат А5, можно заказать несколько экземпляров',
  GEORGIAN:
    'საფოსტო ბარათი ავტორის, ევგენიას მიერ, A5 ფორმატი, შესაძლებელია რამდენიმე ეგზემპლარის შეკვეთა',
};

// Генерируем объект для 45 открыток
export const productDetails = Array.from(
  { length: 45 },
  (_, i) => i + 1
).reduce(
  (acc, id) => ({
    ...acc,
    [id]: { descriptions: COMMON_DESCRIPTION },
  }),
  {} as Record<number, { descriptions: Record<Language, string> }>
);
