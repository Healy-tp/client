import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter,
  // Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { UserProvider } from './contexts/UserContext';
import AppHeader from './components/AppHeader';
import AuthRoute from './components/AuthRoute';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import ErrorPage from './routes/404';

import './App.css';
import theme from './theme';

function AuthRoutes() {
  return (
    <Routes>
      <Route 
        path="/settings" 
        element={
          <AuthRoute children={<></>} />
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <AppHeader />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<AuthRoutes />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
