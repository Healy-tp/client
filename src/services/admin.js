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

export {
  getAvailabilities,
  getOffices,
  getAppointments,
}
