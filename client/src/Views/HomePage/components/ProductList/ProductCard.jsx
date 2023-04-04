import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { useAtom } from 'jotai';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
} from '../../../../atoms/atom';
import styled from '@emotion/styled';

const StyledCardMedia = styled(CardMedia)`
  max-height: 350px;
  object-fit: contain;
  background-color: #fff;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  height: 350px;
`;

const StyledPrice = styled(Typography)`
  margin: 10px 0px;
  font-weight: 600;
  font-size: 1.3rem;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 2rem;
  gap: 1rem;
`;

const AddToCardButton = styled(Button)`
  background-color: #f0c14b;
  color: #111;
  font-weight: 600;

  &:hover {
    background-color: #ddb347;
  }
`;
const ProductCard = ({ product }) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setCartQuantity] = useAtom(cartQuantityAtom);
  const [, setCartAmount] = useAtom(cartAmountAtom);

  const addToCartHandler = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find(
        (item) => item.productId === product.productId
      );

      if (isProductInCart) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  useEffect(() => {
    setCartQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));

    cart.forEach((item) => {
      if (item.quantity === 0) {
        setCart(
          cart.filter((cartItem) => cartItem.productId !== item.productId)
        );
      }
    });

    setCartAmount(
      cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cart, setCart, setCartAmount, setCartQuantity]);

  return (
    <Card>
      <StyledCardMedia
        component="img"
        image={product.imageURI}
        title={product.productName}
      />
      <StyledCardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {product?.productName?.slice(0, 40) + '...'}
        </Typography>
        <Typography color="text.secondary">
          {product.productDescription?.slice(0, 200) + '...'}
        </Typography>
        <StyledPrice color="text.secondary">
          Price: ₹ {product.price}
        </StyledPrice>
      </StyledCardContent>
      <StyledCardActions>
        <Link to={`/product/${product.productId}`}>
          <Button
            color="primary"
            size="large"
            variant="contained"
          >
            View Product
          </Button>
        </Link>
        <AddToCardButton
          color="primary"
          size="large"
          variant="contained"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </AddToCardButton>
      </StyledCardActions>
    </Card>
  );
};

export default ProductCard;
