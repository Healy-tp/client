import api from './api';

async function signIn(email, password) {
  const response = await api.post('http://localhost:8080/user/signin', {email, password});
  return response;
}

async function signUp(userData) {
  const response = await api.post('http://localhost:8080/user/signup', userData);
  return response;
}

async function signOut() {
  const response = await api.post('http://localhost:8080/user/signout');
  return response;
}

async function checkUser(confirmationCode) {
  const response = await api.get(`http://localhost:8080/user/${confirmationCode}`);
  return response;
}

async function verifyUser(confirmationCode, {email}) {
  const response = await api.post(`http://localhost:8080/user/${confirmationCode}`, { email });
  return response;
}

export {
  signIn,
  signUp,
  signOut,
  checkUser,
  verifyUser,
}
