import { Button, TextField, Grid, Menu, MenuItem } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';


const AppointmentsDoctorMenu = ({ appointments, selectedDate, handleChange }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MenuItem onClick={() => {}}>Cancel all Appointments</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

export default AppointmentsDoctorMenu;
