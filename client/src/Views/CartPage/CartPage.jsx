import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAmountAtom, cartAtom, cartQuantityAtom } from '../../atoms/atom';
import ProductCard from './components/ProductCard/ProductCard';

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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
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

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
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
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopText>Shopping Bag({cartQuantity})</TopText>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                noDetails={false}
              />
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cartAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 590</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -590</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cartAmount}</SummaryItemPrice>
            </SummaryItem>
            <Link to="/checkout">
              <StyledButton>CHECKOUT NOW</StyledButton>
            </Link>
          </Summary>
        </Bottom>
      </Box>
    </>
  );
};

export default Cart;
