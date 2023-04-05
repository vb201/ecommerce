import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
} from '../../../../atoms/atom';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../../config';
import {
  AddToCardButton,
  StyledCard,
  StyledCardActions,
  StyledCardContent,
  StyledCardMedia,
  StyledPrice,
} from './ProducCardStyles';

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

      toast.success('Product added to cart', TOAST_CONFIG);
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
    <StyledCard>
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
    </StyledCard>
  );
};

export default ProductCard;
