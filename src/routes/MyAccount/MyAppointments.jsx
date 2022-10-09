import { useEffect, useState } from 'react';

import { Container } from '@mui/material';


import { getAppointmentByUserId } from '../../services/appointments';
import { dateToString } from '../../utils/dateTimeFormatter';
import WelcomePage from './WelcomePage';
import AppointmentCard from './AppointmentCard';
import AppointmentsDoctorMenu from './AppointmentsDoctorMenu';


const MyAppointments = ({ nav, isDoctor }) => {

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getAppointmentsByUserIdFromApi = async () => {
      const response = await getAppointmentByUserId(isDoctor ? { isDoctor: true } : {});
      console.log(response);
      setAppointments(response);
    }
    getAppointmentsByUserIdFromApi();
  }, []);

  const handleDatePickerChange = (date) => {setSelectedDate(date)};
  
  return (
    <Container sx={{marginTop: 2}}>
      {
        isDoctor ? (
          <AppointmentsDoctorMenu
            appointments={appointments}
            selectedDate={selectedDate}
            handleChange={handleDatePickerChange}
          />
        ) : <></>
      }
      {
        appointments.length > 0 ? appointments.filter(a => isDoctor ? a.arrivalTime.slice(0,10) === dateToString(selectedDate) : true).map(a => (
          <AppointmentCard 
            appt={a}
            nav={nav}
          />
        )) : (
          <WelcomePage
            icon='appts'
            msg1={"Todavia no tienes turnos"}
            msg2={"Podes ir al inicio para sacar un turno con el medico que necesites"}
          />
        )
      }
    </Container>
    
  );
}

export default MyAppointments;
