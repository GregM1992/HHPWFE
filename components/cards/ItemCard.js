import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ItemCard({ itemObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>
          {itemObj.price}.00$
        </Card.Text>
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
};

export default ItemCard;
