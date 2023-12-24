import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scheduler from "../../components/Scheduler/Scheduler";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { getUsers } from "../../services/admin";
import {
  getAvailabilities,
  getAllAppointments,
} from "../../services/appointments";
import { dateToString } from "../../utils/dateTimeFormatter";

const AdminAppointmentForUser = () => {
  const { selectedData, setSelectedData } = useContext(AppointmentContext);
  const [users, setUsers] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersFromApi = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    const getAvailabilitiesFromApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response);
    };

    const getAllAppointmentsFromApi = async () => {
      const response = await getAllAppointments();
      setAppointments(response);
    };

    try {
      getUsersFromApi();
      getAvailabilitiesFromApi();
      getAllAppointmentsFromApi();
    } catch (err) {
      console.log("error fetching data from API", err);
    }
  }, []);

  const allSelectedData = () => {
    return (
      selectedData.doctorId != null &&
      selectedData.date != null &&
      selectedData.selectedTime != null
    );
  };

  const goToAppointmentCheckout = () => {
    if (!allSelectedData()) {
      return;
    }
    navigate("/admin/appointment-for-user/create");
  };

  const onChangeDate = (date) => {
    const times = [];
    const selectedDate = availabilities.filter(
      (a) =>
        a.weekday === date.getDay() && a.Doctor.id === selectedData.doctorId,
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

  const autoCompleteOnChange = (event, newValue) => {
    setSelectedData({
      ...selectedData,
      user: {
        name: `${newValue.firstName} ${newValue.lastName}`,
        id: newValue.id,
      },
      datePickerDisabled: newValue ? false : true,
      selectedTime: null,
    });
  };

  const handleCheckboxChange = (event) => {
    setSelectedData({ ...selectedData, extraAppt: event.target.checked });
  };

  return (
    <Scheduler
      availableTimes={availableTimes}
      appointments={appointments}
      availabilities={availabilities}
      buttonOnClick={goToAppointmentCheckout}
      datePickerOnChange={onChangeDate}
      autoCompleteOnChange={autoCompleteOnChange}
      autoCompleteFields={{ label: "User", options: users }}
      isAdmin={true}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};

export default AdminAppointmentForUser;
