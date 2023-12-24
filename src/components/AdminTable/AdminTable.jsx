import React, { useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DoctorTableRow from "../DoctorTableRow/DoctorTableRow";
import AvailabilityTableRow from "../AvailabilityTableRow/AvailabilityTableRow";
import OfficeTableRow from "../OfficeTableRow/OfficeTableRow";
import AppointmentTableRow from "../AppointmentTableRow/AppointmentTableRow";
import UserTableRow from "../UserTableRow/UserTableRow";
import Snackbar from "../../components/Snackbar";

const AdminTable = ({ headers, isLoading, kind, rows, updateRows }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const { open, message, type } = snackbar;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <TableContainer component={Paper}>
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((h, i) => (
              <TableCell key={i}>{h}</TableCell>
            ))}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <CircularProgress
              size={60}
              sx={{ position: "absolute", top: "40%", left: "50%" }}
            />
          ) : (
            rows.map((row) =>
              kind === "doctor" ? (
                <DoctorTableRow key={row?.id} doctor={row} />
              ) : kind === "user" ? (
                <UserTableRow key={row?.id} user={row} />
              ) : kind === "office" ? (
                <OfficeTableRow
                  key={row?.id}
                  office={row}
                  updateRows={updateRows}
                  setSnackbar={setSnackbar}
                />
              ) : kind === "appointment" ? (
                <AppointmentTableRow
                  key={row?.id}
                  appt={row}
                  updateRows={updateRows}
                  setSnackbar={setSnackbar}
                />
              ) : kind === "availability" ? (
                <AvailabilityTableRow
                  key={row?.id}
                  availability={row}
                  updateRows={updateRows}
                  setSnackbar={setSnackbar}
                />
              ) : (
                <></>
              ),
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
