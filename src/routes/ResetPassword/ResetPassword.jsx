import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

import { Box, Button, TextField, Typography, Card, CardContent, Link } from "@mui/material";

import { updatePassword } from "../../services/users";

import Snackbar from "../../components/Snackbar";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [t] = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showPasswordResetSuccessCard, setShowPasswordResetSuccessCard] = useState(false);
  const { password, confirmPassword } = formFields;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const { open, message } = snackbar;

  const resetPasswordToken = searchParams.get("token") || "";

  const handleClose = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("signup.passwords_do_not_match"),
      });
      return;
    }

    try {
      await updatePassword({ password, resetPasswordToken });
      setShowPasswordResetSuccessCard(true);
    } catch (e) {
      const errorMsg = _.get(
        e,
        "response.data.errors[0].message",
        t("error.generic_error")
      );
      setSnackbar({ open: true, message: errorMsg });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  if (showPasswordResetSuccessCard) {
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
            border: `1px`,
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography>
              {t('reset_password.password_updated')}
            </Typography>
            <Link href="/login">
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
        {t('reset_password.title')}
      </Typography>
      <Typography>
        {t('reset_password.subtitle')}
      </Typography>
      <Box component="form" sx={{ display:'flex', flexDirection: 'column', mt: 2, gap: 2, width: '400px' }} onSubmit={handleSubmit}>
        <TextField
          required
          id="password"
          label={t('reset_password.new_password')}
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="password"
          type="password"
          autoFocus
        />
        <TextField
          required
          id="confirmPassword"
          label={t('reset_password.confirm_password')}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          autoComplete="confirmPassword"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
        >
          {t('reset_password.submit')}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
