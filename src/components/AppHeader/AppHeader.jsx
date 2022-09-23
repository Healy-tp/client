import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';
import AccountMenu from '../AccountMenu';


const AppHeader = () => {

  const {currentUser} = useContext(UserContext);

  const navigate = useNavigate();

  const goToSignUp = () => navigate('/sign-up');
  const goToLogin = () => navigate('/login');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
            Healy
          </Typography>
          
          {
            !currentUser ? (
              <>
                <Button color="inherit" onClick={goToSignUp}>Sign Up</Button>
                <Button color="inherit" onClick={goToLogin}>Login</Button>
              </>
            ) : 
            <AccountMenu currentUser={currentUser} /> 
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
