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
  margin: 10px 0px;
`;

const StyledButton = styled(Button)`
  width: 40%;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
