import moment from "moment";
import { Button, TextField, Grid, Menu, MenuItem } from "@mui/material";
import { useTranslation } from 'react-i18next';

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import DialogAlert from "../../../../../components/Dialog";
import { doctorDayCancelation } from "../../../../../services/appointments";

const AppointmentsDoctorMenu = ({
  appointments,
  selectedDate,
  handleChange,
}) => {
  const [t] = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    } catch (err) {
      console.log("could not cancel day", err);
    }
  };

  const disableFn = (a) => {
    return moment(a.arrivalTime || a.extraAppt)
      .utc()
      .day();
  };

  return (
    <Grid
      container
      spacing={2}
      maxWidth={"xs"}
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 2 }}
    >
      <Grid item>
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
      </Grid>
      <Grid item>
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
          <MenuItem onClick={handleCancelClickOpen}>
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
