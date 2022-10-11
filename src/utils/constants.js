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
const FREQUENCIES = [15, 30, 60];

const MONTH_LABELS = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
}
const DAYS = [1, 2, 3, 4, 5, 6];
const DAY_LABELS = {
  1: 'Lunes', 
  2: 'Martes', 
  3: 'Miercoles', 
  4: 'Jueves', 
  5: 'Viernes', 
  6: 'Sabado', 
}

const TIMES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

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
  MONTH_LABELS,
  DAYS,
  DAY_LABELS,
  TIMES,
  APPOINTMENT_STATUS,
};
