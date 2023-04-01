import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../services/UserService';

const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 60px);
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(TextField)`
  margin: 10px 0;
  padding: 10px;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    register: signin,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const SigninUserHandler = (data) => {
    try {
      const response = loginUser(data.email, data.password);
      response.then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <StyledForm onSubmit={handleSubmit(SigninUserHandler)}>
          <StyledInput
            label="email"
            variant="outlined"
            value={email}
            {...signin('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <StyledInput
            label="Password"
            variant="outlined"
            value={password}
            {...signin('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
          />
          <StyledButton
            variant="contained"
            type="submit"
          >
            Signin
          </StyledButton>
          <StyledLink to="/signup">Create a neww account</StyledLink>
        </StyledForm>
      </Wrapper>
    </Container>
  );
};

export default SigninPage;
