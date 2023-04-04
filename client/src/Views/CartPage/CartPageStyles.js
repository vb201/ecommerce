import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

const Container = styled(Box)`
  padding 1rem;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const TopButton = styled(Button)`
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: black;
  border: 1px solid lightgray;

  &:hover {
    background-color: lightgray;
    border: 1px solid lightgray;
  }
`;

const TopText = styled(Typography)`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 1rem;
`;

const Bottom = styled(Box)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;

export { Container, Title, Top, TopButton, TopText, Bottom, Info };
