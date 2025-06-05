'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/page.module.css';

type Order = {
  _id: string;
  image: string;
  amount: number;
  name: string;
  address: string;
  phone: string;
  mail: string;
  payment: string; // Уже содержит итоговую сумму (price * amount)
  paid: string;
  createdAt: string;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [status, router]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paid: newStatus }),
      });

      if (res.ok) {
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, paid: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Orders Management</h1>

      <div className={styles.ordersTable}>
        <div className={styles.tableHeader}>
          <span>Файл</span>
          <span>Количество</span>
          <span>Имя</span>
          <span>Адрес</span>
          <span>Телефон</span>
          <span>Мэйл</span>
          <span>Оплата</span> {/* Здесь уже итоговая сумма */}
          <span>Оплачено</span>
          <span>Дата</span>
          <span>Удалить</span>
        </div>

        <div className={styles.tableBody}>
          {orders.map((order) => {
            // Убрали парсинг суммы — используем payment как есть
            const isCard = /(card|картой|ბარათით)/i.test(order.payment);

            const paymentText = order.payment.replace(
              /(\d+)\s(GEL)/,
              '$1\u00A0$2'
            );

            return (
              <div key={order._id} className={styles.tableRow}>
                <span className={styles.breakable}>{order.image}</span>
                <span>{order.amount}</span>
                <span className={styles.breakable}>{order.name}</span>
                <span className={styles.breakable}>{order.address}</span>
                <span className={styles.breakable}>{order.phone}</span>
                <span className={styles.breakable}>{order.mail}</span>
                {/* Выводим payment без изменений */}
                {/* <span className={styles.breakable}>{order.payment}</span> */}
                <span
                  className={`${styles.breakable} ${styles.noWrap}`}
                  dangerouslySetInnerHTML={{ __html: paymentText }}
                />
                <span>
                  {isCard ? (
                    order.paid === 'YES' ? (
                      'YES'
                    ) : (
                      'NO'
                    )
                  ) : (
                    <select
                      value={order.paid}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={styles.statusSelect}
                    >
                      <option value='NO'>NO</option>
                      <option value='YES'>YES</option>
                    </select>
                  )}
                </span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
