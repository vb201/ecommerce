import axios from '../API/axios';

export async function loginUser(email, password) {
  const response = await axios.post('/users/login', {
    userEmail: email,
    userPassword: password,
  });
  return response;
}

export async function registerUser(name, email, password) {
  const response = await axios.post('/users/register', {
    userName: name,
    userEmail: email,
    userPassword: password,
  });
  return response;
}
