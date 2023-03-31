import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { cartAmountAtom } from './atoms/atom';
import Navbar from './components/Navbar/Navbar';
import CartPage from './Views/CartPage/CartPage';
import HomePage from './Views/HomePage/HomePage';
import ProductPage from './Views/ProductPage/ProductPage';

function App() {
  const [cartAmount] = useAtom(cartAmountAtom);
  console.log('cartAmount', cartAmount);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/product/:id"
          element={<ProductPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="*"
          element={<h1>404</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
