import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

async function getDoctors() {
  return await api.get('http://localhost:8081/api/doctors');
}

async function getAvailabilities() {
  return await api.get('http://localhost:8081/api/availability');
}

async function getAllAppointments() {
  return await api.get('http://localhost:8081/api/appointment/all');
}

async function newAppointment(payload) {
  return await api.post('http://localhost:8081/api/appointment/', payload);
}

export {
  getAppointment,
  getDoctors,
  getAvailabilities,
  getAllAppointments,
  newAppointment,
}
