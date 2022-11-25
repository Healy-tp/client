import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from "react";
import _ from 'lodash';
import { getAppointments } from "../../services/admin";
import AdminTable from "../AdminTable";
import { Container, TextField } from '@mui/material';

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const headers = ['Users Name', 'Doctors Name', 'Doctors Specialty', 'Office ID', 'Arrival Time', 'Status', 'Assisted']

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await getAppointments();
      const sortedData = _.sortBy(response, ['id']);
      setAppointments(sortedData);
    } catch (err) {
      console.log('Error while fetching appointments: ', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOnChange = (date) => {
    setSelectedDate(date);
    const filtered = appointments.filter(a => date.toJSON().slice(0, 10) === a.arrivalTime.slice(0, 10));
    setFilteredAppointments(filtered);
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={handleOnChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{marginTop: 2}}
        />
      </LocalizationProvider>
      <AdminTable 
        headers={headers} 
        rows={filteredAppointments} 
        kind={'appointment'}
        updateRows={fetchAppointments}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default AppointmentsAdmin;
