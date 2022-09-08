
import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const AvailabilityTableRow = ({ av }) => {

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
      key={av.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${av.Doctor.firstName} ${av.Doctor.lastName}`}
      </TableCell>
      <TableCell>{av.Doctor.specialty}</TableCell>
      <TableCell>{av.officeId}</TableCell>
      <TableCell>{av.weekday}</TableCell>
      <TableCell>{av.startHour}</TableCell>
      <TableCell>{av.endHour}</TableCell>
      <TableCell>{av.frequency}</TableCell>
      <TableCell>{av.validUntil}</TableCell>
      <TableCell>
        <Button
          id={av.id}
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


export default AvailabilityTableRow;
