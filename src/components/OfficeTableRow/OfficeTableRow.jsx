
import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const OfficeTableRow = ({office}) => {

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
      key={office.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {office.id}
      </TableCell>
      <TableCell>{office.specialties}</TableCell>
      <TableCell>
      <Button
        id={office.id}
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
        <MenuItem onClick={handleClick}>Actions</MenuItem>
      </Menu>
      </TableCell>
    </TableRow>
  )
}


export default OfficeTableRow;
