import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAmountAtom, cartAtom, cartQuantityAtom } from '../../atoms/atom';
import OrderSummary from '../../components/Summary/Summary';
import ProductCard from '../../components/ProductCard/ProductCard';

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled(Button)`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  color: black;
  border: 1px solid lightgray;

  &:hover {
    background-color: lightgray;
    border: 1px solid lightgray;
  }
`;

const TopText = styled(Typography)`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [cartQuantity, setCartQuantity] = useAtom(cartQuantityAtom);
  const [cartAmount, setCartAmount] = useAtom(cartAmountAtom);

  useEffect(() => {
    let newCartQuantity = 0;
    cart.forEach((item) => {
      newCartQuantity += item.quantity;
    });

    cart.forEach((item) => {
      if (item.quantity === 0) {
        setCart(
          cart.filter((cartItem) => cartItem.productId !== item.productId)
        );
      }
    });

    setCartQuantity(newCartQuantity);

    setCartAmount(
      cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cart, setCart, setCartAmount, setCartQuantity]);

  return (
    <>
      <Box
        sx={{
          padding: '1rem',
        }}
      >
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton variant="outlined">CONTINUE SHOPPING</TopButton>
          </Link>
          <TopText>Shopping Bag({cartQuantity})</TopText>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                noDescription={false}
              />
            ))}
          </Info>
          <OrderSummary
            title="ORDER"
            textItems={[
              {
                primaryText: 'Subtotal',
                secondaryText: `₹ ${cartAmount}`,
              },
              {
                primaryText: 'Estimated Shipping',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Estimated Tax',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Discount',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Total',
                secondaryText: `₹ ${cartAmount}`,
              },
            ]}
            buttonText="CHECKOUT"
            buttonLink="/checkout"
          />
        </Bottom>
      </Box>
    </>
  );
};

export default Cart;
