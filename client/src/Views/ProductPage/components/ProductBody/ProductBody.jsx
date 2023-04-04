import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
} from '../../../../atoms/atom';

const Wrapper = styled(Box)`
  padding: 1rem;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled(Box)`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 85vh;

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const InfoContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const ProductName = styled(Typography)`
  font-weight: 700;
`;

const ProductDescription = styled(Typography)`
  margin: 20px 0px;
`;

const Price = styled(Typography)`
  font-weight: 100;
  font-size: 40px;
  padding: 10px 0px;
`;

const AddContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AmountContainer = styled(Box)`
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

  const addToCartHandler = useCallback(
    (product) => {
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
    },
    [cart, currentQuantity, setCart]
  );

  useEffect(() => {
    cart.forEach((item) => {
      if (item.quantity === 0) {
        setCart(
          cart.filter((cartItem) => cartItem.productId !== item.productId)
        );
      }
    });

    setCartQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));

    setCartAmount(
      cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cart, setCart, setCartAmount, setCartQuantity]);

  // if product is in cart, update the quantity
  useEffect(() => {
    if (cart?.length === 0) {
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
          variant="h4"
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
