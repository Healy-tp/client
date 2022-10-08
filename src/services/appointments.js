import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

function getAppointmentByUserId(params = {}) {
  return api.get('http://localhost:8081/api/appointment', params);
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

function updateAppointment(apptId, payload) {
  return api.put(`http://localhost:8081/api/appointment/${apptId}`, payload);
}

function deleteAppointment(apptId) {
  return api.delete(`http://localhost:8081/api/appointment/${apptId}`);
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
  updateAppointment,
  deleteAppointment,
}
