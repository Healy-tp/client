import {
  Box,
  Button,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { createOffice } from "../../services/admin";
import { SPECIALTIES } from "../../utils/constants";
import Snackbar from "../../components/Snackbar";

const defaultFormFields = {
  specialties: [],
  officeNumber: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const NewOffice = () => {
  const [t] = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const { specialties, officeNumber } = formFields;
  const { open, message, type } = snackbar;

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOffice({
        specialties,
        officeNumber,
      });
      setSnackbar({
        type: "success",
        open: true,
        message: t("admin.offices.create.success"),
      });
      navigate("/admin");
    } catch (error) {
      setSnackbar({
        type: "error",
        open: true,
        message: t("admin.offices.create.error"),
      });
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
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <Button variant="outlined" color="error" onClick={handleCancel} style={{ alignSelf: 'flex-start' }}>
        {t('actions.go_back')}
      </Button>
      <Typography component="h1" variant="h5">
        {t("admin.offices.new_office.title")}
      </Typography>
      <Box
        component="form"
        sx={{ mt: 1, width: "450px" }}
        onSubmit={handleSubmit}
      >
        <InputLabel id="specialties-label">{t('admin.offices.new_office.specialties')}</InputLabel>
        <Select
          labelId="specialties-label"
          id="multiple-specialties"
          multiple
          fullWidth
          name="specialties"
          value={specialties}
          onChange={handleChange}
          input={<OutlinedInput id="specialties" label="Specialties" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={t(`specialties.${value.toLowerCase()}`)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {SPECIALTIES.map((specialty) => (
            <MenuItem key={specialty} value={specialty}>
              {t(`specialties.${specialty.toLowerCase()}`)}
            </MenuItem>
          ))}
        </Select>

        <TextField
          margin="normal"
          required
          fullWidth
          label={t("admin.offices.new_office.office_number")}
          value={officeNumber}
          placeholder="123"
          onChange={handleChange}
          autoFocus
          name="officeNumber"
        />

        <div style={{ textAlign: "center" }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("admin.offices.new_office.submit")}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default NewOffice;
