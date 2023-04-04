import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import { loggedInAtom, userAtom } from './atoms/atom';
import axios from './API/axios';
import PrivateRoute from './PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from './components/Navbar/Navbar';

const CartPage = React.lazy(() => import('./Views/CartPage/CartPage'));
const CheckoutPage = React.lazy(() =>
  import('./Views/CheckoutPage/CheckoutPage')
);
const HomePage = React.lazy(() => import('./Views/HomePage/HomePage'));
const ProductPage = React.lazy(() => import('./Views/ProductPage/ProductPage'));
const LoginPage = React.lazy(() => import('./Views/LoginPage/LoginPage'));
const OrderPage = React.lazy(() =>
  import('./Views/OrderPage/OrderPageWithData')
);
const RegisterPage = React.lazy(() =>
  import('./Views/RegisterPage/RegisterPage')
);

function App() {
  const [isLoggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [, setUser] = useAtom(userAtom);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
      setUser(JSON.parse(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        JSON.parse(user)?.authToken
      }`;
    }
  }, [setLoggedIn, setUser]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar
          callback={handleThemeChange}
          darkMode={darkMode}
        />
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
            element={
              <PrivateRoute
                isAuth={isLoggedIn}
                navigatedFrom={'/checkout'}
              >
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute
                isAuth={isLoggedIn}
                navigatedFrom={'/orders'}
              >
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="*"
            element={<h1>404</h1>}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
