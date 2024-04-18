import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { getOrderDetails, getOrderStatus, getOrderTotal } from '../../api/orderAPI';
import getItems from '../../api/itemAPI';
import OrderItemCard from '../../components/cards/OrderItemCard';
import ItemCard from '../../components/cards/ItemCard';
import { addItemToOrder } from '../../api/orderItemAPI';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const fetchData = async () => {
    try {
      const details = await getOrderDetails(id);
      setOrderDetails(details);

      const total = await getOrderTotal(id);
      setOrderTotal(total);

      const status = await getOrderStatus(id);
      setOrderStatus(status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderDetails.id]);

  const payButton = () => {
    router.push(`/order/pay/${router.query.id}`);
  };

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
      fetchData();
    };

    const handleShow = () => setShow(true);

    const addItem = (item) => {
      const payload = {
        orderId: router.query.id,
        itemId: item,
      };
      addItemToOrder(payload).then(() => {
        fetchData();
      });
      handleClose();
    };
    return (
      <>
        <div className="addItemModalBtn">
          {!orderStatus[0] ? (
            <Button className="addItemBtn" variant="outline-light" onClick={handleShow}>
              Add Item
            </Button>
          ) : (<p>Order is closed</p>)}
        </div>
        <Modal className="modalBody" show={show} onHide={handleClose} centered>
          <Modal.Header className="menu">
            <Modal.Title className="menu">Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body className="menu">
            <Container className="menuItemDiv">
              {menuItems.map((menuItem) => (
                <div key={menuItem.id}>
                  <ItemCard itemObj={menuItem} onUpdate={showMenuItems} />
                  <Button
                    className="menuBtn"
                    variant="outline-secondary"
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
        <div>
          <AddItemModal onUpdate={fetchData} />
          <div className="justTheItems">
            {orderDetails.map((item) => (
              <OrderItemCard
                key={item.orderItemId}
                orderItemObj={item}
                onUpdate={fetchData}
              />
            ))}
          </div>
        </div>
        {!orderStatus[0] ? (<h2> Subtotal: {orderTotal[0]}.00$ </h2>) : (
          <>
            <h2>
              Tip: {orderTotal[2]}.00$
            </h2>
            <h2> Total: {orderTotal[1]}.00$ </h2>
          </>
        )}
        {!orderStatus[0] ? (<Button variant="outline-light" onClick={payButton}>Go to payment</Button>) : <p> </p>}
      </div>
    </>
  );
}
