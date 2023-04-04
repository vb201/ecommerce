import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 0;
`;
const Header = ({ title }) => {
  return (
    <StyledWrapper>
      <Typography
        variant="h3"
        component="div"
      >
        {title}
      </Typography>
    </StyledWrapper>
  );
};

export default Header;
