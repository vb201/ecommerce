import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
  userAtom,
} from '../../atoms/atom';
import ProductCard from '../../components/ProductCard/ProductCard';
import OrderSummary from '../../components/Summary/Summary';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../config';
import axios from '../../API/axios';

const StyledBody = styled(Box)`
  display: flex;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckoutDetails = styled(Box)`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: start;

  @media (max-width: 768px) {
    align-items: center;
  }
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

const ProductDetails = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CheckoutPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [cartAmount] = useAtom(cartAmountAtom);
  const [shippingAddress, setShippingAddress] = useState(
    user?.userShippingAddress || ''
  );
  const [, setCartAmount] = useAtom(cartAmountAtom);
  const [, setCartQuantity] = useAtom(cartQuantityAtom);
  const [billingAddress, setBillingAddress] = useState(
    user?.userBillingAddress || ''
  );

  let navigate = useNavigate();

  const buyNowHandler = () => {
    if (shippingAddress === '' || billingAddress === '') {
      toast.error('Please fill all the fields', TOAST_CONFIG);
      return;
    }

    const orderDate = new Date();
    // Make API call to place order
    let orderPayload = [];
    cart.forEach((item) => {
      orderPayload.push({
        user: {
          id: user.id,
        },
        product: {
          productId: item.productId,
        },
        orderDate: orderDate,
        orderStatus: 'placed',
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        quantity: item.quantity,
      });
    });

    axios
      .post('/orders', orderPayload)
      .then((res) => {
        toast.success('Order Placed Successfully', TOAST_CONFIG);
      })
      .catch((err) => {
        console.error('err', err);
        toast.error('Something went wrong', TOAST_CONFIG);
      });

    console.log('payload', orderPayload);
    // Make API call to update user
    axios.get('/users/').then((res) => {
      if (res.data !== '') {
        sessionStorage.removeItem('user');
        setUser(res.data);
        sessionStorage.setItem('user', JSON.stringify(res.data));
      }
    });

    setCart([]);
    setCartAmount(0);
    setCartQuantity(0);
    navigate('/orders');
  };
  return (
    <>
      <ToastContainer />
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
            buttonCallback={() => buyNowHandler()}
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
