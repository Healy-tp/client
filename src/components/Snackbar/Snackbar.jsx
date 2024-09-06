import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Snackbar as MuiSnackbar, Alert as MuiAlert } from "@mui/material";

const DEFAULT_TIMEOUT = 4000; // 4 seconds

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({ handleClose, message, open, timeout, type, ...props }) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={timeout || DEFAULT_TIMEOUT}
      onClose={handleClose}
      {...props}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  type: PropTypes.oneOf(["error", "warning", "info", "success", ""]),
};

export default Snackbar;
