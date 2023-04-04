import styled from '@emotion/styled';
import { Box } from '@mui/system';
import React from 'react';

import ProductBody from './components/ProductBody/ProductBodyWithData';

const StyledBody = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ProductPage = () => {
  return (
    <>
      <StyledBody>
        <ProductBody />
      </StyledBody>
    </>
  );
};

export default ProductPage;
