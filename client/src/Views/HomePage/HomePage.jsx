import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import ProductListWithData from './components/ProductList/ProductListWithData';

const StyledBody = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

const HomePage = () => {
  return (
    <>
      <StyledBody>
        <Header title="Products" />

        <ProductListWithData />
      </StyledBody>
    </>
  );
};

export default HomePage;
