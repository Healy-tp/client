import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button, 
  Link, 
  Grid, 
  TextField,
  Typography, 
} from '@mui/material';

import Snackbar from '../../components/Snackbar';
import { signIn } from '../../services/users';
import { UserContext } from '../../contexts/UserContext';

const defaultFormFields = {
  email: '',
  password: '',
}

const Login = () => {
  const {setCurrentUser} = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: '',
  });
  const { open, message } = snackbar;

  const navigate = useNavigate();

  const handleClose = () => {
    setSnackBar({ open: false, message: '' });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signIn(email, password);
      setCurrentUser(user);
      resetFormFields();
      navigate('/');

    } catch (error) {
      setSnackBar({open: true, message: error.response.data.errors[0].message});
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
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
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" sx={{mt: 1}} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


export default Login;
