import _ from 'lodash';
import { useEffect, useState } from 'react';
import { CircularProgress, Container, Box, Tab, Tabs } from '@mui/material';

import { getAppointmentByUserId } from '../../../services/appointments';
import { dateToString } from '../../../utils/dateTimeFormatter';
import WelcomePage from '../WelcomePage';
import AppointmentCard from './components/AppointmentCard';
import AppointmentsDoctorMenu from './components/AppointmentsDoctor';


const TABS = [
  {
    label: "Past Appointments",
    value: 0,
  },
  {
    label: "Upcoming Appointments",
    value: 1,
  },
]

const MyAppointments = ({ nav, isDoctor }) => {

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabValue, setTabValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAppointmentsByUserId = async () => {
      try {
        setIsLoading(true);
        const params = isDoctor ? { isDoctor: true } : {};
        const response = await getAppointmentByUserId(params);
        setAppointments(response);
        const filtered = response.filter(a => filterAppointmentsByPastOrUpcoming(a, tabValue));
        setFilteredAppointments(filtered);
      } catch (err) {
        console.log('error getting user appointments', err);
      } finally {
        setIsLoading(false);
      }
    }
    getAppointmentsByUserId();
  }, [isDoctor]);

  const handleDatePickerChange = (date) => { setSelectedDate(date) };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const filtered = appointments.filter(a => filterAppointmentsByPastOrUpcoming(a, newValue));
    setFilteredAppointments(filtered);
  };

  const filterAppointmentsByPastOrUpcoming = (a, value) => {
    const now = new Date();
    const apptDate = a.arrivalTime || a.extraAppt;
    return value === 0 ? new Date(apptDate) < now : new Date(apptDate) > now; 
  }

  const filterAppointmentsByDate = (appt) => {
    if (isDoctor) {
      if (appt.arrivalTime) {
        return appt.arrivalTime.slice(0,10) === dateToString(new Date(selectedDate.setHours(0)));
      } else {
        return appt.extraAppt === dateToString(new Date(selectedDate.setHours(0)));
      }
    } else {
      return true;
    }
  }
  
  return (
    <Container>
      {
        isLoading ? (
          <CircularProgress
            size={60}
            sx={{ position: 'absolute', top: '40%', left: '50%' }}
          />
        ) : (
          isDoctor && (
            <AppointmentsDoctorMenu
              appointments={appointments}
              selectedDate={selectedDate}
              handleChange={handleDatePickerChange}
            />
          )
        )
      }
      {
        isLoading ? (
          <CircularProgress
            size={60}
            sx={{ position: 'absolute', top: '40%', left: '50%' }}
          />
        ) : (
          !isDoctor ? (
            appointments.length > 0 
              ? (
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} centered>
                    {_.map(TABS, (tab, i) => (
                      <Tab key={i} label={tab.label} />
                    ))}
                  </Tabs>
                  { 
                    filteredAppointments
                    .filter(filterAppointmentsByDate)
                    .map(a => (
                      <AppointmentCard 
                        appt={a}
                        nav={nav}
                      />
                    ))
                  }
                </Box>
              )
              : (
                <WelcomePage
                  icon='appts'
                  title={"Todavia no tienes turnos"}
                  subtitle={"Podes ir al inicio para sacar un turno con el medico que necesites"}
                />
              )
          ) : (
            appointments.length > 0 
            ? appointments
              .filter(filterAppointmentsByDate)
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
          )
        )
      }
    </Container>
    
  );
}

export default MyAppointments;
