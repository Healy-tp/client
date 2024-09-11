import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Scheduler from "../../components/Scheduler/Scheduler";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { getUsers } from "../../services/admin";
import {
  getAvailabilities,
  getAllAppointments,
} from "../../services/appointments";
import { dateToString } from "../../utils/dateTimeFormatter";

const AdminAppointmentForUser = () => {
  const [t] = useTranslation();
  const { selectedData, setSelectedData } = useContext(AppointmentContext);
  const [users, setUsers] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAvailabilities, setIsLoadingAvailabilities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersFromApi = async () => {
      const response = await getUsers();
      const filteredUsers = response.filter((user) => !user.isDoctor && !user.isAdmin);
      setUsers(filteredUsers);
    };

    const getAvailabilitiesFromApi = async () => {
      try {
        setIsLoadingAvailabilities(true);
        const response = await getAvailabilities();
        setAvailabilities(response);
      } catch (err) {
        console.log("error fetching data from API", err);
      } finally {
        setIsLoadingAvailabilities(false);
      }
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
      (selectedData.selectedTime != null || selectedData.extraAppt)
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
    if (!newValue) {
      setSelectedData({
        ...selectedData,
        user: null,
        datePickerDisabled: true,
        selectedTime: null,
      });
    } else {
      setSelectedData({
        ...selectedData,
        user: {
          name: `${newValue.firstName} ${newValue.lastName}`,
          id: newValue.id,
        },
        datePickerDisabled: false,
        selectedTime: null,
      });
    }
  };

  const handleCheckboxChange = (event) => {
    setSelectedData({ ...selectedData, extraAppt: event.target.checked });
  };

  if (isLoadingAvailabilities) {
    return (
      <CircularProgress
        size={60}
        sx={{ position: "absolute", top: "40%", left: "50%" }}
      />
    );
  }

  return (
    <Scheduler
      availableTimes={availableTimes}
      appointments={appointments}
      availabilities={availabilities}
      buttonOnClick={goToAppointmentCheckout}
      datePickerOnChange={onChangeDate}
      autoCompleteOnChange={autoCompleteOnChange}
      autoCompleteFields={{ label: t('admin.doctors.create_appointment_for_user.user'), options: users }}
      isAdmin={true}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};

export default AdminAppointmentForUser;
