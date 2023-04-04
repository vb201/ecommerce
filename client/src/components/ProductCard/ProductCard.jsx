import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import React from 'react';
import { cartAtom } from '../../atoms/atom';

const Product = styled(Box)`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ProductDetail = styled(Box)`
  ${(props) => (props.noDescription ? null : 'flex : 3')};
  display: flex;
  width: 100%;

  padding: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Details = styled(Box)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const PriceDetail = styled(Box)`
  ${(props) => (props.noDescription ? null : 'flex : 1')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled(Box)`
  font-size: 24px;
  margin: 5px;
  white-space: nowrap;
`;

const TextBold = styled(Typography)`
  font-weight: bold;
  padding-right: 5px;
`;

const TextWrapper = styled(Box)``;

const ProductCard = ({ item, noDescription = true }) => {
  const [cart, setCart] = useAtom(cartAtom);
  const addQuantityHandler = (productId) => {
    const newCart = cart.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(newCart);
  };
  const removeQuantityHandler = (productId) => {
    const newCart = cart.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(newCart);
  };

  return (
    <Product>
      <ProductDetail>
        <Image src={item.imageURI} />
        <Details>
          <TextWrapper>
            <TextBold>ID:</TextBold> {item.productId}
          </TextWrapper>
          <TextWrapper>
            <TextBold>Product:</TextBold> {item.productName}
          </TextWrapper>
          {noDescription ? (
            <>
              <TextWrapper>
                <TextBold>Price: </TextBold>₹ {item.price}
              </TextWrapper>

              <TextWrapper>
                <TextBold>Quantity: </TextBold> {item.quantity}
              </TextWrapper>
            </>
          ) : (
            <>
              <TextWrapper>
                <TextBold>Description:</TextBold> {item.productDescription}
              </TextWrapper>
            </>
          )}
        </Details>
        {!noDescription && (
          <PriceDetail>
            <ProductAmountContainer>
              <Add onClick={() => addQuantityHandler(item.productId)} />
              <ProductAmount>{item.quantity}</ProductAmount>

              <Remove onClick={() => removeQuantityHandler(item.productId)} />
            </ProductAmountContainer>
            <ProductAmount>₹ {item.price}</ProductAmount>
          </PriceDetail>
        )}
      </ProductDetail>
    </Product>
  );
};

export default ProductCard;
