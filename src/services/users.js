import api from "./api";
import config from "./config";

async function signIn(email, password) {
  const response = await api.post(`${config.apiUrl}/user/signin`, {
    email,
    password,
  });
  return response;
}

async function signUp(userData) {
  const response = await api.post(`${config.apiUrl}/user/signup`, userData);
  return response;
}

async function updateUser(userData) {
  const response = await api.put(`${config.apiUrl}/user/edit`, userData);
  return response;
}

async function signOut() {
  const response = await api.post(`${config.apiUrl}/user/signout`);
  return response;
}

async function checkUser(confirmationCode) {
  const response = await api.get(`${config.apiUrl}/user/${confirmationCode}`);
  return response;
}

async function verifyUser(confirmationCode, { email, password }) {
  const response = await api.post(`${config.apiUrl}/user/${confirmationCode}`, {
    email,
    password,
  });
  return response;
}

export { signIn, signUp, signOut, updateUser, checkUser, verifyUser };
