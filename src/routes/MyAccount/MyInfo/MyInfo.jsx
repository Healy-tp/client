import _ from "lodash";
import React, { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';

import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Fab, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Snackbar from "../../../components/Snackbar";
import { UserContext } from "../../../contexts/UserContext";
import { updateUser } from "../../../services/users";
import { validateEmail, validatePhone } from "../../../utils/validators";

const INPUT_MAX_LENGTH = 60;

const drawerWidth = 240;
const fieldsWidth = 600;

const MyInfo = () => {
  const [t] = useTranslation();
  const { currentUser, signInUser } = useContext(UserContext);
  const defaultFormFields = _.pick(currentUser, [
    "id",
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
  ]);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value || undefined });
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { open, message, type } = snackbar;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await updateUser({...formFields, version: currentUser.version});
      signInUser(user);
      setSnackbar({
        type: "success",
        open: true,
        message: t('my_account.my_info.update_success'),
      });
    } catch (error) {
      const errorMsg = _.get(
        error,
        "response.data.errors[0].message",
        "Something went wrong",
      );
      console.log(errorMsg)
      let snackMsg;
      if (errorMsg.includes("Version mismatch")) {
        snackMsg = t('my_account.my_info.version_mismatch_error')
      } else {
        snackMsg =  t('my_account.my_info.update_error')
      }
      setSnackbar({
        type: "error",
        open: true,
        message: snackMsg,
      });
    } finally {
      setEditMode(false);
      setIsLoading(false);
    }
  };

  const { firstName, lastName, email, phoneNumber } = formFields;

  return (
    <Box
      component="form"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      onSubmit={handleSubmit}
    >
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />

      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item marginBottom={2}>
          <Typography variant="h3">
            {t('my_account.my_info.edit_title')} 
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            name="firstName"
            disabled={!editMode}
            required
            defaultValue={`${currentUser.firstName}`}
            label={t('my_account.my_info.first_name')}
            onChange={handleChange}
            autoFocus
            style={{ width: `${fieldsWidth}px` }}
            error={firstName && firstName.length > INPUT_MAX_LENGTH}
            helperText={firstName && firstName.length > INPUT_MAX_LENGTH ? t('my_account.my_info.max_length_error') : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={!editMode}
            required
            defaultValue={currentUser?.lastName || ""}
            label={t('my_account.my_info.last_name')}
            name="lastName"
            onChange={handleChange}
            style={{ width: `${fieldsWidth}px` }}
            error={lastName && lastName.length > INPUT_MAX_LENGTH}
            helperText={lastName && lastName.length > INPUT_MAX_LENGTH ? t('my_account.my_info.max_length_error') : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validateEmail(email)}
            disabled={!editMode}
            required
            defaultValue={currentUser.email}
            label={t('my_account.my_info.email')}
            name="email"
            onChange={handleChange}
            autoComplete="email"
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validatePhone(phoneNumber)}
            disabled={!editMode}
            required
            name="phoneNumber"
            defaultValue={currentUser?.phoneNumber || ""}
            onChange={handleChange}
            label={t('my_account.my_info.phone')}
            type="tel"
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled
            defaultValue={currentUser?.isDoctor 
              ? _.capitalize(t('user_types.doctor')) 
              : _.capitalize(t('user_types.patient'))
            }
            label={t('my_account.my_info.user_type')}
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "24px"
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={
              isLoading ||
              !editMode ||
              _.isEqual(formFields, defaultFormFields) ||
              !validateEmail(email) ||
              !validatePhone(phoneNumber)
            }
            sx={{ mt: 3, mb: 2 }}
            style={{ width: `${fieldsWidth}px`, borderRadius: "5px" }}
            loading={isLoading}
          >
            {t('my_account.my_info.update_button')}
          </LoadingButton>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? <CancelIcon /> : <EditIcon />}
          </Fab>
        </div>
      </Grid>
    </Box>
  );
};

export default MyInfo;
