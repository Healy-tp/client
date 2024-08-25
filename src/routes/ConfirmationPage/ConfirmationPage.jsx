import {
  Box,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Snackbar from "../../components/Snackbar";

import { checkUser, verifyUser } from "../../services/users";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ConfirmationPage = () => {
  const [t] = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { confirmationCode } = useParams();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { open, message, type } = snackbar;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  useState(() => {
    const checkUserApi = async () => {
      try {
        setIsValidatingCode(true);
        await checkUser(confirmationCode);
        setValidCode(true);
        setIsValidatingCode(false);
      } catch (err) {
        console.log(err.response.status);
        if (err.response.status === 404) {
          setIsValidatingCode(false);
          setValidCode(false);
        }
      }
    };
    checkUserApi();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("signup.passwords_do_not_match"),
      });
      return;
    }

    try {
      await verifyUser(confirmationCode, formFields);
      resetFormFields();
      setConfirmed(true);
    } catch (error) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("signup.verification_failed"),
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  if (isValidatingCode) {
    return (
      <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 2 }}>
        <Typography variant="h4" align="center">
          {t('confirm_account.validating_code')}
        </Typography>
        <CircularProgress
          size={50}
        />
      </Container>
    );
  }

  if (!validCode) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
        <Typography variant="h4" align="center">
          {t('confirm_account.invalid_code')}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      {validCode && !confirmed ? (
        <Box component="form" sx={{ mt: 1, maxWidth: "300px", width: "100%", display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }} onSubmit={handleSubmit}>
          <Typography color="inherit" align="center" variant="h4" marked="center">
            {t('confirm_account.title')}
          </Typography>
          <TextField
            required
            fullWidth
            id="email"
            label={t('confirm_account.email_label')}
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            fullWidth
            name="password"
            label={t('confirm_account.password_label')}
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="new-password"
          />
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label={t('confirm_account.confirm_password_label')}
            type="password"
            onChange={handleChange}
            id="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            {t('actions.submit')}
          </Button>
        </Box>
      ) : validCode && confirmed && (
        <Card
          sx={{ alignItems: "center", marginTop: 8, flexDirection: "column" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Congrats! Account confirmed.
              {t('confirm_account.account_confirmed')}
            </Typography>
          </CardContent>

          <CardActions>
            <Button onClick={() => navigate("/")}>{t('confirm_account.go_back')}</Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default ConfirmationPage;
