import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';
import { useAtom } from 'jotai';
import React from 'react';
import { cartAtom } from '../../../../atoms/atom';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
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

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const ProductCard = ({ item, noDetails = true }) => {
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
          <ProductName>
            <b>Product:</b> {item.productName}
          </ProductName>
          <ProductId>
            <b>ID:</b> {item.productId}
          </ProductId>
          <ProductSize>
            <b>Description:</b> {item.productDescription}
          </ProductSize>
        </Details>
      </ProductDetail>
      {!noDetails && (
        <PriceDetail>
          <ProductAmountContainer>
            <Add onClick={() => addQuantityHandler(item.productId)} />
            <ProductAmount>{item.quantity}</ProductAmount>

            <Remove onClick={() => removeQuantityHandler(item.productId)} />
          </ProductAmountContainer>
          <ProductPrice>₹ {item.price}</ProductPrice>
        </PriceDetail>
      )}
    </Product>
  );
};

export default ProductCard;
