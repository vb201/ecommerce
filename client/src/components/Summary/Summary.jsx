import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import { cartAmountAtom } from '../../atoms/atom';

const Summary = styled(Box)`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  width: 90%;
  padding: 1rem;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled(Box)`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled(Typography)``;

const SummaryItemPrice = styled(Typography)``;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: black;
  }
`;

const OrderSummary = ({
  title,
  textItems,
  buttonText,
  buttonLink,
  buttonCallback,
  children,
}) => {
  return (
    <Summary>
      <SummaryTitle>{title} SUMMARY</SummaryTitle>
      {children}
      {textItems?.map((item) => (
        <SummaryItem>
          <SummaryItemText>{item.primaryText}</SummaryItemText>
          <SummaryItemPrice>
            {item.secondaryText ? item.secondaryText : 0}
          </SummaryItemPrice>
        </SummaryItem>
      ))}
      {buttonLink ? (
        <Link to="/checkout">
          <StyledButton>{buttonText}</StyledButton>
        </Link>
      ) : (
        <StyledButton onClick={() => buttonCallback()}>
          {buttonText}
        </StyledButton>
      )}
    </Summary>
  );
};

export default OrderSummary;
