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
