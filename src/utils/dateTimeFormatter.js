const moment = require("moment");

const dateToString = (date) => {
  if (!date) {
    return null;
  }

  // TODO: update to moment if possible
  // return moment(date).format('DD-MM-YYYY');
  return date.toJSON().slice(0, 10);
};

const dateToStringForDisplay = (date) => {
  if (!date) {
    return null;
  }

  return moment(date).format('DD-MM-YYYY');
};

const timeToString = (dateTime) => {
  if (!dateTime) {
    return null;
  }

  // TODO: update to moment if possible
  // return moment.utc(dateTime).format('HH:mm');
  return dateTime.toJSON().slice(11, 16);
};

const dateTimeToString = (dateTime) => {
  if (!dateTime) {
    return null;
  }

  return moment.utc(dateTime).format("DD-MM-YYYY HH:mm") + "hs";
};

module.exports = {
  dateToString,
  timeToString,
  dateTimeToString,
  dateToStringForDisplay,
};
