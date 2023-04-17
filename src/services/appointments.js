import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

function getAppointmentByUserId(params = {}) {
  return api.get('http://localhost:8000/api/appointment', params);
}

function getDoctors() {
  return api.get('http://localhost:8000/api/doctors');
}

function getAvailabilities() {
  return api.get('http://localhost:8000/api/availability/all');
}

function getAvailabilitiesByDoctorId() {
  return api.get('http://localhost:8000/api/availability/');
}

function getAllAppointments() {
  return api.get('http://localhost:8000/api/appointment/all');
}

function createAvailability(payload) {
  return api.post('http://localhost:8000/api/availability/', payload);
}

function newAppointment(payload) {
  return api.post('http://localhost:8000/api/appointment/', payload);
}

function updateAppointment(apptId, payload) {
  return api.put(`http://localhost:8000/api/appointment/${apptId}`, payload);
}

function deleteAppointment(apptId) {
  return api.delete(`http://localhost:8000/api/appointment/${apptId}`);
}

function startChat(apptId) {
  return api.post(`http://localhost:8000/api/appointment/${apptId}/start-chat`);
}

function doctorCancelation(apptId) {
  return api.post(`http://localhost:8000/api/appointment/${apptId}/doctor-cancelation`)
}

function doctorDayCancelation(payload) {
  return api.post(`http://localhost:8000/api/appointment/doctor-day-cancelation`, payload)
}

function confirmAppointment(apptId) {
  return api.post(`http://localhost:8000/api/appointment/${apptId}/confirm-appt`);
}

function getHistoryWithUser(userId) {
  return api.get(`http://localhost:8000/api/appointment/history-with-user/${userId}`);
}

function upsertNotes(apptId, payload) {
  return api.post(`http://localhost:8000/api/appointment/${apptId}/upsert-notes`, payload);
}

function markAssistance(apptId) {
  return api.get(`http://localhost:8000/api/appointment/mark-assisted/${apptId}`);
}



export {
  getAppointment,
  getAppointmentByUserId,
  getDoctors,
  getAvailabilities,
  getAvailabilitiesByDoctorId,
  getAllAppointments,
  createAvailability,
  newAppointment,
  startChat,
  updateAppointment,
  deleteAppointment,
  doctorCancelation,
  doctorDayCancelation,
  confirmAppointment,
  getHistoryWithUser,
  upsertNotes,
  markAssistance,
}
