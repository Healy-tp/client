import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CircularProgress, Container, Box, Tab, Tabs, Typography } from "@mui/material";

import { getAppointmentByUserId } from "../../../services/appointments";
import { dateToString } from "../../../utils/dateTimeFormatter";
import WelcomePage from "../WelcomePage";
import AppointmentCard from "./components/AppointmentCard";
import AppointmentsDoctorMenu from "./components/AppointmentsDoctor";

const MyAppointments = ({ nav, isDoctor }) => {
  const [t] = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabValue, setTabValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const TABS = [
    {
      label: t('my_account.my_appointments.past_appointments'),
      value: 0,
    },
    {
      label: t('my_account.my_appointments.upcoming_appointments'),
      value: 1,
    },
  ];

  const getAppointmentsByUserId = async () => {
    try {
      setIsLoading(true);
      const params = isDoctor ? { isDoctor } : {};
      const response = await getAppointmentByUserId(params);
      setAppointments(response);
      const filtered = response.filter((a) =>
        filterAppointmentsByPastOrUpcoming(a, tabValue),
      );
      setFilteredAppointments(filtered);
    } catch (err) {
      console.log("error getting user appointments", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointmentsByUserId();
  }, [isDoctor]);

  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const filtered = appointments.filter((a) =>
      filterAppointmentsByPastOrUpcoming(a, newValue),
    );
    setFilteredAppointments(filtered);
  };

  const filterAppointmentsByPastOrUpcoming = (a, value) => {
    const now = new Date();
    const apptDate = a.arrivalTime || a.extraAppt;
    return value === 0 ? new Date(apptDate) < now : new Date(apptDate) > now;
  };

  const filterAppointmentsByDate = (appt) => {
    if (isDoctor) {
      if (appt.arrivalTime) {
        return (
          appt.arrivalTime.slice(0, 10) ===
          dateToString(new Date(selectedDate.setHours(0)))
        );
      } else {
        return (
          appt.extraAppt === dateToString(new Date(selectedDate.setHours(0)))
        );
      }
    } else {
      return true;
    }
  };

  const hasAppointments = appointments.length > 0;
  const hasAppointmentsOnDate = filteredAppointments.some(filterAppointmentsByDate);

  if (isLoading) {
    return (
      <CircularProgress
        size={60}
        sx={{ position: "absolute", top: "40%", left: "50%" }}
      />
    );
  }

  return (
    <Container>
      {isDoctor && (
        <AppointmentsDoctorMenu
          appointments={appointments}
          selectedDate={selectedDate}
          handleChange={handleDatePickerChange}
          refetchAppointments={getAppointmentsByUserId}
        />
      )}
      {!isDoctor ? (
        hasAppointments ? (
          <Box sx={{ width: "100%", mb: 8, bgcolor: "background.paper", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              {_.map(TABS, (tab, i) => (
                <Tab key={i} label={tab.label} />
              ))}
            </Tabs>
            {filteredAppointments.filter(filterAppointmentsByDate).map((a) => (
              <AppointmentCard 
                key={a.id}
                appt={a}
                nav={nav}
                appointmentsList={filteredAppointments}
                setAppointments={setAppointments}
                setFilteredAppointments={setFilteredAppointments}
                setIsLoading={setIsLoading}
              />
            ))}
          </Box>
        ) : (
          <WelcomePage
            icon="appts"
            title={t('my_account.my_appointments.no_appointments_title')}
            subtitle={t('my_account.my_appointments.no_appointments_title')}
          />
        )
      ) : hasAppointments ? (
        <Box sx={{ width: "100%", mt: 2, mb: 8, bgcolor: "background.paper", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }}>
          {hasAppointmentsOnDate && (
            appointments
              .filter(filterAppointmentsByDate)
              .map((a) => (
                <AppointmentCard 
                  key={a.id} 
                  appt={a} 
                  nav={nav}
                  appointmentsList={filteredAppointments}
                  setAppointments={setAppointments}
                  setFilteredAppointments={setFilteredAppointments}
                  setIsLoading={setIsLoading}
                />
              ))) || (
                <Typography variant="h6">
                  {t('my_account.my_appointments.no_appointments_on_date')}
                </Typography>
            )
          }
        </Box>
      ) : (
        <WelcomePage
          icon="appts"
          title={t('my_account.my_appointments.no_appointments_title')}
          subtitle={t('my_account.my_appointments.no_appointments_title')}
        />
      )}
    </Container>
  );
};

export default MyAppointments;
