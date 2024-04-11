import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { getOrderDetails, getOrderStatus } from '../../api/orderAPI';
import getItems from '../../api/itemAPI';
import OrderItemCard from '../../components/cards/OrderItemCard';
import ItemCard from '../../components/cards/ItemCard';
import { addItemToOrder } from '../../api/orderItemAPI';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const showOrderDetails = () => {
    getOrderDetails(id).then(setOrderDetails);
  };

  const retrieveOrderStatus = () => {
    getOrderStatus(id).then(setOrderStatus);
  };

  useEffect(() => {
    retrieveOrderStatus();
  }, []);

  useEffect(() => {
    showOrderDetails();
  }, []);

  function AddItemModal() {
    const [show, setShow] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    const showMenuItems = () => {
      getItems().then(setMenuItems);
    };

    useEffect(() => {
      showMenuItems();
    }, []);

    const handleClose = () => {
      setShow(false);
      showOrderDetails();
    };

    const handleShow = () => setShow(true);

    const addItem = (item) => {
      const payload = {
        orderId: router.query.id,
        itemId: item,
      };
      addItemToOrder(payload).then(() => {
        showOrderDetails();
      });
      handleClose();
    };
    return (
      <>
        {!orderStatus[0] ? (
          <Button variant="secondary" onClick={handleShow}>
            Add Item
          </Button>
        ) : (<p>Order is closed</p>)}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {menuItems.map((menuItem) => (
                <div key={menuItem.id}>
                  <ItemCard itemObj={menuItem} onUpdate={showMenuItems} />
                  <Button
                    variant="primary"
                    onClick={() => {
                      addItem(menuItem.id);
                    }}
                  >
                    Add to Order
                  </Button>
                </div>
              ))}
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="orderDetailsDiv">
        <AddItemModal onUpdate={showOrderDetails} />
        {orderDetails.map((item) => (
          <OrderItemCard className="itemCard" key={item.orderItemId} orderItemObj={item} onUpdate={showOrderDetails} />
        ))}
      </div>
    </>
  );
}
