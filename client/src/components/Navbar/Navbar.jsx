import styled from '@emotion/styled';
import { AppBar, Badge, Button, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAtom } from 'jotai';
import { cartQuantityAtom } from '../../atoms/atom';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  &:hover {
    background-color: #1976d2;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: #fff;
  background-color: #1976d2;
  &:hover {
    background-color: #1976d2;
  }
`;

const StyledLogo = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

const StyledLinkContainer = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  marginx: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Navbar = () => {
  const [cartQuantity] = useAtom(cartQuantityAtom);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/">
          <StyledLogo>E-Commerce</StyledLogo>
        </Link>
        <StyledLinkContainer>
          <StyledLink to="/signin">
            <StyledButton
              variant="filled"
              disableElevation
            >
              Signin
            </StyledButton>
          </StyledLink>
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
