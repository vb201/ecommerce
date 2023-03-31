import { Box } from '@mui/system'
import React from 'react'
import styled from 'styled-components';

const StyledWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    color: #000;
    padding: 1rem 0;
    `;
const Header = ({title}) => {
  return (
    // Generate an MUI header here
    <StyledWrapper>
        {title}
    </StyledWrapper>
  )
}

export default Header