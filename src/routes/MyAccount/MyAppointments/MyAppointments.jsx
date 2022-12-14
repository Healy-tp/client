import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import { getAppointmentByUserId } from '../../../services/appointments';
import { dateToString } from '../../../utils/dateTimeFormatter';
import WelcomePage from '../WelcomePage';
import AppointmentCard from './components/AppointmentCard';
import AppointmentsDoctorMenu from './components/AppointmentsDoctor';

const MyAppointments = ({ nav, isDoctor }) => {

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getAppointmentsByUserId = async () => {
      try {
        const params = isDoctor ? { isDoctor: true } : {};
        const response = await getAppointmentByUserId(params);
        setAppointments(response);
      } catch (err) {
        console.log('error getting user appointments', err);
      }
    }
    getAppointmentsByUserId();
  }, [isDoctor]);

  const handleDatePickerChange = (date) => { setSelectedDate(date) };
  
  return (
    <Container style={{ margin: 0 }}>
      {
        isDoctor && (
          <AppointmentsDoctorMenu
            appointments={appointments}
            selectedDate={selectedDate}
            handleChange={handleDatePickerChange}
          />
        )
      }
      {
        appointments.length > 0 
          ? appointments
            .filter(a => isDoctor ? a.arrivalTime.slice(0,10) === dateToString(new Date(selectedDate.setHours(0))) : true)
            .map(a => (
              <AppointmentCard 
                appt={a}
                nav={nav}
              />
            )
          ) 
          : (
            <WelcomePage
              icon='appts'
              title={"Todavia no tienes turnos"}
              subtitle={"Podes ir al inicio para sacar un turno con el medico que necesites"}
            />
          )
      }
    </Container>
    
  );
}

export default MyAppointments;
