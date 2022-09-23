import { Box } from '@mui/material';
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
    </Box>
  );
}


export default ForbiddenPage;
