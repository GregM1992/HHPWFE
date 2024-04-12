import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createOrder, getOrderDetails, updateOrder } from '../../api/orderAPI';
import getOrderTypes from '../../api/orderTypeAPI';

const initialState = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  orderTypeId: 1,
};

function CreateOrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [orderTypes, setOrderTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (orderObj.id) {
      getOrderDetails(orderObj.id).then(setFormInput);
    }
    getOrderTypes().then(setOrderTypes);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      dateCreated: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = orderObj.id ? updateOrder : createOrder;
    action(formInput)
      .then(() => {
        router.push('/orders');
      })
      .catch((error) => {
        console.error('Failed to create order', error);
      });
    console.warn(formInput);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{orderObj.id ? 'Edit Order' : 'Add Order'}</h2>

      <Form.Group controlId="customerName" className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          value={formInput.customerName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="customerPhone" className="mb-3">
        <Form.Label>Customer Phone</Form.Label>
        <Form.Control
          type="text"
          name="customerPhone"
          value={formInput.customerPhone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="customerEmail" className="mb-3">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          type="text"
          name="customerEmail"
          value={formInput.customerEmail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Select
        name="orderTypeId"
        onChange={handleChange}
        className="mb-3 chooseOrderType"
        value={formInput.orderTypeId}
        required
      >
        {
          orderTypes.map((orderType) => (
            <option
              key={orderType.id}
              value={orderType.id}
              label={orderType.type}
            />
          ))
        }
      </Form.Select>

      <Button type="submit" variant="primary">
        {orderObj.id ? 'Update' : 'Start'} Order
      </Button>
    </Form>
  );
}
CreateOrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerPhone: PropTypes.string,
    customerEmail: PropTypes.string,
    orderTypeId: PropTypes.number,

  }),
};

CreateOrderForm.defaultProps = {
  orderObj: initialState,
};

export default CreateOrderForm;
