import { Button, Container, Box, Grid, Chip, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  getAvailabilities,
  getAllAppointments,
  updateAppointment,
} from "../../services/appointments";
import { dateToString, timeToString } from "../../utils/dateTimeFormatter";

const EditAppointment = () => {
  const [selectedData, setSelectedData] = useState({
    date: null,
    selectedTime: null,
    selectedOffice: null,
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const location = useLocation();
  const doctorId = location.state.appt.doctorId;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response);
    };

    const fetchAllAppointments = async () => {
      const response = await getAllAppointments();
      setAppointments(response);
    };

    try {
      fetchAvailabilities();
      fetchAllAppointments();
    } catch (err) {
      console.log("error getting data from API", err);
    }
  }, []);

  const onChangeDate = (date) => {
    const times = [];
    const selectedDate = availabilities.filter(
      (a) => a.weekday === date.getDay() && a.Doctor.id === doctorId,
    )[0];
    const dateString = dateToString(date);
    const startDt = new Date(
      `${dateString}T${selectedDate.startHour.slice(0, 5)}:00Z`,
    );
    const endDt = new Date(
      `${dateString}T${selectedDate.endHour.slice(0, 5)}:00Z`,
    );
    while (startDt < endDt) {
      times.push(new Date(startDt));
      startDt.setMinutes(startDt.getMinutes() + selectedDate.frequency);
    }
    setAvailableTimes(times);
    setSelectedData({
      ...selectedData,
      selectedOffice: selectedDate.officeId,
      selectedTime: null,
      date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAppointment(location.state.appt.id, {
        arrivalTime: `${dateToString(selectedData.date)} ${timeToString(
          selectedData.selectedTime,
        )}`,
        doctorId: doctorId,
        officeId: selectedData.selectedOffice,
      });
      // setSnackbar({ type: 'success', open: true, message: 'Turno modificado correctamente.' });
      navigate("/my-account");
    } catch (error) {
      // setSnackbar({ type: 'error', open: true, message: error.response.data.message });
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 8 }}>
        <Grid
          container
          spacing={2}
          maxWidth={"xs"}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Nueva fecha"
                value={selectedData.date}
                onChange={onChangeDate}
                disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={(date) => {
                  const filteredDays = availabilities
                    .filter((av) => av.Doctor.id === doctorId)
                    .map((av) => av.weekday);
                  return !filteredDays.includes(date.getDay()); // || availabilities.filter(av => new Date(av.validUntil) < date).length > 0;
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container margin={2} justifyContent={"center"}>
            {availableTimes.map((t) => {
              return (
                <Chip
                  key={t}
                  style={{ margin: 3 }}
                  label={timeToString(t)}
                  onClick={() =>
                    setSelectedData({ ...selectedData, selectedTime: t })
                  }
                  clickable
                  color="primary"
                  disabled={appointments
                    .map((a) => ({
                      doctorId: a.doctorId,
                      date: new Date(a.arrivalTime).getTime(),
                    }))
                    .filter((a) => a.doctorId === doctorId)
                    .map((a) => a.date)
                    .includes(t.getTime())}
                  variant={
                    t === selectedData.selectedTime ? "filled" : "outlined"
                  }
                />
              );
            })}
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: 10 }}
              onClick={() => navigate("/my-account")}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedData.selectedTime || !selectedData.date}
            >
              Modificar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditAppointment;
