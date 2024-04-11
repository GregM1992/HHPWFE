import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { removeItemFromOrder } from '../../api/orderItemAPI';

function OrderItemCard({ orderItemObj, onUpdate }) {
  const router = useRouter();

  const deleteThisItem = () => {
    if (window.confirm(`Delete ${orderItemObj.name}?`)) {
      removeItemFromOrder(orderItemObj.orderItemId).then(() => {
        onUpdate();
        router.push(`/order/${orderItemObj.orderId}`);
      });
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{orderItemObj.name}</Card.Title>
        <Card.Text>
          {orderItemObj.price}.00$
        </Card.Text>
        {orderItemObj.isClosed ? (
          <p> </p>) : <Button variant="secondary" onClick={deleteThisItem}>Delete</Button>}
      </Card.Body>
    </Card>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    orderId: PropTypes.number,
    name: PropTypes.string,
    orderItemId: PropTypes.number,
    price: PropTypes.number,
    isClosed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderItemCard;
