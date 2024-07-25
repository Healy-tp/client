import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDoctor } from "../../services/admin";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  specialty: "",
};

const NewDoctor = () => {
  const [t] = useTranslation();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, phoneNumber, email, specialty } = formFields;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDoctor({
        firstName,
        lastName,
        phoneNumber,
        email,
      });
      // setSnackbar({ type: 'success', open: true, message: 'Successfully registered' });
      navigate("/admin");
    } catch (error) {
      console.log("Could not create new doctor", error);
      // setSnackbar({ type: 'error', open: true, message: error.response.data.errors[0].message });
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  }

  return (
    <Box
      sx={{
        margin: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      /> */}
      <Button variant="outlined" color="error" onClick={handleCancel} style={{ alignSelf: 'flex-start' }}>
        {t('actions.go_back')}
      </Button>
      <Typography component="h1" variant="h5">
        {t("admin.doctors.new_doctor.title")}
      </Typography>
      <Box component="form" sx={{ mt: 1, maxWidth: '500px' }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label={t("admin.doctors.new_doctor.first_name")}
          name="firstName"
          value={firstName}
          onChange={handleChange}
          autoComplete="firstName"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label={t("admin.doctors.new_doctor.last_name")}
          name="lastName"
          value={lastName}
          onChange={handleChange}
          autoComplete="lastName"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("admin.doctors.new_doctor.email")}
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label={t("admin.doctors.new_doctor.phone")}
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          autoComplete="phoneNumber"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="specialty"
          label={t("admin.doctors.new_doctor.specialty")}
          name="specialty"
          value={specialty}
          onChange={handleChange}
          autoComplete="specialty"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("admin.doctors.new_doctor.submit")}
        </Button>
      </Box>
    </Box>
  );
};

export default NewDoctor;
