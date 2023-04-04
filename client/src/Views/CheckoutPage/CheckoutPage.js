import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const StyledBody = styled(Box)`
  display: flex;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckoutDetails = styled(Box)`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const CheckoutDetailsWrapper = styled(Box)`
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  width: 80%;
`;

const CheckoutDetailsTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ProductDetails = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export {
  StyledBody,
  CheckoutDetails,
  CheckoutDetailsWrapper,
  CheckoutDetailsTitle,
  ProductDetails,
};
