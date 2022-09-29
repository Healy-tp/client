import {
  Box, 
  Typography, 
} from '@mui/material';
import forbiddenImg from '../../assets/forbidden.png';

const ForbiddenPage = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={forbiddenImg} alt="Not found" width="200" height="200" style={{ marginBottom: '18px' }}/>
      <Typography variant="h2">Access denied...</Typography>
      <Typography variant="h5">You do not have permission to view this resource.</Typography>
    </Box>
  );
}


export default ForbiddenPage;
