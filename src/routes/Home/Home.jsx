import {Box, Grid, TextField, Autocomplete, Stack, Chip, Button, Container} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {useState, useEffect} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {getDoctors, getAvailabilities, getAllAppointments} from '../../services/appointments';
import { useContext } from 'react';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { useNavigate } from 'react-router-dom';


function Home() {

  const {selectedData, setSelectedData} = useContext(AppointmentContext)

  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availabilities, setAvailabilities] = useState([])
  const [appointments, setAppointments] = useState([])

  const navigate = useNavigate();

  useEffect(() => { 
    const getDoctorsFromApi = async () => {
      const response = await getDoctors();
      setDoctors(response.data);
    }
    const getAvailabilitiesFromApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response.data);
    }

    const getAllAppointmentsFromApi = async () => {
      const response = await getAllAppointments();
      setAppointments(response.data);
    }

    getDoctorsFromApi();
    getAvailabilitiesFromApi();
    getAllAppointmentsFromApi();
  }, []);

  const allSelectedData = () => {
    return selectedData.doctorId != null && selectedData.date != null && selectedData.selectedTime != null; 
  }

  const goToAppointmentCheckout = () => {
    if (!allSelectedData()) {

      return;
    }
    navigate('/appointment/checkout')
  };

  const onChangeDate = (date) => {
    const times = [];
    const selectedDate = availabilities.filter(a => a.weekday === date.getDay() && a.doctorId === selectedData.doctorId)[0];
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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Autocomplete
              disablePortal
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              onChange={(event, newValue) => {
                setSelectedData({
                  ...selectedData, 
                  doctorId: newValue ? newValue.id : null,
                  doctorName: newValue ? `${newValue.firstName} ${newValue.lastName}` : null,
                  doctorSpecialty: newValue ? newValue.specialty : null,
                  datePickerDisabled: newValue ? false: true,
                  selectedTime: null,
                });
                setAvailableTimes([]);
              }}
              id="combo-box-demo"
              options={doctors}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={selectedData.date}
                onChange={onChangeDate}
                disabled={selectedData.datePickerDisabled}
                disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={(date) => {
                  const filteredDays = availabilities.filter(av => av.doctorId === selectedData.doctorId).map(av => av.weekday);
                  return !filteredDays.includes(date.getDay()); // || availabilities.filter(av => new Date(av.validUntil) < date).length > 0;
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} justifyContent="center">
              {
                availableTimes.map(t => {
                  return <Chip 
                            key={t}
                            label={t.toJSON().slice(11,16)} 
                            onClick={() => setSelectedData({...selectedData, selectedTime: t})}
                            clickable={true}
                            color="primary" 
                            disabled={appointments.map((a) => ({doctorId: a.doctorId, date: new Date(a.arrivalTime).getTime()})).filter(a => a.doctorId === selectedData.doctorId).map(a => a.date).includes(t.getTime())}
                            variant={ t === selectedData.selectedTime ? "filled": "outlined"}
                          />
                })
              }
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" onClick={goToAppointmentCheckout}>Take Appointment</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home;
