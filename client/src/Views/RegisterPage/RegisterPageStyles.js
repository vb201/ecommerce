import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  width: 40%;
  background-color: white;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 300;
`;

const StyledFrom = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(TextField)`
  margin: 1rem 0;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 40%;
  border: none;
  padding: 1rem;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

export {
  Container,
  Wrapper,
  Title,
  StyledFrom,
  StyledInput,
  StyledButton,
  StyledLink,
};
