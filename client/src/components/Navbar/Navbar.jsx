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
  justify-content: space-between;
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

const Navbar = () => {
  const [cartQuantity] = useAtom(cartQuantityAtom);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/">
          <StyledLogo>E-Commerce</StyledLogo>
        </Link>
        <StyledLinkContainer>
          <Link to="/login">
            <Button
              variant="filled"
              disableElevation
              sx={{ '&:hover': { backgroundColor: '#1976d2' } }}
            >
              Login
            </Button>
          </Link>
          <Link to="/cart">
            <IconButton
              size="large"
              sx={{ '&:hover': { backgroundColor: '#1976d2' } }}
            >
              <Badge
                badgeContent={cartQuantity}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </StyledLinkContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
