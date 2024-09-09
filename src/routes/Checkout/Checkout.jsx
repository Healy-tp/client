import React, { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import { AppointmentContext } from "../../contexts/AppointmentContext";
import { newAppointment } from "../../services/appointments";
import { createAppointmentForUser } from "../../services/admin";
import ConfirmationCard from "../../components/ConfirmationCard";
import Snackbar from "../../components/Snackbar";
import { dateToString, timeToString } from "../../utils/dateTimeFormatter";

function Checkout({ from }) {
  const [t] = useTranslation();
  const { selectedData, setDefaultValues } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { open, message, type } = snackbar;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleGoBack = () => {
    setDefaultValues();
    const navigateTo = from === 'user' ? "/" : "/admin";
    navigate(navigateTo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (from === "user") {
        await newAppointment({
          arrivalTime: `${dateToString(selectedData.date)} ${timeToString(
            selectedData.selectedTime,
          )}`,
          doctorId: selectedData.doctorId,
          officeId: selectedData.selectedOffice,
        });
        setDefaultValues();
        navigate("/");
      } else {
        await createAppointmentForUser({
          arrivalTime: `${dateToString(selectedData.date)} ${timeToString(
            selectedData.selectedTime,
          )}`,
          doctorId: selectedData.doctorId,
          officeId: selectedData.selectedOffice,
          userId: selectedData.user.id,
          isExtraAppt: selectedData.extraAppt,
        });
        setDefaultValues();
        setSnackbar({
          type: "success",
          open: true,
          message: t("checkout.success"),
        });
        navigate("/admin");
      }
    } catch (error) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("checkout.error")
      });
    }
  };

  return (
    <div
      style={{
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <ConfirmationCard
        doctorName={selectedData.doctorName}
        doctorSpecialty={selectedData.doctorSpecialty}
        date={selectedData.date}
        selectedTime={selectedData.selectedTime}
        user={from === "admin" ? selectedData.user : undefined}
        handleCancel={handleGoBack}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Checkout;
