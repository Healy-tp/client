import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '../../components/Snackbar';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Grid,
} from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { updateUser } from '../../services/users';

const drawerWidth = 240;

const MyInfo = () => {

  const {currentUser, signInUser} = useContext(UserContext);
  const [formFields, setFormFields] = useState({});

  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value || undefined});
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });
  const { open, message, type } = snackbar;

  const resetFormFields = () => {
    setFormFields({});
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.password !== formFields.confirmPassword) {
      setSnackbar({ type: 'error', open: true, message: 'Passwords do not match' });
      return;
    }
    try {
      const payload = {};
      Object.keys(formFields).map(key => {
        if (formFields[key] !== undefined) {
          payload[key] = formFields[key];
        }
      });

      const user = await updateUser(payload);

      setSnackbar({ type: 'success', open: true, message: 'Successfully updated' });
      signInUser(user);
      setDisabled(true);
      resetFormFields();
    } catch (error) {
      setSnackbar({ type: 'error', open: true, message: error.response.data.errors[0].message });
    }

  };

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
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              fullWidth
              disabled={disabled}
              required
              defaultValue={`${currentUser.firstName}`}
              id="firstName"
              label="First Name"
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled={disabled}
              required
              defaultValue={currentUser.lastName}
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={disabled}
              required
              defaultValue={currentUser.email}
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={disabled}
              required
              name="phoneNumber"
              defaultValue={currentUser.phoneNumber}
              onChange={handleChange}
              label="Phone Number"
              type="tel"
              id="phone-number"
              // autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={disabled}
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={disabled}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              id="confirm-password"
              // autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={disabled}
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
        <Fab color="primary" aria-label="edit" onClick={() => setDisabled(!disabled)}>
          {disabled ? <EditIcon /> : <CancelIcon />}
        </Fab>
    </Box>
  )
}

export default MyInfo;
