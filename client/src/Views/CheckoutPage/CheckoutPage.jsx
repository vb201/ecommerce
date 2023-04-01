import styled from '@emotion/styled';
import { Box, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { cartAmountAtom, cartAtom } from '../../atoms/atom';
import ProductCard from '../../components/ProductCard/ProductCard';
import OrderSummary from '../../components/Summary/Summary';

const StyledBody = styled(Box)`
  display: flex;
  padding: 1rem;
`;

const CheckoutDetails = styled(Box)`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const CheckoutDetailsWrapper = styled(Box)`
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  width: 80%;
`;

const CheckoutDetailsTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CheckoutDetailsInput = styled(TextField)`
  width: '100%';
`;
const ProductDetails = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CheckoutPage = () => {
  const [cart] = useAtom(cartAtom);
  const [cartAmount] = useAtom(cartAmountAtom);
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  return (
    <>
      <StyledBody>
        <CheckoutDetails>
          <CheckoutDetailsWrapper>
            <CheckoutDetailsTitle>Shipping Address</CheckoutDetailsTitle>
            <TextField
              label="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value.trimStart())}
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              required
            />
          </CheckoutDetailsWrapper>
          <CheckoutDetailsWrapper>
            <CheckoutDetailsTitle>Billing Address</CheckoutDetailsTitle>
            <TextField
              label="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value.trimStart())}
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              required
            />
          </CheckoutDetailsWrapper>
        </CheckoutDetails>
        <ProductDetails>
          <OrderSummary
            title="CART"
            textItems={[
              {
                primaryText: 'Total Items',
                secondaryText: cart.length,
              },
              {
                primaryText: 'Total Price',
                secondaryText: cartAmount,
              },
            ]}
            buttonText="Buy Now"
            buttonCallback={() => alert('Buy Now')}
          >
            {cart.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                noDetails={true}
              />
            ))}
          </OrderSummary>
        </ProductDetails>
      </StyledBody>
    </>
  );
};

export default CheckoutPage;
