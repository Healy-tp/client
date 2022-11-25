import { Button, TextField, Grid, Menu, MenuItem } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import DialogAlert from '../../../../../components/Dialog';
import { doctorDayCancelation } from '../../../../../services/appointments';
import { CANCEL_DAY_DIALOG_MSG, CANCEL_DAY_DIALOG_TITLE } from '../AppointmentCard/utils/dialogs';


const AppointmentsDoctorMenu = ({ appointments, selectedDate, handleChange }) => {
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
  }

  const handleCancelClickOpen = () => {
    setDialogOpen(true);
  }

  const handleCancelDay = async () => {
    try {
      await doctorDayCancelation({
        day: selectedDate.toJSON().slice(0, 10),
      });
      setDialogOpen(false);
    } catch (err) {
      console.log('could not cancel day', err);
    }
  }

  return (
    <Grid container spacing={2} maxWidth={'xs'} justifyContent="center" alignItems='center'>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{marginTop: 2}}
            shouldDisableDate={(date) => {
              const filteredDays = appointments.map(a => new Date(a.arrivalTime).getDay());
              return !filteredDays.includes(date.getDay());
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <Button variant='filled' onClick={handleMenu}>Manage Agenda for selected date</Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleCancelClickOpen}>Cancel all Appointments</MenuItem>
        </Menu>
      </Grid>
      <DialogAlert 
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAccept={handleCancelDay}
        title={CANCEL_DAY_DIALOG_TITLE}
        msg={CANCEL_DAY_DIALOG_MSG}
      />
    </Grid>
  )
}

export default AppointmentsDoctorMenu;
