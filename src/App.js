import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import AppHeader from "./components/AppHeader";
import AuthRoute from "./components/AuthRoute";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import ErrorPage from "./routes/404";
import Admin from "./routes/Admin/Admin";
import ConfirmationPage from "./routes/ConfirmationPage";
import NewDoctor from "./routes/NewDoctor";
import NewOffice from "./routes/NewOffice";
import MyAccount from "./routes/MyAccount/MyAccount";

import "./App.css";
import theme from "./theme";
import Checkout from "./routes/Checkout";
import AdminAppointmentForUser from "./routes/AdminAppointmentForUser/AdminAppointmentForUser";
import EditAppointment from "./routes/EditAppointment";
import HistoryWithUser from "./routes/HistoryWithUser";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./routes/ResetPassword/ResetPassword";

function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/appointment/checkout"
        element={
          <AuthRoute>
            <Checkout from="user" />
          </AuthRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthRoute>
            <Admin />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/new-doctor"
        element={
          <AuthRoute>
            <NewDoctor />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/new-office"
        element={
          <AuthRoute>
            <NewOffice />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/appointment-for-user"
        element={
          <AuthRoute>
            <AdminAppointmentForUser />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/appointment-for-user/create"
        element={
          <AuthRoute>
            <Checkout from="admin" />
          </AuthRoute>
        }
      />
      <Route
        path="/my-account"
        element={
          <AuthRoute>
            <MyAccount />
          </AuthRoute>
        }
      />
      <Route
        path="/my-account/:id/edit"
        element={
          <AuthRoute>
            <EditAppointment />
          </AuthRoute>
        }
      />
      <Route
        path="/history-with-user/:id/"
        element={
          <AuthRoute>
            <HistoryWithUser />
          </AuthRoute>
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
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/sign/:confirmationCode"
                  element={<ConfirmationPage />}
                />
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
