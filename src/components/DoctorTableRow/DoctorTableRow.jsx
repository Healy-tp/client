
import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const DoctorTableRow = ({doctor}) => {

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
      key={doctor.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${doctor.firstName} ${doctor.lastName}`}
      </TableCell>
      <TableCell>{doctor.specialty}</TableCell>
      <TableCell>
      <Button
        id={doctor.id}
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
        <MenuItem onClick={handleClick}>Make appointment for user</MenuItem>
      </Menu>
      </TableCell>
    </TableRow>
  )
}


export default DoctorTableRow;
