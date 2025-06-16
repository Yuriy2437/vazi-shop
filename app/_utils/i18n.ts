import { Language } from './types';

export const paymentOptions: Record<Language, string[]> = {
  ENGLISH: ['Cash to courier', 'Payment by terminal', 'Pay by card'],
  RUSSIAN: ['Оплата курьеру', 'Оплата по терминалу', 'Оплата картой'],
  GEORGIAN: [
    'ნაღდი ფული კურიერთან',
    'ტერმინალის მეშვეობით გადახდა',
    'ბანკის ბარათით',
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
