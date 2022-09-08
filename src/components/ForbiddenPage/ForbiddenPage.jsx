import {
  Box, 
  Typography, 
} from '@mui/material';
import forbiddenImg from '../../assets/forbidden.jpeg';

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
      <img src={forbiddenImg} alt="Forbidden" width="100%" height="100%" />
      {/* <Typography variant="h2">Page not found</Typography>
      <Typography variant="h5">Sorry, the page you requested wasn&#39;t found.</Typography> */}
    </Box>
  );
}


export default ForbiddenPage;
