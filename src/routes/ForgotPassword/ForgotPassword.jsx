import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import _ from "lodash";

import { Box, Button, Link, TextField, Typography } from "@mui/material";

import Snackbar from "../../components/Snackbar";

const defaultFormFields = {
  email: "",
};

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
  });
  const { open, message } = snackbar;

  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: "/" } };

  // const navigate = useNavigate();

  const handleClose = () => {
    setSnackBar({ open: false, message: "" });
  };

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Implement forgot password functionality
    // try {
    //   const user = await signIn(email, password);
    //   signInUser(user);
    //   resetFormFields();
    //   navigate(from.pathname);
    // } catch (e) {
    //   const errorMsg = _.get(
    //     e,
    //     "response.data.errors[0].message",
    //     "Something went wrong",
    //   );
    //   setSnackBar({ open: true, message: errorMsg });
    // }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
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
      <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
      <Typography variant="h2">
        {t('forgot_password.title')}
      </Typography>
      <Typography>
        {t('forgot_password.subtitle')}
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('login.email')}
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
        >
          {t('forgot_password.send')}
        </Button>
      </Box>
      <Link href="/login" variant="body2">
        {t('forgot_password.back_to_login')}
      </Link>
    </Box>
  );
};

export default ForgotPassword;
