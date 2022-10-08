import { Box, TextField, Button, Container, Card, CardContent, CardActions, Typography } from '@mui/material';
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Snackbar from '../../components/Snackbar';

import { checkUser, verifyUser } from '../../services/users';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: ''
}

const ConfirmationPage = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password, confirmPassword} = formFields;
  
  const [validCode, setValidCode] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { confirmationCode } = useParams();

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

  useState(() => {
    const checkUserApi = async () => {
      try {
        const response = await checkUser(confirmationCode);
        // console.log(response.status);
        setValidCode(true);
      } catch (err) {
        // console.log(err.response.status);
      }
    }
    checkUserApi();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setSnackbar({ type: 'error', open: true, message: 'Passwords do not match' });
      return;
    }

    try {
      const response = await verifyUser(confirmationCode, formFields);
      resetFormFields();
      setConfirmed(true);
    } catch (error) {
      setSnackbar({ type: 'error', open: true, message: error.response.data.errors[0].message});
    }
  }


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  };

  return (
    <Container>
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
    {
      validCode && !confirmed ? (
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="new-password"
          />
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            id="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      ) : 
      validCode && confirmed ? (
        <Card sx={{ alignItems: 'center', marginTop: 8, flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Congrats! Account confirmed.
            </Typography>
          </CardContent>

          <CardActions>
            <Button onClick={() => navigate('/')}>Go back to home</Button>
          </CardActions>
        </Card>
      ) : <></>
    }
    </Container>
  );
}

export default ConfirmationPage;
