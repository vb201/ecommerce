import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAmountAtom, cartAtom, cartQuantityAtom } from '../../atoms/atom';
import OrderSummary from '../../components/Summary/Summary';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  Bottom,
  Container,
  Info,
  Title,
  Top,
  TopButton,
  TopText,
} from './CartPageStyles';

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
      <Container>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton variant="outlined">CONTINUE SHOPPING</TopButton>
          </Link>
          <TopText>Shopping Bag({cartQuantity})</TopText>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                noDescription={false}
              />
            ))}
          </Info>
          <OrderSummary
            title="ORDER"
            textItems={[
              {
                primaryText: 'Subtotal',
                secondaryText: `₹ ${cartAmount}`,
              },
              {
                primaryText: 'Estimated Shipping',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Estimated Tax',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Discount',
                secondaryText: '₹ 0',
              },
              {
                primaryText: 'Total',
                secondaryText: `₹ ${cartAmount}`,
              },
            ]}
            buttonText="CHECKOUT"
            buttonLink="/checkout"
          />
        </Bottom>
      </Container>
    </>
  );
};

export default Cart;
