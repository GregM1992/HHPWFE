import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateOrderForm from '../../../components/forms/CreateOrderForm';
import { getOrderById } from '../../../api/orderAPI';

export default function CreateOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [editOrder, setEditOrder] = useState({});

  useEffect(() => {
    getOrderById(id).then(setEditOrder);
  }, [id]);

  return (
    <CreateOrderForm orderObj={editOrder} />
  );
}
