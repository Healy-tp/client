import _ from 'lodash';
import { useContext, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Fab, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Snackbar from '../../../components/Snackbar';
import { UserContext } from '../../../contexts/UserContext';
import { updateUser } from '../../../services/users';
import { validateEmail, validatePhone } from '../../../utils/validators';

const drawerWidth = 240;
const fieldsWidth = 500;

const MyInfo = () => {
  const { currentUser, signInUser } = useContext(UserContext);
  const defaultFormFields = _.pick(currentUser, ['id', 'firstName', 'lastName', 'phoneNumber', 'email']);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await updateUser(formFields);
      signInUser(user);
      setSnackbar({ type: 'success', open: true, message: 'Successfully updated' });
    } catch (error) {
      setSnackbar({ type: 'error', open: true, message: error?.response?.data?.errors[0]?.message || error.message });
    } finally {
      setEditMode(false);
      setIsLoading(false);
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
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TextField
            name="firstName"
            disabled={!editMode}
            required
            defaultValue={`${currentUser.firstName}`}
            label="First Name"
            onChange={handleChange}
            autoFocus
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={!editMode}
            required
            defaultValue={currentUser.lastName}
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validateEmail(formFields.email)}
            disabled={!editMode}
            required
            defaultValue={currentUser.email}
            label="Email Address"
            name="email"
            onChange={handleChange}
            autoComplete="email"
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validatePhone(formFields.phoneNumber)}
            disabled={!editMode}
            required
            name="phoneNumber"
            defaultValue={currentUser.phoneNumber}
            onChange={handleChange}
            label="Phone Number"
            type="tel"
            style={{ width: `${fieldsWidth}px` }}
          />
        </Grid>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '24px' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={isLoading || !editMode || _.isEqual(formFields, defaultFormFields) || !validateEmail(formFields.email) || !validatePhone(formFields.phoneNumber)}
            sx={{ mt: 3, mb: 2 }}
            style={{ width: `${fieldsWidth}px`, borderRadius: '5px' }}
            loading={isLoading}
          >
            Update
          </LoadingButton>
          <Fab color="primary" aria-label="edit" onClick={() => setEditMode(!editMode)}>
            {editMode ? <CancelIcon /> : <EditIcon />}
          </Fab>
        </div>
      </Grid>
    </Box>
  )
}

export default MyInfo;
