import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { AppBar, Button, Box, Toolbar } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import AccountMenu from "../AccountMenu";
import { Avatar } from "@mui/material";

import LogoImage from "../../assets/logo.png";

const AppHeader = () => {
  const [t] = useTranslation();
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const goToSignUp = () => navigate("/sign-up");
  const goToLogin = () => navigate("/login");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="/">
              <Avatar
                alt="Logo"
                variant="square"
                src={LogoImage}
                style={{ width: 80, height: 80 }}
                href="/"
              />
            </a>
          </div>
          {!currentUser ? (
            <div>
              <Button color="inherit" onClick={goToSignUp}>
                {t('header.signup')}
              </Button>
              <Button color="inherit" onClick={goToLogin}>
                {t('header.signin')}
              </Button>
            </div>
          ) : (
            <AccountMenu currentUser={currentUser} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
