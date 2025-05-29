'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/page.module.css';

type Order = {
  _id: string;
  image: string;
  name: string;
  address: string;
  phone: string;
  mail: string;
  payment: string;
  paid: string;
  createdAt: string;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  // Все хуки должны быть ВЫШЕ условных операторов
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    // Загрузка данных только для авторизованных
    else if (status === 'authenticated') {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [status, router]); // Добавлен status в зависимости

  if (status === 'loading') {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!session) {
    return null; // или сообщение о необходимости входа
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete');
      }

      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete order');
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Orders Management</h1>

      <div className={styles.ordersTable}>
        <div className={styles.tableHeader}>
          <span>Файл</span>
          <span>Имя</span>
          <span>Адрес</span>
          <span>Телефон</span>
          <span>Мэйл</span>
          <span>Оплата</span>
          <span>Оплачено</span>
          <span>Дата</span>
          <span>Удалить</span>
        </div>

        <div className={styles.tableBody}>
          {orders.map((order) => (
            <div key={order._id} className={styles.tableRow}>
              <span>{order.image}</span>
              <span>{order.name}</span>
              <span>{order.address}</span>
              <span>{order.phone}</span>
              <span>{order.mail}</span>
              <span>{order.payment}</span>
              <span>{order.paid}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(order._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
