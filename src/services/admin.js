import api from './api';

function getAvailabilities() {
  return api.get('http://localhost:8081/api/admin/availabilities');
}

function getOffices() {
  return api.get('http://localhost:8081/api/admin/offices');
}

function getAppointments() {
  return api.get('http://localhost:8081/api/admin/appointments');
}

function createAppointmentForUser(payload) {
  return api.post('http://localhost:8081/api/admin/appointments/create-for-user', payload);
}

function createDoctor(userData) {
  return api.post('http://localhost:8080/doctor/signup', userData);
}

function createOffice(userData) {
  return api.post('http://localhost:8081/admin/offices/create', userData);
}

function getUsers() {
  return api.get('http://localhost:8080/admin/users');
}

export {
  createDoctor,
  createOffice,
  getAvailabilities,
  getOffices,
  getAppointments,
  getUsers,
  createAppointmentForUser,
}
