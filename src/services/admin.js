import api from './api';

async function getAvailabilities() {
  return await api.get('http://localhost:8081/api/admin/availabilities');
}

async function getOffices() {
  return await api.get('http://localhost:8081/api/admin/offices');
}

async function getAppointments() {
  return await api.get('http://localhost:8081/api/admin/appointments');
}

async function crateAppointmentForUser(payload) {
  return await api.post('http://localhost:8081/api/admin/appointments/create-for-user', payload);
}

async function getUsers() {
  return await api.get('http://localhost:8080/admin/users');
}

export {
  getAvailabilities,
  getOffices,
  getAppointments,
  getUsers,
  crateAppointmentForUser,
}
