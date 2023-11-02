import api from './api';
import config from './config';

function editAvailability(availabilityData) {
  return api.put(`${config.apiUrl}/api/admin/availabilities/edit`, availabilityData);
}

function editAppointment(apptData) {
  return api.put(`${config.apiUrl}/api/admin/appointment/edit`, apptData);
}

function getAvailabilities() {
  return api.get(`${config.apiUrl}/api/admin/availabilities`);
}

function getOffices() {
  return api.get(`${config.apiUrl}/api/admin/offices`);
}

function getAppointments() {
  return api.get(`${config.apiUrl}/api/admin/appointments`);
}

function createAppointmentForUser(payload) {
  return api.post(`${config.apiUrl}/api/admin/appointments/create-for-user`, payload);
}

function createDoctor(userData) {
  return api.post(`${config.apiUrl}/admin/doctor/signup`, userData);
}

function createOffice(userData) {
  return api.post(`${config.apiUrl}/api/admin/offices/create`, userData);
}

function editOffice(officeData) {
  return api.put(`${config.apiUrl}/api/admin/offices/edit`, officeData);
}

function getUsers() {
  return api.get(`${config.apiUrl}/admin/users`);
}

export {
  createDoctor,
  createOffice,
  editOffice,
  getAvailabilities,
  editAvailability,
  getOffices,
  getAppointments,
  editAppointment,
  getUsers,
  createAppointmentForUser,
}
