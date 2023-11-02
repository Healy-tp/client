import api from './api';
import config from './config';

function getAppointmentByUserId(params = {}) {
  return api.get(`${config.apiUrl}/api/appointment`, params);
}

function getDoctors() {
  return api.get(`${config.apiUrl}/api/doctors`);
}

function getAvailabilities() {
  return api.get(`${config.apiUrl}/api/availability/all`);
}

function getAvailabilitiesByDoctorId() {
  return api.get(`${config.apiUrl}/api/availability/`);
}

function getAllAppointments() {
  return api.get(`${config.apiUrl}/api/appointment/all`);
}

function createAvailability(payload) {
  return api.post(`${config.apiUrl}/api/availability/`, payload);
}

function newAppointment(payload) {
  return api.post(`${config.apiUrl}/api/appointment/`, payload);
}

function updateAppointment(apptId, payload) {
  return api.put(`${config.apiUrl}/api/appointment/${apptId}`, payload);
}

function deleteAppointment(apptId) {
  return api.delete(`${config.apiUrl}/api/appointment/${apptId}`);
}

function startChat(apptId) {
  return api.post(`${config.apiUrl}/api/appointment/${apptId}/start-chat`);
}

function doctorCancelation(apptId) {
  return api.post(`${config.apiUrl}/api/appointment/${apptId}/doctor-cancelation`)
}

function doctorDayCancelation(payload) {
  return api.post(`${config.apiUrl}/api/appointment/doctor-day-cancelation`, payload)
}

function confirmAppointment(apptId) {
  return api.post(`${config.apiUrl}/api/appointment/${apptId}/confirm-appt`);
}

function getHistoryWithUser(userId) {
  return api.get(`${config.apiUrl}/api/appointment/history-with-user/${userId}`);
}

function upsertNotes(apptId, payload) {
  return api.post(`${config.apiUrl}/api/appointment/${apptId}/upsert-notes`, payload);
}

function markAssistance(apptId) {
  return api.get(`${config.apiUrl}/api/appointment/mark-assisted/${apptId}`);
}

function exportToPDF(payload) {
  return api.get(`http://localhost:8081/api/appointment/export-history-with-user`, payload);
}



export {
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
  exportToPDF,
}
