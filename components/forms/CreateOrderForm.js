import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createOrder, editOrder } from '../../api/orderAPI';
import getOrderTypes from '../../api/orderTypeAPI';

const initialState = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  orderTypeId: 0,
};

function CreateOrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState({});
  const [orderTypes, setOrderTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (orderObj.id) {
      setFormInput(orderObj);
      console.warn(orderObj);
    }
    getOrderTypes().then(setOrderTypes);
  }, [orderObj]);

  console.warn(formInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'orderTypeId' ? Number(value) : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      [name]: parsedValue,
      dateCreated: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      editOrder(formInput, orderObj.id).then(() => router.push('/orders'));
    } else {
      createOrder(formInput)?.then(() => router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="orderForm">
      <h2 className="addOrder">{orderObj.id ? 'Edit Order' : 'Add Order'}</h2>

      <Form.Group controlId="customerName" className="mb-3">
        <Form.Label className="orderFormLabel">Customer Name</Form.Label>
        <Form.Control
          className="orderInput"
          type="text"
          name="customerName"
          value={formInput.customerName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="customerPhone" className="mb-3">
        <Form.Label className="orderFormLabel">Customer Phone</Form.Label>
        <Form.Control
          className="orderInput"
          type="text"
          name="customerPhone"
          value={formInput.customerPhone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="customerEmail" className="mb-3">
        <Form.Label className="orderFormLabel">Customer Email</Form.Label>
        <Form.Control
          className="orderInput"
          type="text"
          name="customerEmail"
          value={formInput.customerEmail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Label className="orderFormLabel">Order Type</Form.Label>
      <Form.Select
        name="orderTypeId"
        onChange={handleChange}
        className="mb-3 chooseOrderType"
        value={formInput.orderTypeId}
        required
      > <option value={null} disabled selected label="Select" />
        {
          orderTypes.map((orderType) => (
            <option
              key={orderType.id}
              value={orderType.id}
              label={orderType.type}
              required
            />
          ))
        }
      </Form.Select>

      <Button type="submit" variant="secondary">
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
