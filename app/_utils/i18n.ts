import { Language } from './types';

export const paymentOptions: Record<Language, string[]> = {
  ENGLISH: [
    'Cash to the courier',
    'By card via courier terminal',
    // 'By card online',
  ],
  RUSSIAN: [
    'Наличными курьеру',
    'Картой через терминал курьера',
    // 'Оплата картой',
  ],
  GEORGIAN: [
    'ნაღდი ფული კურიერთან',
    'ბარათით კურიერის ტერმინალის მეშვეობით',
    // 'ბარათით ონლაინ',
  ],
};

export const formLabels: Record<Language, Record<string, string>> = {
  ENGLISH: {
    name: 'Your name:',
    address: 'Delivery address:',
    phone: 'Your phone:',
    mail: 'Your email/telegram:',
    amount: 'Amount:',
    submit: 'Place Order',
  },
  RUSSIAN: {
    name: 'Ваше имя:',
    address: 'Адрес доставки:',
    phone: 'Ваш телефон:',
    mail: 'Ваш мэйл/телеграм:',
    amount: 'Количество:',
    submit: 'Оформить заказ',
  },
  GEORGIAN: {
    name: 'თქვენი სახელი:',
    address: 'მიწოდების მისამართი:',
    phone: 'თქვენი ტელეფონი:',
    mail: 'თქვენი ელფოსტა/ტელეგრამი:',
    amount: 'რაოდენობა:',
    submit: 'შეკვეთის დადასტურება',
  },
};
