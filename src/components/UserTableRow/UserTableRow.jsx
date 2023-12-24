import React, { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";

const UserTableRow = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    // setSelectedData({...selectedData, doctorId: doctor.id, doctorName: `${doctor.firstName} ${doctor.lastName}`, specialty: doctor.specialty})
    // navigate('/admin/appointment-for-user');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      key={user.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${user.firstName} ${user.lastName}`}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.status}</TableCell>
      <TableCell>
        <Button
          id={user.id}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={showMenu}
        >
          Options
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem id={user.id} onClick={handleClick}>
            Action
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
