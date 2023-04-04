import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAtom } from 'jotai';
import { authAtom, loggedInAtom, userAtom } from '../../atoms/atom';
import { toast } from 'react-toastify';
import axios from '../../API/axios';
import { TOAST_CONFIG } from '../../config';

const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  width: 40%;

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
  margin: 1rem 0;
  padding: 10px;
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

const LoginPage = () => {
  const [, setAuth] = useAtom(authAtom);
  const [, setLoggedIn] = useAtom(loggedInAtom);
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [loggedIn] = useAtom(loggedInAtom);

  // return to home page if user is logged in
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

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
    const { email, password } = data;
    axios
      .post('/users/login', {
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        const authToken = res.headers.authorization.split(' ')[1];

        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        setAuth(authToken);
        axios.get('/users/').then((res) => {
          if (res.data !== '') {
            sessionStorage.removeItem('user');
            setUser(res.data);
            sessionStorage.setItem('user', JSON.stringify(res.data));
            toast.success("You're logged in!", TOAST_CONFIG);
            setLoggedIn(true);
            navigate('/');
          } else {
            toast.error('Login in again', TOAST_CONFIG);
          }
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Invalid credentials', TOAST_CONFIG);
      });
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
            Login
          </StyledButton>
          <StyledLink to="/register">Create a new account</StyledLink>
        </StyledForm>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
