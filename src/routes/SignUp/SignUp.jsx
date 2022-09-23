import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Avatar, 
  Button, 
  TextField, 
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Snackbar from '../../components/Snackbar';
import { signUp } from '../../services/users';
import { UserContext } from '../../contexts/UserContext';

const defaultFormFields = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  
  const {setCurrentUser} = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {firstName, lastName, phoneNumber, email, password, confirmPassword} = formFields;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });
  const { open, message, type } = snackbar;
  const navigate = useNavigate();
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbar({ type: 'error', open: true, message: 'Passwords do not match' });
      return;
    }
    try {
      const user = await signUp({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      setSnackbar({ type: 'success', open: true, message: 'Successfully registered' });
      setCurrentUser(user);
      resetFormFields();
      navigate('/');
    } catch (error) {
      setSnackbar({ type: 'error', open: true, message: error.response.data.message });
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                onChange={handleChange}
                label="Phone Number"
                type="tel"
                id="phone-number"
                // autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
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
                required
                fullWidth
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
