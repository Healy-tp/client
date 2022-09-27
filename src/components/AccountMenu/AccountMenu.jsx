import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';

import {
  Menu,
  MenuItem, 
  IconButton,
} from '@mui/material';

import { signOut } from '../../services/users';
import { UserContext } from '../../contexts/UserContext';

const AccountMenu = ({ currentUser }) => {
  const {setCurrentUser} = useContext(UserContext);
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
    setCurrentUser(null);
  }

  return (
    <div>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
        {`${currentUser.firstName} ${currentUser.lastName}`}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/my-account')}>My Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default AccountMenu;
