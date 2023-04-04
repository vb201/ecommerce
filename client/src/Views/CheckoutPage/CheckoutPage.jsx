import { TextField } from '@mui/material';
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
import {
  CheckoutDetails,
  CheckoutDetailsTitle,
  CheckoutDetailsWrapper,
  ProductDetails,
  StyledBody,
} from './CheckoutPage';

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
