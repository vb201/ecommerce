import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import React from 'react';
import { cartAtom } from '../../atoms/atom';

const Product = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ProductDetail = styled.div`
  ${(props) => (props.noDescription ? null : 'flex : 3')};
  display: flex;
  width: 100%;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const PriceDetail = styled.div`
  ${(props) => (props.noDescription ? null : 'flex : 1')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductDescription = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const TextBold = styled(Typography)`
  font-weight: bold;
  padding-right: 5px;
`;

const TextWrapper = styled(Box)`
  display: flex;
  align-items: start;
`;

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
      </ProductDetail>
      {!noDescription && (
        <PriceDetail>
          <ProductAmountContainer>
            <Add onClick={() => addQuantityHandler(item.productId)} />
            <ProductAmount>{item.quantity}</ProductAmount>

            <Remove onClick={() => removeQuantityHandler(item.productId)} />
          </ProductAmountContainer>
          <ProductDescription>₹ {item.price}</ProductDescription>
        </PriceDetail>
      )}
    </Product>
  );
};

export default ProductCard;
