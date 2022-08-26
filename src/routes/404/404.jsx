import {
  Box, 
  Typography, 
} from '@mui/material';
import errorImg from '../../assets/404.png';

const ErrorPage = () => {
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
      <img src={errorImg} alt="Not found" width="200" height="200" />
      <Typography variant="h2">Page not found</Typography>
      <Typography variant="h5">Sorry, the page you requested wasn&#39;t found.</Typography>
    </Box>
  );
}


export default ErrorPage;
