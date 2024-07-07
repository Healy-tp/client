import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import _ from "lodash";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';
import { UserContext } from "../../contexts/UserContext";
import {
  getHistoryWithUser,
  upsertNotes,
  exportToPDF,
} from "../../services/appointments";
import Snackbar from "../../components/Snackbar";
import { MENU_OPTIONS } from "../MyAccount/MyAccount";

const HistoryWithUser = () => {
  const location = useLocation();
  const [t] = useTranslation();
  const counterpartId = location.state.counterpartId;

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [notesToExport, setNotesToExport] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(-1);
  const [inputText, setInputText] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

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

  const { open, message, type } = snackbar;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

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
      appointments.forEach(a => {
        if (a.id == selectedAppointment) {
          a.notes = inputText
        }
      });
      setAppointments(appointments);
      setSelectedAppointment(-1);
      setInputText("");
    } catch (err) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("my_account.notes.update_fail"),
      });
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
      setSnackbar({
        type: "error",
        open: true,
        message: t("my_account.notes.export_pdf_fail"),
      });
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
      <Button sx={{ marginY: 2 }} onClick={() => navigate("/my-account", { state: { defaultMenuOption: MENU_OPTIONS.MY_APPOINTMENTS } })}>{t("actions.go_back")}</Button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">
          {t("my_account.history_with_user.title")} {isDoctor ? t("my_account.history_with_user.patient") : t("my_account.history_with_user.dr")}{" "}
          {isDoctor ? userFullName : doctorFullName}
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
        {appointments.filter(filterFn).map((a, index) => {
          return (
            <Card key={a?.id} sx={{ marginTop: 4, padding: 2, width: "60%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">
                  {t("my_account.history_with_user.appointment")} #{index + 1}
                </Typography>
                <Typography variant="h5">
                  {a.extraAppt ? `${_.capitalize(moment(a.extraAppt).format('ll'))} Sobreturno` : _.capitalize(moment(a.arrivalTime).utc().format('LLLL'))}
                </Typography>
              </div>

              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {t("my_account.history_with_user.notes")}
              </Typography>

              <Typography
                variant={!a.notes ? "subtitle1" : "body1"}
                sx={{ marginTop: 1 }}
              >
                {!a.notes ? t("my_account.history_with_user.no_history") : a.notes}
              </Typography>

              {isDoctor && (
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
                    helperText={t("my_account.history_with_user.edit_notes")}
                    onChange={(event) => {
                      setInputText(event.target.value);
                    }}
                    multiline
                  />
                  <Button
                    onClick={() => handleEditClick(a.id)}
                    variant="contained"
                    component="label"
                    size="small"
                    endIcon={<EditIcon />}
                    sx={{ justifyContent: "center" }}
                  >
                    {editMode && selectedAppointment === a.id
                      ? t("my_account.history_with_user.cancel_edit")
                      : t("my_account.history_with_user.edit_notes")}
                  </Button>
                  {editMode && selectedAppointment === a.id && (
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      component="label"
                      size="small"
                      endIcon={<UpgradeIcon />}
                      sx={{ justifyContent: "center" }}
                    >
                      {t("my_account.history_with_user.update_notes")}
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          );
        })}
      </div>
      {notesToExport && (
        <Button
          onClick={handleExportToPDF}
          variant="contained"
          component="label"
          size="small"
          sx={{ justifyContent: "center" }}
        >
          {t("my_account.history_with_user.export_to_pdf")}
        </Button>
      )}
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
    </Container>
  );
};

export default HistoryWithUser;
