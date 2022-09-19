import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

function getDoctors() {
  return api.get('http://localhost:8081/api/doctors');
}

function getAvailabilities() {
  return api.get('http://localhost:8081/api/availability');
}

function getAllAppointments() {
  return api.get('http://localhost:8081/api/appointment/all');
}

function newAppointment(payload) {
  return api.post('http://localhost:8081/api/appointment/', payload);
}

export {
  getAppointment,
  getDoctors,
  getAvailabilities,
  getAllAppointments,
  newAppointment,
}
