import {
  Box,
  Button,
  TextField,
  Typography, 
} from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOffice } from '../../services/admin';
import Snackbar from '../../components/Snackbar';

const defaultFormFields = {
  specialties: '', // Change this to a dropdown with options
  officeNumber: '',
}

const NewOffice = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const { specialties, officeNumber } = formFields;
  const { open, message, type } = snackbar;

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOffice({
        specialties,
        officeNumber,
      });
      setSnackbar({ type: 'success', open: true, message: 'Successfully registered' });
      navigate('/admin');
    } catch (error) {
      setSnackbar({ type: 'error', open: true, message: error.response.data.errors[0].message });
    }

  };

  
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <Typography component="h1" variant="h5">
        Create New Office
      </Typography>
      <Box component="form" sx={{mt: 1}} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Specialties"
          value={specialties}
          placeholder="Dermatology, Cardiology, ..."
          onChange={handleChange}
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Office number"
          value={officeNumber}
          placeholder="123"
          onChange={handleChange}
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default NewOffice;
