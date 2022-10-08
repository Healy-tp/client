const dateToString = (date) => {
  if (!date) {
    return null;
  }
  return date.toJSON().slice(0, 10);
}

const timeToString = (dateTime) => {
  if (!dateTime) {
    return null;
  }
  return dateTime.toJSON().slice(11, 16);
}

module.exports = {
  dateToString,
  timeToString,
};
