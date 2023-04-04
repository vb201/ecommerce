import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

const TextBold = styled(Typography)`
  font-weight: 600;
`;
const OrderList = ({ order }) => {
  return (
    <div key={order?.id}>
      <ul>
        <h2>Order #{order?.id}</h2>
        <TextWrapper>
          <TextBold>Product Name:</TextBold> {order?.product?.productName}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Product Description:</TextBold>{' '}
          {order?.product?.productDescription}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Price:</TextBold> ${order?.product?.price}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Quantity:</TextBold> {order?.quantity}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Order Status:</TextBold> {order?.orderStatus}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Order Date:</TextBold>{' '}
          {new Date(order?.orderDate).toLocaleString()}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Billing Address:</TextBold> {order?.billingAddress}
        </TextWrapper>
        <TextWrapper>
          <TextBold>Shipping Address:</TextBold> {order?.shippingAddress}
        </TextWrapper>
      </ul>
    </div>
  );
};

export default OrderList;
