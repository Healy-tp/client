import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter,
  // Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { UserProvider } from './contexts/UserContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import AppHeader from './components/AppHeader';
import AuthRoute from './components/AuthRoute';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import ErrorPage from './routes/404';
import Admin from './routes/Admin/Admin';
import ConfirmationPage from './routes/ConfirmationPage';
import NewDoctor from './routes/NewDoctor';

import './App.css';
import theme from './theme';
import Checkout from './routes/Checkout';

function AuthRoutes() {
  return (
    <Routes>
      <Route 
        path="/settings" 
        element={
          <AuthRoute children={<></>} />
        }
      />
      <Route 
        path="/appointment/checkout" 
        element={
          <AuthRoute children={<Checkout />} />
        }
      />

      <Route 
        path="/admin" 
        element={
          <AuthRoute children={<Admin />} />
        }
      />
      <Route 
        path="/admin/new-doctor" 
        element={
          <AuthRoute children={<NewDoctor />} />
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
            <AppointmentProvider>
              <AppHeader />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign/:confirmationCode" element={<ConfirmationPage />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<AuthRoutes />} />
              </Routes>
            </AppointmentProvider>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
