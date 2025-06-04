// 'use client';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from '../styles/page.module.css';

// type Order = {
//   _id: string;
//   image: string;
//   amount: number; // <-- добавлено поле
//   name: string;
//   address: string;
//   phone: string;
//   mail: string;
//   payment: string;
//   paid: string;
//   createdAt: string;
// };

// export default function AdminPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     } else if (status === 'authenticated') {
//       fetchOrders();
//     }
//   }, [status, router]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch('/api/orders');
//       const data = await res.json();
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       const res = await fetch(`/api/orders/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ paid: newStatus }),
//       });

//       if (res.ok) {
//         setOrders(
//           orders.map((order) =>
//             order._id === id ? { ...order, paid: newStatus } : order
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         setOrders(orders.filter((order) => order._id !== id));
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   if (status === 'loading') {
//     return <div className={styles.loading}>Загрузка...</div>;
//   }

//   if (!session) {
//     return null;
//   }

//   return (
//     <div className={styles.adminContainer}>
//       <h1>Orders Management</h1>

//       <div className={styles.ordersTable}>
//         <div className={styles.tableHeader}>
//           <span>Файл</span>
//           <span>Cколько</span> {/* <-- новая колонка */}
//           <span>Имя</span>
//           <span>Адрес</span>
//           <span>Телефон</span>
//           <span>Мэйл</span>
//           <span>Оплата</span>
//           <span>Оплачено</span>
//           <span>Дата</span>
//           <span>Удалить</span>
//         </div>

//         <div className={styles.tableBody}>
//           {orders.map((order) => (
//             <div key={order._id} className={styles.tableRow}>
//               <span className={styles.breakable}>{order.image}</span>
//               <span>{order.amount}</span> {/* <-- новая колонка */}
//               <span className={styles.breakable}>{order.name}</span>
//               <span className={styles.breakable}>{order.address}</span>
//               <span className={styles.breakable}>{order.phone}</span>
//               <span className={styles.breakable}>{order.mail}</span>
//               <span className={styles.breakable}>{order.payment}</span>
//               <span>
//                 {order.payment.toLowerCase().includes('card') ? (
//                   order.paid
//                 ) : (
//                   <select
//                     value={order.paid}
//                     onChange={(e) =>
//                       handleStatusChange(order._id, e.target.value)
//                     }
//                     className={styles.statusSelect}
//                   >
//                     <option value='NO'>NO</option>
//                     <option value='YES'>YES</option>
//                   </select>
//                 )}
//               </span>
//               <span>{new Date(order.createdAt).toLocaleDateString()}</span>
//               <button
//                 className={styles.deleteButton}
//                 onClick={() => handleDelete(order._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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
  payment: string;
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
          <span>Оплата</span>
          <span>Оплачено</span>
          <span>Дата</span>
          <span>Удалить</span>
        </div>

        <div className={styles.tableBody}>
          {orders.map((order) => {
            // Парсим сумму из строки оплаты
            const amount = order.amount || 1;
            const priceMatch = order.payment.match(/(\d+)\s*GEL/);
            const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;
            const total = price * amount;

            // Формируем строку оплаты с итоговой суммой и неразрывным пробелом
            const paymentText = order.payment.replace(
              /(\d+)\s*GEL/,
              `<span class="${styles.noWrap}">${total}&nbsp;GEL</span>`
            );

            // Проверка на оплату картой (на любом языке)
            const isCard = /(card|картой|ბარათით)/i.test(order.payment);

            return (
              <div key={order._id} className={styles.tableRow}>
                <span className={styles.breakable}>{order.image}</span>
                <span>{amount}</span>
                <span className={styles.breakable}>{order.name}</span>
                <span className={styles.breakable}>{order.address}</span>
                <span className={styles.breakable}>{order.phone}</span>
                <span className={styles.breakable}>{order.mail}</span>
                {/* Оплата с итоговой суммой и неразрывом числа */}
                <span
                  className={styles.breakable}
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
