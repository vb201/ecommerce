import styled from '@emotion/styled';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const StyledCardMedia = styled(CardMedia)`
  max-height: 350px;
  object-fit: contain;
  background-color: #fff;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  height: 350px;
`;

const StyledPrice = styled(Typography)`
  margin: 1rem 0px;
  font-weight: 600;
  font-size: 1.3rem;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 2rem;
  gap: 1rem;
`;

const AddToCardButton = styled(Button)`
  background-color: #f0c14b;
  color: #111;
  font-weight: 600;

  &:hover {
    background-color: #ddb347;
  }
`;

export {
  StyledCardMedia,
  StyledCardContent,
  StyledPrice,
  StyledCardActions,
  AddToCardButton,
};
