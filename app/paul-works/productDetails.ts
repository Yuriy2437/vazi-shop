import type { Language } from '@/app/_utils/types';

export const productDetails: Record<
  number,
  {
    descriptions: Record<Language, string>;
  }
> = {
  1: {
    descriptions: {
      ENGLISH: 'Oak candleholder, rectangular, 10*9*5 cm',
      RUSSIAN: 'Подсвечник из дуба, прямоугольный, 10*9*5 см',
      GEORGIAN: 'მუხის სასანთლე, მართკუთხა, 10*9*5 სმ',
    },
  },
  2: {
    descriptions: {
      ENGLISH: 'Pine candleholder, round, 10*6.5 cm',
      RUSSIAN: 'Подсвечник из сосны,  круглый, 10*6,5 см',
      GEORGIAN: 'ფიჭვის სასანთლე, მრგვალი, 10*6.5 სმ',
    },
  },
  3: {
    descriptions: {
      ENGLISH: 'Wooden magnet from saw cut, round, diameter 6.5 cm',
      RUSSIAN: 'Магнит из спила, круглый, диаметр 6,5 см',
      GEORGIAN: 'ხერხით მოჭრილი მაგნიტი, მრგვალი, დიამეტრი 6.5 სმ',
    },
  },
  4: {
    descriptions: {
      ENGLISH: 'Wooden Bookmark, 16*6 cm',
      RUSSIAN: 'Закладка из дерева, 16*6 см',
      GEORGIAN: 'ხის სანიშნე, 16*6 სმ',
    },
  },
  5: {
    descriptions: {
      ENGLISH: 'Panel on wood, 25*8*2 cm',
      RUSSIAN: 'Панно на дереве,  25*8*2 см',
      GEORGIAN: 'პანელი ხეზე, 25*8*2 სმ',
    },
  },
  6: {
    descriptions: {
      ENGLISH: 'Keychain "Khinkali", 14 cm',
      RUSSIAN: 'Брелок «Хинкали», 14 см',
      GEORGIAN: 'გასაღების რგოლი "ხინკალი", 14 სმ',
    },
  },
  7: {
    descriptions: {
      ENGLISH: 'Keychain “TV Tower”, 16 cm',
      RUSSIAN: 'Брелок «Телебашня», 16 см',
      GEORGIAN: 'გასაღების რგოლი „ტელევიზიის კოშკი“, 16 სმ',
    },
  },
  8: {
    descriptions: {
      ENGLISH: 'Paper stand, wenge color, diameter and height 17 cm',
      RUSSIAN: 'Подставка под бумагу, цвет «венге», диаметр и высота 17 см',
      GEORGIAN: 'ქაღალდის სადგამი, ვენგეს ფერი, დიამეტრი და სიმაღლე 17 სმ',
    },
  },
  9: {
    descriptions: {
      ENGLISH: 'Paper stand, rosewood color, diameter and height 17 cm',
      RUSSIAN: 'Подставка под бумагу, цвет «палисандр», диаметр и высота 17 см',
      GEORGIAN: 'ქაღალდის სადგამი, ვარდის ხის ფერი, დიამეტრი და სიმაღლე 17 სმ',
    },
  },
};
