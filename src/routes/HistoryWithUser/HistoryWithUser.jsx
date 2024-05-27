import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';
import { UserContext } from "../../contexts/UserContext";
import {
  getHistoryWithUser,
  upsertNotes,
  exportToPDF,
} from "../../services/appointments";

const HistoryWithUser = () => {
  const location = useLocation();
  const counterpartId = location.state.counterpartId;

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [notesToExport, setNotesToExport] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(-1);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchHistoryWithUserFromApi = async () => {
      try {
        const response = await getHistoryWithUser(counterpartId);
        setNotesToExport(response.some((a) => a.notes));
        setAppointments(response);
      } catch (err) {
        console.log("error getting user history", err);
      }
    };

    fetchHistoryWithUserFromApi();
  }, []);

  const isDoctor = currentUser.isDoctor;
  const userFullName =
    appointments.length > 0
      ? `${appointments[0].User.firstName} ${appointments[0].User.lastName}`
      : "";
  const doctorFullName =
    appointments.length > 0
      ? `${appointments[0].Doctor.firstName} ${appointments[0].Doctor.lastName}`
      : "";

  const handleEditClick = (apptId) => {
    setEditMode(!editMode);
    setSelectedAppointment(apptId === selectedAppointment ? -1 : apptId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await upsertNotes(selectedAppointment, { text: inputText });
      setEditMode(false);
      setSelectedAppointment(-1);
      setInputText("");
    } catch (err) {
      console.log("error updating notes", err);
    }
  };

  const handleExportToPDF = async (event) => {
    event.preventDefault();
    try {
      const response = await exportToPDF({
        doctorId: appointments[0].doctorId,
        userId: appointments[0].userId,
      });
      let url = window.URL.createObjectURL(new Blob([response.data]));
      let a = document.createElement("a");
      a.href = url;
      a.download = "history.pdf";
      a.click();
    } catch (err) {
      console.log("error exporting to pdf", err);
    }
  };

  const filterFn = (a) => {
    const now = new Date();
    const apptDate = a.arrivalTime || a.extraAppt;
    return new Date(apptDate) <= now
      ? a.status === "confirmed" && a.assisted
      : a.status === "confirmed";
  };

  return (
    <Container sx={{ spacing: 2 }}>
      <Button onClick={() => navigate("/my-account")}>Volver</Button>
      <Typography variant="h2">
        Historial de turnos con {isDoctor ? "Paciente" : "Doctor"}:{" "}
        {isDoctor ? userFullName : doctorFullName}
      </Typography>
      {appointments.filter(filterFn).map((a) => {
        return (
          <Card key={a?.id} sx={{ marginTop: 8 }}>
            <Typography variant="h4">
              {a.extraAppt ? `${moment(a.extraAppt).format('ll')} Sobreturno` : moment(a.arrivalTime).utc().format('LLLL')}

            </Typography>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Notas
            </Typography>

            <Typography
              variant={!a.notes ? "subtitle1" : "body1"}
              color={!a.notes ? "blue" : "black"}
              sx={{ marginTop: 1 }}
            >
              {!a.notes ? "No hay notas hasta el momento" : a.notes}
            </Typography>

            {isDoctor ? (
              <Box
                component="form"
                onSubmit={() => {}}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <TextField
                  disabled={!editMode && selectedAppointment !== a.id}
                  fullWidth
                  defaultValue={!editMode ? "" : a.notes}
                  maxRows="5"
                  helperText="Editar Notas"
                  onChange={(event) => {
                    setInputText(event.target.value);
                  }}
                  // disabled={editMode || selectedAppointment === a.id}
                  multiline
                ></TextField>
                <Button
                  onClick={() => handleEditClick(a.id)}
                  variant="contained"
                  component="label"
                  size="small"
                  endIcon={<EditIcon />}
                  sx={{ justifyContent: "center" }}
                >
                  {editMode && selectedAppointment === a.id
                    ? "Cancelar Edicion"
                    : "Editar Notas"}
                </Button>
                {editMode && selectedAppointment === a.id ? (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    component="label"
                    size="small"
                    endIcon={<UpgradeIcon />}
                    sx={{ justifyContent: "center" }}
                  >
                    Actualizar notas
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            ) : (
              <></>
            )}
          </Card>
        );
      })}
      {notesToExport ? (
        <Button
          onClick={handleExportToPDF}
          variant="contained"
          component="label"
          size="small"
          sx={{ justifyContent: "center" }}
        >
          Export to PDF
        </Button>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default HistoryWithUser;
