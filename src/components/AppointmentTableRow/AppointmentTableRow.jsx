
import { useState } from "react";
import _ from 'lodash';
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { dateTimeToString } from '../../utils/dateTimeFormatter';

const AppointmentTableRow = ({ appt, updateRows, setSnackbar }) => {
  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      key={appt.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">{`${appt.User.firstName} ${appt.User.lastName}`}</TableCell>
      <TableCell>{`${appt.Doctor.firstName} ${appt.Doctor.lastName}`}</TableCell>
      <TableCell>{appt.Doctor.specialty}</TableCell>
      <TableCell>{appt.officeId}</TableCell>
      <TableCell>{dateTimeToString(appt.arrivalTime)}</TableCell>
      {/* Editable */}
      <TableCell>{appt.status}</TableCell>
      <TableCell>
        <Button
          id={appt.id}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Options
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleEdit}>Edit Appointment</MenuItem>
          <MenuItem onClick={() => console.log('TODO')}>Delete</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}


export default AppointmentTableRow;
