import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#113a5e',
    },
    secondary: {
      main: '#f5f3e4',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;