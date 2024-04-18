import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteOrder } from '../../api/orderAPI';

function OrderCard({ orderObj, onUpdate }) {
  const router = useRouter();
  const pushToDetails = () => { router.push(`/order/${orderObj.id}`); };

  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${orderObj.customerName}'s order?`)) {
      deleteOrder(orderObj.id).then(() => {
        onUpdate();
        router.push('/orders');
      });
    }
  };

  return (
    <Card className="orderCardBody" style={{ width: '18rem' }}>
      <Card.Body className="cardBorder">
        <Card.Title className="customerName">{orderObj.customerName}</Card.Title>
        <Card.Text className="customerNumber">
          {orderObj.customerPhone}
        </Card.Text>
        <Card.Text>
          {orderObj.orderType.type}
        </Card.Text>
        <Card.Text className="orderStatus">
          Order Status:
        </Card.Text>
        {orderObj.isClosed ? (
          <p> Closed </p>) : <p> Open </p>}
        <Button variant="secondary" className="orderCardBtn" onClick={pushToDetails}>View Order</Button>
        {orderObj.isClosed ? (
          <p> </p>) : <Button variant="secondary" className="orderCardDeleteBtn" onClick={deleteThisOrder}>Delete</Button>}
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerPhone: PropTypes.string,
    orderType: PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
    }),
    isClosed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
