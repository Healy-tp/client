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
import NewOffice from './routes/NewOffice';
import MyAccount from './routes/MyAccount/MyAccount';

import './App.css';
import theme from './theme';
import Checkout from './routes/Checkout';
import AdminAppointmentForUser from './routes/AdminAppointmentForUser/AdminAppointmentForUser';

function AuthRoutes() {
  return (
    <Routes>
      <Route 
        path="/appointment/checkout" 
        element={
          <AuthRoute children={<Checkout from='user'/>} />
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
      <Route 
        path="/admin/new-office" 
        element={
          <AuthRoute children={<NewOffice />} />
        }
      />
      <Route 
        path="/admin/appointment-for-user" 
        element={
          <AuthRoute children={<AdminAppointmentForUser />} />
        }
      />
      <Route 
        path="/admin/appointment-for-user/create" 
        element={
          <AuthRoute children={<Checkout from='admin'/>} />
        }
      />
      <Route 
        path="/my-account" 
        element={
          <AuthRoute children={<MyAccount />} />
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
