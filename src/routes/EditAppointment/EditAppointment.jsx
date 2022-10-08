
import {  
  Button, Container, Box, Grid, Chip, TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { getAvailabilities, getAllAppointments, updateAppointment } from '../../services/appointments';

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
    const getAvailabilitiesFromApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response);
    }

    const getAllAppointmentsFromApi = async () => {
      const response = await getAllAppointments();
      setAppointments(response);
    }

    getAvailabilitiesFromApi();
    getAllAppointmentsFromApi();
  }, []);

  const onChangeDate = (date) => {
    const times = [];
    const selectedDate = availabilities.filter(a => a.weekday === date.getDay() && a.Doctor.id === doctorId)[0];
    const dateString = date.toJSON().slice(0, 10);
    const startDt = new Date(`${dateString}T${selectedDate.startHour.slice(0, 5)}:00Z`);
    const endDt = new Date(`${dateString}T${selectedDate.endHour.slice(0, 5)}:00Z`);
    while (startDt < endDt) {
      times.push(new Date(startDt));
      startDt.setMinutes(startDt.getMinutes() + selectedDate.frequency);
    }
    setAvailableTimes(times);
    setSelectedData({...selectedData, selectedOffice: selectedDate.officeId, selectedTime: null, date})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateAppointment(location.state.appt.id, {
        arrivalTime: `${selectedData.date.toJSON().slice(0, 10)} ${selectedData.selectedTime.toJSON().slice(11,16)}`,
        doctorId: doctorId,
        officeId: selectedData.selectedOffice,
      });
      // setSnackbar({ type: 'success', open: true, message: 'Appointment made.' });
      navigate('/my-account'); 
    } catch (error) {
      // console.log(error);
      // setSnackbar({ type: 'error', open: true, message: error.response.data.message });
    }
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          spacing: 2
        }}
      >
        <Grid container spacing={2} maxWidth={'xs'} justifyContent="center" alignItems='center'>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={selectedData.date}
                onChange={onChangeDate}
                disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={(date) => {
                  const filteredDays = availabilities.filter(av => av.Doctor.id === doctorId).map(av => av.weekday);
                  return !filteredDays.includes(date.getDay()); // || availabilities.filter(av => new Date(av.validUntil) < date).length > 0;
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container marginTop={5} justifyContent={'center'}>
            <Grid >
              {
                availableTimes.map(t => {
                  return (
                    <Chip 
                      key={t}
                      label={t.toJSON().slice(11,16)} 
                      onClick={() => setSelectedData({...selectedData, selectedTime: t})}
                      clickable={true}
                      color="primary" 
                      disabled={appointments.map((a) => ({doctorId: a.doctorId, date: new Date(a.arrivalTime).getTime()})).filter(a => a.doctorId === doctorId).map(a => a.date).includes(t.getTime())}
                      variant={ t === selectedData.selectedTime ? "filled": "outlined"}
                    />
                  )
                })
              }
            </Grid>
            </Grid>

          <Grid item>
            <Button color="inherit" onClick={handleSubmit}>Change Appointment</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default EditAppointment;
