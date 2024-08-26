import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

import { Box, Button, Link, TextField, Typography, Card, CardContent } from "@mui/material";

import { resetPassword } from "../../services/users";

import Snackbar from "../../components/Snackbar";

const defaultFormFields = {
  email: "",
};

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [showEmailAlreadySentModal, setShowEmailAlreadySentModal] = useState(false);
  const { open, message } = snackbar;

  const handleClose = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setShowEmailAlreadySentModal(true);
    } catch (e) {
      setShowEmailAlreadySentModal(false);
      const errorMsg = _.get(
        e,
        "response.data.errors[0].message",
        t("errors.generic_error")
      );
      setSnackbar({ open: true, message: errorMsg });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  if (showEmailAlreadySentModal) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}>
        <Card
          sx={{
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              {t('forgot_password.email_sent')}
            </Typography>
            <Link href="/login" variant="body2">
              {t('forgot_password.back_to_login')}
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
      <Typography variant="h3">
        {t('forgot_password.title')}
      </Typography>
      <Typography>
        {t('forgot_password.subtitle')}
      </Typography>
      <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
        <TextField
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
