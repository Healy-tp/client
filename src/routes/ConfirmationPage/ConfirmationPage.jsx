import { Box, TextField, Button } from '@mui/material';
import { useState } from "react";
import { useParams } from 'react-router-dom';

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

  const { confirmationCode } = useParams();

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

    try {
      const user = await verifyUser(confirmationCode, formFields);
      // console.log(user);
      // setCurrentUser(user);
      // resetFormFields();
      // navigate(from.pathname);s

    } catch (error) {
      // setSnackBar({open: true, message: error.response.data.errors[0].message});
    }
  }


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  };

  return (
    <>
    {
      validCode ? (
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
            // autoComplete="new-password"
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
      ) : <></>
    }
    </>
  );
}

export default ConfirmationPage;
