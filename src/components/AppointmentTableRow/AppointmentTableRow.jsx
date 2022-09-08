
import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const AppointmentTableRow = ({ appt }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      key={appt.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${appt.User.firstName} ${appt.User.lastName}`}
      </TableCell>
      <TableCell>{`${appt.Doctor.firstName} ${appt.Doctor.lastName}`}</TableCell>
      <TableCell>{appt.Doctor.specialty}</TableCell>
      <TableCell>{appt.officeId}</TableCell>
      <TableCell>{appt.arrivalTime}</TableCell>
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
          <MenuItem onClick={handleClick}>Action</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}


export default AppointmentTableRow;
