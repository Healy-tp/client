import api from './api';

function getAppointment(appointmentId) {
  return api.get(`/api/appointments/${appointmentId}`);
}

export {
  getAppointment,
}