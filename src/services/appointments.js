import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

function getAppointmentByUserId() {
  return api.get('http://localhost:8081/api/appointment');
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

function startChat(apptId) {
  return api.post(`http://localhost:8081/api/appointment/${apptId}/start-chat`);
}

export {
  getAppointment,
  getAppointmentByUserId,
  getDoctors,
  getAvailabilities,
  getAllAppointments,
  newAppointment,
  startChat,
}
