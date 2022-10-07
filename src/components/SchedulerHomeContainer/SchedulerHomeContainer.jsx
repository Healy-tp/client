import {Box, Container} from '@mui/material';
import {useState, useEffect, useContext} from 'react';
import {getDoctors, getAvailabilities, getAllAppointments} from '../../services/appointments';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { useNavigate } from 'react-router-dom';
import Scheduler from '../Scheduler/Scheduler';


function SchedulerHomeContainer() {

  const {selectedData, setSelectedData} = useContext(AppointmentContext)

  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => { 
    const getDoctorsFromApi = async () => {
      const response = await getDoctors();
      setDoctors(response);
    }
    const getAvailabilitiesFromApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response);
    }

    const getAllAppointmentsFromApi = async () => {
      const response = await getAllAppointments();
      setAppointments(response);
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
    const selectedDate = availabilities.filter(a => a.weekday === date.getDay() && a.Doctor.id === selectedData.doctorId)[0];
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

  const autoCompleteOnChange = (event, newValue) => {
    setSelectedData({
      ...selectedData, 
      doctorId: newValue ? newValue.id : null,
      doctorName: newValue ? `${newValue.firstName} ${newValue.lastName}` : null,
      doctorSpecialty: newValue ? newValue.specialty : null,
      datePickerDisabled: newValue ? false: true,
      selectedTime: null,
    });
    setAvailableTimes([]);
  }


  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/src/assets/background.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Scheduler 
          availableTimes={availableTimes}
          appointments={appointments}
          availabilities={availabilities}
          buttonOnClick={goToAppointmentCheckout}
          datePickerOnChange={onChangeDate}
          autoCompleteOnChange={autoCompleteOnChange}
          autoCompleteFields={{label: 'Doctor', options: doctors}}
        />
      </Container>
    </Box>
  );
}

export default SchedulerHomeContainer;
