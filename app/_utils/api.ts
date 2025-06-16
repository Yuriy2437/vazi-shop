export interface OrderData {
  name: string;
  address?: string;
  phone: string;
  mail: string;
  image: string;
  payment: string;
  amount: number;
}

export const createOrder = async (orderData: OrderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};
