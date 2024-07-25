// IMPORTANT: This values should match with @common/specialties.js file
const SPECIALTIES = [
  "Cardiology",
  "Dermathology",
  "Ophthalmology",
  "Pediatrics",
  "Psychiatry",
  "Urology",
];

// IMPORTANT: This values should match with @appointments/utils/constants.js file
const FREQUENCIES = [15, 30, 60];
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DAYS = [1, 2, 3, 4, 5, 6];
const TIMES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// IMPORTANT: This values should match with @appointments/utils/constants.js file
const APPOINTMENT_STATUS = {
  CREATED: "created",
  TO_CONFIRM: "to_confirm",
  CANCELLED: "cancelled",
  ATTENDED: "attended",
};

const DEFAULT_LOCALE = "es";

module.exports = {
  DEFAULT_LOCALE,
  SPECIALTIES,
  FREQUENCIES,
  MONTHS,
  DAYS,
  TIMES,
  APPOINTMENT_STATUS,
};
