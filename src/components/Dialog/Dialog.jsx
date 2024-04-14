import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import React from "react";

const DialogAlert = ({ open, handleClose, handleAccept, title, msg }) => {
  const [t] = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('actions.cancel')}</Button>
        <Button onClick={handleAccept} autoFocus>{t('actions.accept')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
