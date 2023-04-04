import React from 'react';
import OrderList from './OrderList';

const OrderPage = ({ order }) => {
  return order?.map((item, index) => (
    <OrderList
      key={index}
      order={item}
    />
  ));
};

export default OrderPage;
