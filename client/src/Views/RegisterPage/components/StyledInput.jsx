import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react';

const StyledInputStyles = styled(TextField)`
  margin: 1rem 0;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledInput = ({
  placeholder,
  value: v,
  error: errors,
  callback,
  type: t = 'text',
  ...props
}) => {
  const handleChange = (e) => {
    const newValue = e.taget.value.trim();
    console.log(newValue);
    callback(newValue);
  };
  return (
    <StyledInputStyles
      label={placeholder}
      variant="outlined"
      value={v}
      error={errors ? true : false}
      helperText={errors?.message}
      onChange={() => handleChange()}
      type={t}
      {...props}
    />
  );
};

export default StyledInput;
