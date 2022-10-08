import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Button, Box, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';

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
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div>
            <Link variant='h6' sx={{ flexGrow: 1 }} href='/' color="inherit" underline='none'>
              Healy
            </Link>
          </div>
          {
            !currentUser 
              ? (
                <div>
                  <Button color="inherit" onClick={goToSignUp}>Sign Up</Button>
                  <Button color="inherit" onClick={goToLogin}>Login</Button>
                </div >
              ) :  (
                <AccountMenu currentUser={currentUser} /> 
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
