import React, { useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';
import _ from "lodash";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
  Snackbar,
  Chip,
} from "@mui/material";

import DialogAlert from "../../../../../components/Dialog";
import {
  confirmAppointment,
  deleteAppointment,
  doctorCancelation,
  startChat,
} from "../../../../../services/appointments";
import { UserContext } from "../../../../../contexts/UserContext";
import statusColor from "./utils/statusColor";

const cardWidth = 700;

const AppointmentCard = ({ 
  appt,
  nav,
  appointmentsList,
  setFilteredAppointments,
  setAppointments,
  setIsLoading
}) => {
  const [t] = useTranslation();
  const { currentUser } = useContext(UserContext);
  const isDoctor = currentUser.isDoctor;
  const navigate = useNavigate();

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [confirmApptDialogOpen, setConfirmDialogOpen] = useState(false);
  const [apptId, setApptId] = useState(-1);

  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
  });
  const { open, message } = snackbar;

  const handleMessageClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setMessageDialogOpen(true);
  };

  const handleCancelClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setCancelDialogOpen(true);
  };

  const handleConfirmApptClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setConfirmDialogOpen(true);
  };

  const handleClose = () => {
    setApptId(-1);
    setMessageDialogOpen(false);
    setCancelDialogOpen(false);
    setConfirmDialogOpen(false);
    setSnackBar({ open: false, message: "" });
  };

  const handleMessageAccept = async () => {
    try {
      await startChat(apptId);
      nav();
    } catch (err) {
      const errorMsg = _.get(
        err,
        "response.data.errors[0].message",
        "Something went wrong",
      );
      setSnackBar({ open: true, message: t("my_account.chat.start_chat_fail") });
      console.log("error starting chat with user", errorMsg);
    }
  };

  const handleCancelAccept = async () => {
    setIsLoading(true);
    try {
      if (isDoctor) {
        await doctorCancelation(apptId);
      } else {
        await deleteAppointment(apptId);
      }
      setCancelDialogOpen(false);
      setApptId(-1);
      setAppointments(appointmentsList.filter(a => a.id != apptId));
      setFilteredAppointments(appointmentsList.filter(a => a.id != apptId));
    } catch (err) {
      const errorMsg = _.get(
        err,
        "response.data.errors[0].message",
        "Something went wrong",
      );
      console.log("Error canceling appointment", errorMsg);
      setSnackBar({ open: true, message: t("my_account.cancel_appt_fail") });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAppt = async () => {
    try {
      await confirmAppointment(apptId);
      setConfirmDialogOpen(false);
      appointmentsList.forEach(a => {
        if (a.id == apptId) {
          a.status = 'confirmed'
        }
      });
      setFilteredAppointments(appointmentsList);
      setApptId(-1);
    } catch (err) {
      console.log("error confirming appointment", err);
    }
  };

  const canStartChat = () => {
    const date = appt.arrivalTime || appt.extraAppt;
    const now = new Date();
    return (
      moment(now).isSameOrBefore(date)
        ? moment(now).isSameOrAfter(moment(date).subtract(7, 'days'))
        : moment(now).isSameOrBefore(moment(date).add(15, 'days'))
    );
  }

  const { id, Doctor, User, status, Office, arrivalTime } = appt;
  return (
    <Card
      key={id}
      sx={{ width: `${cardWidth}px`, marginTop: 2, flexDirection: "column", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardContent style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <Typography variant="h6">
            {!isDoctor ? (
              <Link
                onClick={() =>
                  navigate(`/history-with-user/${appt.doctorId}`, {
                    state: { counterpartId: appt.doctorId },
                  })
                }
              >
                {Doctor.firstName} {Doctor.lastName} - {Doctor.specialty}
              </Link>
            ) : (
              <Link
                onClick={() =>
                  navigate(`/history-with-user/${User.id}`, {
                    state: { counterpartId: User.id },
                  })
                }
              >
                {User.firstName} {User.lastName}
              </Link>
            )}
          </Typography>
          <div
            style={{
              backgroundColor: statusColor(status),
              padding: "5px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{t(`my_account.my_appointments.status.${status}`)}</Typography>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="body">
            {t('my_account.my_appointments.office')}: <Chip label={Office.number} />
          </Typography>
          <Typography variant="body">
            {
              `${t('my_account.my_appointments.date')}: ` 
              // ${arrivalTime ? moment(arrivalTime).utc().format('llll') : moment(appt.extraAppt).utc().format('ll')}`
            }
            <Chip label={arrivalTime ? _.capitalize(moment(arrivalTime).utc().format('LLLL')) : moment(appt.extraAppt).utc().format('ll')} />
          </Typography>
        </div>
        {/* <Typography variant="body">
          {`${t('my_account.my_appointments.time')}: ${arrivalTime ? arrivalTime.slice(11, 16) : 'Sobreturno'}`}
        </Typography> */}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => handleCancelClickOpen(id)}
        >
          {t('my_account.my_appointments.cancel')}
        </Button>
        {!isDoctor && status === "to_confirm" && (
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={() => handleConfirmApptClickOpen(id)}
          >
            {t('my_account.my_appointments.confirm')}
          </Button>
        )}
        {!isDoctor && (
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              navigate(`/my-account/${id}/edit`, { state: { appt } })
            }
            disabled={!moment().add(3, 'days').isBefore(moment(appt.arrivalTime))}
          >
            {t('my_account.my_appointments.modify')}
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          onClick={() => handleMessageClickOpen(id)}
          disabled={!canStartChat()}
        >
          {t('my_account.my_appointments.send_message')}
        </Button>
      </CardActions>

      <DialogAlert
        open={messageDialogOpen}
        handleAccept={handleMessageAccept}
        handleClose={handleClose}
        title={t('my_account.my_appointments.dialogs.start_chat', {
          userType: isDoctor ? t('user_types.patient') : t('user_types.doctor')
        })}
        msg={t('my_account.my_appointments.dialogs.start_chat_content', {
          userType: isDoctor ? t('user_types.patient') : t('user_types.doctor')
        })}
      />

      <DialogAlert
        open={cancelDialogOpen}
        handleAccept={handleCancelAccept}
        handleClose={handleClose}
        title={t('my_account.my_appointments.dialogs.cancel_appointment')}
        msg={t('my_account.my_appointments.dialogs.cancel_appointment_content')}
      />

      <DialogAlert
        open={confirmApptDialogOpen}
        handleAccept={handleConfirmAppt}
        handleClose={handleClose}
        title={t('my_account.my_appointments.dialogs.confirm_appointment')}
        msg={t('my_account.my_appointments.dialogs.confirm_appointment_content')}
      />

      <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
    </Card>
  );
};

export default AppointmentCard;
