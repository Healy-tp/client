import api from './api';

async function signIn(email, password) {
  const response = await api.post('http://localhost:8080/signin', {email, password});
  return response;
}

async function signUp(userData) {
  const response = await api.post('http://localhost:8080/signup', userData);
  return response;
}

async function signOut() {
  const response = await api.post('http://localhost:8080/signout');
  return response;
}

export {
  signIn,
  signUp,
  signOut
}
