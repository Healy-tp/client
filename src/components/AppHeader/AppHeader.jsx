import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material';
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
        <Toolbar>
          <Link variant='h6' sx={{ flexGrow: 1 }} href='/' color="inherit" underline='none'>
            Healy
            {/* <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
              Healy
            </Typography> */}
          </Link>
          
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
