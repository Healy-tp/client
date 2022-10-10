// IMPORTANT: This values should match with @common/specialties.js file
const SPECIALTIES = [
  'Cardiology',
  'Dermathology',
  'Ophthalmology',
  'Pediatrics',
  'Psychiatry',
  'Urology',
]

// IMPORTANT: This values should match with @appointments/utils/constants.js file
const FREQUENCIES = [15, 30, 45, 60];

// IMPORTANT: This values should match with @appointments/utils/constants.js file
const APPOINTMENT_STATUS = {
  CREATED: 'created',
  TO_CONFIRM: 'to_confirm',
  CANCELLED: 'cancelled',
  ATTENDED: 'attended',
};

module.exports = {
  SPECIALTIES,
  FREQUENCIES,
  APPOINTMENT_STATUS,
};
