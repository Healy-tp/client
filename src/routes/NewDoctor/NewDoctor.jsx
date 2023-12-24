import { Box, Button, TextField, Typography } from "@mui/material";

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

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      /> */}
      <Typography component="h1" variant="h5">
        Create New Doctor
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
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
          label="Last Name"
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
          label="Email Address"
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
          label="Phone Number"
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
          label="Specialty"
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
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default NewDoctor;
