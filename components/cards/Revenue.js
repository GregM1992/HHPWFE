import React from 'react';
import PropTypes from 'prop-types';

function Revenue({ revenueObj }) {
  return (
    <>
      <div className="revenueCard">
        <h1>Total Revenue:</h1>
        <h2 className="total">{revenueObj.total}.00$</h2>
        <h1>Total from items:</h1>
        <h2 className="itemTotal">{revenueObj.totalFromItems}.00$</h2>
        <h1>Total tips:</h1>
        <h2 className="tips">{revenueObj.tips}.00$</h2>
        <h3>Call ins: {revenueObj.callIns}</h3>
        <h3>Walk ins: {revenueObj.walkIns}</h3>
      </div>
    </>
  );
}
Revenue.propTypes = {
  revenueObj: PropTypes.shape({
    total: PropTypes.number,
    totalFromItems: PropTypes.number,
    tips: PropTypes.number,
    callIns: PropTypes.number,
    walkIns: PropTypes.number,
  }).isRequired,
};

export default Revenue;
