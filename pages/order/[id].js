import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { getOrderDetails } from '../../api/orderAPI';
import getItems from '../../api/itemAPI';
import OrderItemCard from '../../components/cards/OrderItemCard';
import ItemCard from '../../components/cards/ItemCard';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  function AddItemModal() {
    const [show, setShow] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    const showMenuItems = () => {
      getItems().then(setMenuItems);
    };

    useEffect(() => {
      showMenuItems();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // set ternary to remove add item button if order is closed
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {menuItems.map((menuItem) => (
                <ItemCard key={menuItems.id} itemObj={menuItem} onUpdate={showMenuItems} />
              ))}

            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const showOrderDetails = () => {
    getOrderDetails(id).then(setOrderDetails);
  };

  useEffect(() => {
    showOrderDetails();
  }, []);

  return (
    <>
      <div className="orderDetailsDiv">
        <AddItemModal />
        {orderDetails.map((item) => (
          <OrderItemCard className="itemCard" key={item.orderItemId} orderItemObj={item} onUpdate={showOrderDetails} />
        ))}
      </div>
    </>
  );
}
