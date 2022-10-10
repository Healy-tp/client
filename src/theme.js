import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#113a5e',
      light: '#9fd5fd',
    },
    secondary: {
      main: '#f5f3e4',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: red.A400,
      light: '#e57373',
    },
    info: {
      main: '#2196f3',
    }
  },
});

export default theme;