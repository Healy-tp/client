import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter,
  // Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppHeader from './components/AppHeader';
// import AuthRoute from './components/AuthRoute';

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
        <AppHeader />
        <BrowserRouter>
          <Routes>
            {/* TODO:::
            <UnauthRoute path="/sign-in">
              <Authentication />
            </UnauthRoute>
            <UnauthRoute path="/sign-up">
              <Authentication />
            </UnauthRoute> */}
            <Route path="/" element={<AuthRoutes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
