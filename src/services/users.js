import api from './api';

async function signIn(email, password) {
  const response = await api.post('http://localhost:8000/user/signin', {email, password});
  return response;
}

async function signUp(userData) {
  const response = await api.post('http://localhost:8000/user/signup', userData);
  return response;
}

async function updateUser(userData) {
  const response = await api.put('http://localhost:8000/user/edit', userData);
  return response;
}

async function signOut() {
  const response = await api.post('http://localhost:8000/user/signout');
  return response;
}

async function checkUser(confirmationCode) {
  const response = await api.get(`http://localhost:8000/user/${confirmationCode}`);
  return response;
}

async function verifyUser(confirmationCode, {email, password}) {
  const response = await api.post(`http://localhost:8000/user/${confirmationCode}`, { email, password });
  return response;
}

export {
  signIn,
  signUp,
  signOut,
  updateUser,
  checkUser,
  verifyUser,
}
