import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAtom } from 'jotai';
import {
  authAtom,
  loggedInAtom,
  redirectedFromAtom,
  userAtom,
} from '../../atoms/atom';
import { toast } from 'react-toastify';
import axios from '../../API/axios';
import { TOAST_CONFIG } from '../../config';
import {
  Container,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLink,
  Title,
  Wrapper,
} from './LoginPageStyles';

const LoginPage = () => {
  const [, setAuth] = useAtom(authAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [, setUser] = useAtom(userAtom);
  const [redirectedFrom, setRedirectedFrom] = useAtom(redirectedFromAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

            console.log('redirectedFrom: ', redirectedFrom);
            if (redirectedFrom !== '') {
              const path = redirectedFrom;
              console.log('path: ', typeof path);
              setRedirectedFrom('');
              navigate(path);
            } else {
              navigate('/');
            }
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
