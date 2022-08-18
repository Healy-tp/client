import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter,
  // Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppHeader from './components/AppHeader';
import Login from './routes/Login';
// import AuthRoute from './components/AuthRoute';
import { UserProvider } from './contexts/UserContext';
import SignUpForm from './components/SignUpForm/SignUpForm';

import theme from './theme';

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" exact>
        {/* <Root /> */}
      </Route>
      {/* <AuthRoute path="/settings">
      </AuthRoute> */}
      {/* <Route path="/error/:errorCode">
        <ErrorPage />
      </Route> 
      <Route path="*">
        <Navigate to={url.buildUrl(null, "/error/404")} />
      </Route> */}
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
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/" element={<AuthRoutes />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
