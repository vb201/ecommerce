import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
} from '../../../../atoms/atom';

const Wrapper = styled(Box)`
  padding: 50px;
  display: flex;
`;

const ImageContainer = styled(Box)`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const ProductName = styled(Typography)``;

const ProductDescription = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  text-align: center;
`;

const ProductBody = ({ product }) => {
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [cart, setCart] = useAtom(cartAtom);
  const [, setCartQuantity] = useAtom(cartQuantityAtom);
  const [, setCartAmount] = useAtom(cartAmountAtom);

  const addToCartHandler = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find(
        (item) => item.productId === product.productId
      );

      if (isProductInCart) {
        return cart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: currentQuantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: currentQuantity }];
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

  // if product is in cart, update the quantity
  useEffect(() => {
    if (cart === undefined) {
      setCurrentQuantity(1);
      return;
    }

    const isProductInCart = cart.find(
      (item) => item.productId === product.productId
    );
    if (isProductInCart) {
      setCurrentQuantity(isProductInCart.quantity);
    } else {
    }
  }, [cart, product]);

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={product.imageURI} />
      </ImageContainer>

      <InfoContainer>
        <ProductName
          variant="h3"
          component="div"
        >
          {product.productName}
        </ProductName>
        <ProductDescription>{product.productDescription}</ProductDescription>
        <Price>₹ {product.price}</Price>
        <AddContainer>
          <AmountContainer>
            <Remove
              onClick={() =>
                setCurrentQuantity(
                  currentQuantity > 0 ? currentQuantity - 1 : 0
                )
              }
            />
            <Amount
              type="number"
              value={currentQuantity}
              min="0"
              onChange={(e) =>
                setCurrentQuantity(Number(e.target.value.trim()))
              }
            />
            <Add onClick={() => setCurrentQuantity(currentQuantity + 1)} />
          </AmountContainer>
          <Button
            variant="contained"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default ProductBody;
