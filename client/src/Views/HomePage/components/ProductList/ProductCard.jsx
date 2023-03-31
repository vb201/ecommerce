import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

const StyledCardContent = styled(CardContent)`
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
`;

const StyledPrice = styled(Typography)`
  margin: 10px 0px;
  font-weight: 600;
`;
const ProductListItem = ({ product }) => {
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
    <Card>
      <CardMedia
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
          {product.productName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {product.productDescription}
        </Typography>
        <StyledPrice
          variant="body2"
          color="text.secondary"
        >
          Price: ₹ {product.price}
        </StyledPrice>
      </StyledCardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: '#fff',
          borderRadius: '1rem',
        }}
      >
        <Link to={`/product/${product.productId}`}>
          <Button
            color="primary"
            size="large"
            variant="contained"
          >
            View Product
          </Button>
        </Link>
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  addToCartHandler: PropTypes.func.isRequired,
};

export default ProductListItem;
