import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemCard({ itemObj, addItem }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>
          {itemObj.price}.00$
        </Card.Text>
        <Button variant="secondary" onClick={addItem}>Add</Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
};

export default ItemCard;
