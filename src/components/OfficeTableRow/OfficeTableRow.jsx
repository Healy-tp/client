
import { useState } from "react";
import _ from 'lodash';
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const OfficeTableRow = ({ office }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { id, specialties, number } = office;
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{_.join(specialties, ', ')}</TableCell>
      <TableCell>{number}</TableCell>
      <TableCell>
        <Button
          id={id}
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
