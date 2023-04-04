import React from 'react';
import API from '../../API/';
import { useContentFetch } from '../../hooks/useContentFetch';
import OrderPage from './OrderPage';

const OrderPageWithData = () => {
  const {
    loading,
    error,
    contentState: OrderData,
  } = useContentFetch(API.fetchUserOrderByStatus('all', false));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (Object.keys(OrderData).length >= 1)
    return <OrderPage order={OrderData} />;
};

export default OrderPageWithData;
