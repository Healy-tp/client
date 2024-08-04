import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import AccountCircle from "@mui/icons-material/AccountCircle";

import { Menu, MenuItem, IconButton } from "@mui/material";

import { signOut } from "../../services/users";
import { UserContext } from "../../contexts/UserContext";

const AccountMenu = ({ currentUser }) => {
  const [t] = useTranslation();
  const { signOutUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    signOutUser(null);
  };

  return (
    <div style={{ maxWidth: "250px", display: "flex", textOverflow: "ellipsis", flexGrow: 0, whiteSpace: "nowrap", overflow: "hidden" }}>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
        <span style={{ marginLeft: "4px" }}>
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </span>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!currentUser.isAdmin && (
          <MenuItem onClick={() => navigate("/my-account")}>{t('account_menu.my_account')}</MenuItem>
        )}
        {currentUser.isAdmin && (
          <MenuItem onClick={() => navigate("/admin")}>{t('account_menu.admin')}</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>{t('account_menu.logout')}</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
