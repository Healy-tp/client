import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { useNavigate } from "react-router-dom";
import { deleteDoctor } from "../../services/admin";

const DoctorTableRow = ({ doctor }) => {
  const [t] = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedData, setSelectedData } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateAppointmentForUser = () => {
    setSelectedData({
      ...selectedData,
      doctorId: doctor.id,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      doctorSpecialty: doctor.specialty,
    });
    navigate("/admin/appointment-for-user");
  };

  const handleDeleteDoctor = async () => {
    try {
      await deleteDoctor(doctor.id)
    } catch (err) {
      console.log(err);
    }
  }

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
          {t("admin.doctors.row.options")}
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
          <MenuItem id={doctor.id} onClick={handleCreateAppointmentForUser}>
            {t("admin.doctors.row.make_appointment_for_user")}
          </MenuItem>
          <MenuItem id={doctor.id} onClick={handleDeleteDoctor} sx={{ color: "red" }}>
            {t("admin.doctors.row.delete")}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default DoctorTableRow;
