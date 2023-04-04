import styled from '@emotion/styled';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAtom } from 'jotai';
import {
  authAtom,
  cartQuantityAtom,
  loggedInAtom,
  userAtom,
} from '../../atoms/atom';
import { Link, useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)``;

const StyledIconButton = styled(IconButton)``;

const StyledLogo = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
`;

const StyledLinkContainer = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  marginx: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Navbar = ({ callback, darkMode }) => {
  const [cartQuantity] = useAtom(cartQuantityAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, setLoggedIn] = useAtom(loggedInAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setAuth] = useAtom(authAtom);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event.target.textContent === 'Log out') {
      sessionStorage.removeItem('user');
      setLoggedIn(false);
      setUser({});
      setAuth('');
    }
    if (event.target.textContent === 'Orders') {
      navigate('/orders');
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/">
          <StyledLogo>E-Commerce</StyledLogo>
        </Link>
        <StyledLinkContainer>
          <Switch
            checked={darkMode}
            onChange={callback}
          />
          {sessionStorage.getItem('user') ? (
            <>
              <StyledButton
                variant="filled"
                disableElevation
                onClick={handleClick}
              >
                Welcome {user?.userName}
              </StyledButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Orders</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <StyledLink to="/login">
              <StyledButton
                variant="filled"
                disableElevation
              >
                Login
              </StyledButton>
            </StyledLink>
          )}
          <StyledLink to="/cart">
            <StyledIconButton size="large">
              <Badge
                badgeContent={cartQuantity}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </StyledIconButton>
          </StyledLink>
        </StyledLinkContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
