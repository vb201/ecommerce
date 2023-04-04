import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import {
  cartAmountAtom,
  cartAtom,
  cartQuantityAtom,
} from '../../../../atoms/atom';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../../config';
import {
  AddContainer,
  Amount,
  AmountContainer,
  Image,
  ImageContainer,
  InfoContainer,
  Price,
  ProductDescription,
  ProductName,
  Wrapper,
} from './ProductBodyStyles';

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
      toast.success('Quantity updated in cart', TOAST_CONFIG);
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
