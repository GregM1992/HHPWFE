import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrderDetails } from '../../api/orderAPI';
import OrderItemCard from '../../components/cards/OrderItemCard';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const showOrderDetails = () => {
    getOrderDetails(id).then(setOrderDetails);
  };
  console.warn(orderDetails);
  useEffect(() => {
    showOrderDetails();
  }, []);

  return (
    orderDetails.map((item) => (
      <OrderItemCard key={item.orderItemId} orderItemObj={item} onUpdate={showOrderDetails} />
    ))
  );
}
