import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../config';
import axios from '../../API/axios';
import { useAtom } from 'jotai';
import { loggedInAtom } from '../../atoms/atom';

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

const SignunPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn] = useAtom(loggedInAtom);

  const navigate = useNavigate();

  // return to home page if user is logged in
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const registerUserHandler = (data) => {
    axios
      .post('/users/register', {
        userName: name,
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        toast.success('User Registered successfully', TOAST_CONFIG);
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Error occured', TOAST_CONFIG);
        console.error(error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <StyledFrom onSubmit={handleSubmit(registerUserHandler)}>
          <StyledInput
            label="Name"
            variant="outlined"
            value={name}
            {...register('name')}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <StyledInput
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <StyledInput
            label="Password"
            variant="outlined"
            value={password}
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
          />
          <StyledInput
            label="Confirm Password"
            variant="outlined"
            value={confirmpassword}
            {...register('confirmpassword')}
            error={errors.confirmpassword ? true : false}
            helperText={errors.confirmpassword?.message}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
            type="password"
          />

          <StyledButton
            variant="contained"
            type="submit"
          >
            Register
          </StyledButton>
          <StyledLink to="/login">Already have an account</StyledLink>
        </StyledFrom>
      </Wrapper>
    </Container>
  );
};

export default SignunPage;
