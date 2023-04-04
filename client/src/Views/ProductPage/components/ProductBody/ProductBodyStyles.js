import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Wrapper = styled(Box)`
  padding: 1rem;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled(Box)`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 85vh;

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const InfoContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const ProductName = styled(Typography)`
  font-weight: 700;
`;

const ProductDescription = styled(Typography)`
  margin: 1rem 0px;
`;

const Price = styled(Typography)`
  font-weight: 100;
  font-size: 40px;
  padding: 0.7rem 0px;
`;

const AddContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const AmountContainer = styled(Box)`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 2rem;
`;

const Amount = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  text-align: center;
`;

export {
  Wrapper,
  ImageContainer,
  Image,
  InfoContainer,
  ProductName,
  ProductDescription,
  Price,
  AddContainer,
  AmountContainer,
  Amount,
};
