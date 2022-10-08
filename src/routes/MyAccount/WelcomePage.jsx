import {
  Box, 
  Typography, 
  Container
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/Inbox';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const WelcomePage = ({icon, msg1, msg2}) => {
  return (
    <Container>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          icon === 'person' ? <PersonIcon color="primary" sx={{fontSize: 200, marginTop: '100px', marginBottom: '18px'}} /> :
          icon === 'inbox' ? <InboxIcon color="primary" sx={{fontSize: 200, marginTop: '100px', marginBottom: '18px'}} /> :
          icon === 'appts' ? <AccessTimeFilledIcon color="primary" sx={{fontSize: 200, marginTop: '100px', marginBottom: '18px'}} /> : <></>
        }
        
        <Typography variant="h2">{msg1}</Typography>
        <Typography variant="h5">{msg2}</Typography>
      </Box>
    </Container>
  );
}


export default WelcomePage;
