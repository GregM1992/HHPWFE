import React, { useEffect, useState } from 'react';
import { getRevenue } from '../api/orderAPI';
import Revenue from '../components/cards/Revenue';

function ShowRevenue() {
  const [revenue, setRevenue] = useState({});

  const getAllRevenue = () => {
    getRevenue().then(setRevenue);
  };

  useEffect(() => {
    getAllRevenue();
  }, []);
  return (
    <Revenue revenueObj={revenue} />
  );
}

export default ShowRevenue;
