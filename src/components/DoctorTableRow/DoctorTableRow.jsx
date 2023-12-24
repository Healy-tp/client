import React, { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { useNavigate } from "react-router-dom";

const DoctorTableRow = ({ doctor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedData, setSelectedData } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    setSelectedData({
      ...selectedData,
      doctorId: doctor.id,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      doctorSpecialty: doctor.specialty,
    });
    navigate("/admin/appointment-for-user");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      key={doctor.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${doctor.firstName} ${doctor.lastName}`}
      </TableCell>
      <TableCell>{doctor.specialty}</TableCell>
      <TableCell>
        <Button
          id={doctor.id}
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
          <MenuItem id={doctor.id} onClick={handleClick}>
            Make appointment for user
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default DoctorTableRow;
