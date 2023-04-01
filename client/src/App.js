import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { cartAmountAtom } from './atoms/atom';
import Navbar from './components/Navbar/Navbar';
import CartPage from './Views/CartPage/CartPage';
import CheckoutPage from './Views/CheckoutPage/CheckoutPage';
import HomePage from './Views/HomePage/HomePage';
import ProductPage from './Views/ProductPage/ProductPage';
import SigninPage from './Views/SigninPage/SigninPage';
import SignupPage from './Views/SignupPage/SignupPage';

function App() {
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
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/signin"
          element={<SigninPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
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
