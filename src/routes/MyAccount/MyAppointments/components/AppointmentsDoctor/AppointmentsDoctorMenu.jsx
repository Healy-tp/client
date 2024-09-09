import React, { useState } from "react";
import moment from "moment";
import { Button, TextField, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DialogAlert from "../../../../../components/Dialog";
import { doctorDayCancelation } from "../../../../../services/appointments";
import Snackbar from "../../../../../components/Snackbar";
import { APPOINTMENT_STATUS } from "../../../../../utils/constants";

const AppointmentsDoctorMenu = ({
  appointments,
  selectedDate,
  handleChange,
  refetchAppointments
}) => {
  const [t] = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { open, message, type } = snackbar;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCancelClickOpen = () => {
    setDialogOpen(true);
  };

  const handleCancelDay = async () => {
    try {
      await doctorDayCancelation({
        day: selectedDate.toJSON().slice(0, 10),
      });
      setDialogOpen(false);
      setSnackbar({
        type: "success",
        open: true,
        message: t('my_account.my_appointments.doctor.cancel_all_appointments_success')
      });
      await refetchAppointments();
    } catch (err) {
      setSnackbar({
        type: "error",
        open: true,
        message: t('my_account.my_appointments.doctor.cancel_all_appointments_error')
      });
    }
  };

  const disableFn = (a) => {
    return moment(a.arrivalTime || a.extraAppt)
      .utc()
      .day();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const shouldDisableCancelAllAppointmentsOption = appointments
    .filter((appt) => 
      appt.arrivalTime.slice(0, 10) === selectedDate.toJSON().slice(0, 10) &&
      appt.status !== APPOINTMENT_STATUS.CANCELLED
    )?.length === 0;

  return (
    <Grid
      container
      spacing={2}
      maxWidth={"xs"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 2 }}
    >
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <Grid item marginBottom={2}>
        <Typography variant="h3">
          {t('my_account.my_appointments.doctor.title')} 
        </Typography>
      </Grid>
      <Grid item style={{ display: 'flex', gap: 10 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{ marginTop: 2 }}
            shouldDisableDate={(date) => {
              const filteredDays = appointments.map(disableFn);
              return !filteredDays.includes(date.getDay());
            }}
          />
        </LocalizationProvider>

        <Button variant="outlined" onClick={handleMenu}>
          {t('my_account.my_appointments.doctor.manage_agenda')}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleCancelClickOpen} disabled={shouldDisableCancelAllAppointmentsOption}>
            {t('my_account.my_appointments.doctor.cancel_all_appointments')}
          </MenuItem>
        </Menu>
      </Grid>
      <DialogAlert
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAccept={handleCancelDay}
        title={t('my_account.my_appointments.dialogs.doctor.cancel_whole_day')}
        msg={t('my_account.my_appointments.dialogs.doctor.cancel_whole_day_content')}
      />
    </Grid>
  );
};

export default AppointmentsDoctorMenu;
