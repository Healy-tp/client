import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getAppointments } from "../../services/admin";
import AdminTable from "../AdminTable";
import { Container, TextField } from "@mui/material";

const AppointmentsAdmin = () => {
  const [t] = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    t("admin.appointments.row.headers.user_name"),
    t("admin.appointments.row.headers.doctor_name"),
    t("admin.appointments.row.headers.doctor_specialty"),
    t("admin.appointments.row.headers.office_number"),
    t("admin.appointments.row.headers.arrival_time"),
    t("admin.appointments.row.headers.status"),
    t("admin.appointments.row.headers.assisted"),
  ];

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await getAppointments();
      const sortedData = _.sortBy(response, ["id"]);
      setAppointments(sortedData);
    } catch (err) {
      console.log("Error while fetching appointments: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFn = (a, date) => {
    if (a.arrivalTime)
      return date.toJSON().slice(0, 10) === a.arrivalTime.slice(0, 10);
    return a.extraAppt === date.toJSON().slice(0, 10);
  };

  const handleOnChange = (date) => {
    setSelectedDate(date);
    const filtered = appointments.filter((a) => filterFn(a, date));
    setFilteredAppointments(filtered);
  };

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
          sx={{ marginTop: 2 }}
        />
      </LocalizationProvider>
      <AdminTable
        headers={headers}
        rows={filteredAppointments}
        kind={"appointment"}
        updateRows={fetchAppointments}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default AppointmentsAdmin;
