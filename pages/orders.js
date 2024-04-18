import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getOrders } from '../api/orderAPI';
import OrderCard from '../components/cards/OrderCard';

function ShowOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders().then(setOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="text-center my-4">
      <h1 className="orderHeader">Orders</h1>
      <Link href="/order/new" passHref>
        <Button size="sm" variant="outline-light" className="createOrderBtn">Start New Order</Button>
      </Link>
      <div className="orderView">
        {orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />
        ))}
      </div>
    </div>
  );
}

export default ShowOrders;
