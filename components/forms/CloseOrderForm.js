import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getOrderDetails, closeOrder } from '../../api/orderAPI';

const initialState = {
  tip: 0.00,
  isClosed: true,
};

function CloseOrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { id: orderId } = router.query;
  useEffect(() => {
    if (orderObj.id) {
      getOrderDetails(orderObj.id).then(setFormInput);
    }
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      dateClosed: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tip = parseFloat(formInput.tip);
    const updatedFormInput = { ...formInput, tip };
    closeOrder(orderId, updatedFormInput)
      .then(() => {
        router.push('/orders');
        console.warn(updatedFormInput);
        console.warn(orderId);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Tip</h2>

      <Form.Group controlId="customerName" className="mb-3">
        <Form.Label>Tip</Form.Label>
        <Form.Control
          type="number"
          name="tip"
          value={formInput.tip}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="secondary">
        Close Order
      </Button>
    </Form>
  );
}
CloseOrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    tip: PropTypes.number,
    dateClosed: PropTypes.string,
    isClosed: PropTypes.bool,

  }),
};

CloseOrderForm.defaultProps = {
  orderObj: initialState,
};

export default CloseOrderForm;
