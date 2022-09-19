import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Scheduler from '../../components/Scheduler/Scheduler';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { getUsers } from '../../services/admin';
import {getAvailabilities, getAllAppointments} from '../../services/appointments';


const AdminAppointmentForUser = () => {

  const {selectedData, setSelectedData} = useContext(AppointmentContext);
  const [users, setUsers] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersFromApi = async () => {
      const response = await getUsers();
      setUsers(response);
    }
    const getAvailabilitiesFromApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response.data);
    }

    const getAllAppointmentsFromApi = async () => {
      const response = await getAllAppointments();
      setAppointments(response.data);
    }

    getUsersFromApi();
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
    navigate('/admin/appointment-for-user/create')
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
      user: {
        name: `${newValue.firstName} ${newValue.lastName}`,
        id: newValue.id,
      },
      datePickerDisabled: newValue ? false: true,
      selectedTime: null,
    });
  }

  return (
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //   </Box>
    //     <Autocomplete
    //       disablePortal
    //       getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
    //       onChange={(event, newValue) => {
    //         setSelectedData({
    //           ...selectedData, 
    //           user: {
    //             name: `${newValue.firstName} ${newValue.lastName}`,
    //             id: newValue.id,
    //           },
    //           datePickerDisabled: newValue ? false: true,
    //           selectedTime: null,
    //         });
    //       }}
    //       id="combo-box-demo"
    //       options={users}
    //       sx={{ width: 300 }}
    //       renderInput={(params) => <TextField {...params} label="User" />}
    //     />

    //     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //       <DatePicker
    //         label="Date"
    //         value={selectedData.date}
    //         onChange={onChangeDate}
    //         disabled={selectedData.datePickerDisabled}
    //         disablePast={true}
    //         renderInput={(params) => <TextField {...params} />}
    //         shouldDisableDate={(date) => {
    //           const filteredDays = availabilities.filter(av => av.Doctor.id === selectedData.doctorId).map(av => av.weekday);
    //           return !filteredDays.includes(date.getDay()); // || availabilities.filter(av => new Date(av.validUntil) < date).length > 0;
    //         }}
    //       />
    //     </LocalizationProvider>

    //     <Stack direction="row" spacing={1} justifyContent="center">
    //       {
    //         availableTimes.map(t => {
    //           return <Chip 
    //                     key={t}
    //                     label={t.toJSON().slice(11,16)} 
    //                     onClick={() => setSelectedData({...selectedData, selectedTime: t})}
    //                     clickable={true}
    //                     color="primary" 
    //                     // disabled={appointments.map((a) => ({doctorId: a.doctorId, date: new Date(a.arrivalTime).getTime()})).filter(a => a.doctorId === selectedData.doctorId).map(a => a.date).includes(t.getTime())}
    //                     variant={ t === selectedData.selectedTime ? "filled": "outlined"}
    //                   />
    //         })
    //       }
    //     </Stack>
    //     <Button color="inherit" onClick={goToAppointmentCheckout}>Take Appointment</Button>

    // </Container>
    <Scheduler 
      availableTimes={availableTimes}
      appointments={appointments}
      availabilities={availabilities}
      buttonOnClick={goToAppointmentCheckout}
      datePickerOnChange={onChangeDate}
      autoCompleteOnChange={autoCompleteOnChange}
      autoCompleteFields={{label: 'User', options: users}}
    />
  )
}

export default AdminAppointmentForUser;
