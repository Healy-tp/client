import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import MyInfo from './MyInfo';
import MyAppointments from './MyAppointments';
import MyMessages from './MyMessages';
import MyAvailabilities from './MyAvailabilities';

import WelcomePage from './WelcomePage';
import { UserContext } from '../../contexts/UserContext';
import { getUnreadMessagesCount, markMessagesAsRead } from '../../services/notifications';

const drawerWidth = 240;
const itemIconStyle = { minWidth: '20px', marginRight: '5px' };

const MENU_OPTIONS = {
  MY_INFO: 'my-info',
  MY_APPOINTMENTS: 'my-appointments',
  MY_AVAILABILITIES: 'my-availabilities',
  MY_MESSAGES: 'my-messages',
  MY_AGENDA: 'my-agenda',
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { currentUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(0);

  const goToMyMessages = () => {
    setSelectedMenu(MENU_OPTIONS.MY_MESSAGES);
  }

  useEffect(() => {
    const getUnreadMessagesCountFromApi = async () => {
      const response = await getUnreadMessagesCount();
      setUnreadMessages(response.count);
    }
    getUnreadMessagesCountFromApi();
  }, []);

  const handleConversationChange = async (convId) => {
    if (unreadMessages === 0) {
      return;
    }
    const response = await markMessagesAsRead(convId);
    setUnreadMessages(unreadMessages - response.count);
  }

  const drawer = (
    <div>
      <Toolbar
        disableGutters
        children={
          <ListItem key={'Back Home'} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon style={itemIconStyle}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
        }
      />
      <Divider />
      <List>
        <ListItem key={'My info'} disablePadding>
          <ListItemButton onClick={() => setSelectedMenu(MENU_OPTIONS.MY_INFO)}>
            <ListItemIcon style={itemIconStyle}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'My info'} />
          </ListItemButton>
        </ListItem>
        {
          currentUser.isDoctor ? (
            <>
              <ListItem key={'My agenda'} disablePadding>
                <ListItemButton onClick={() => setSelectedMenu(MENU_OPTIONS.MY_AGENDA)}>
                  <ListItemIcon style={itemIconStyle}>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary={'My Agenda'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'My Availabilities'} disablePadding>
                <ListItemButton onClick={() => setSelectedMenu(MENU_OPTIONS.MY_AVAILABILITIES)}>
                  <ListItemIcon style={itemIconStyle}>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary={'My Availabilities'} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem key={'My appointments'} disablePadding>
              <ListItemButton onClick={() => setSelectedMenu(MENU_OPTIONS.MY_APPOINTMENTS)}>
                <ListItemIcon style={itemIconStyle}>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary={'My appointments'} />
              </ListItemButton>
            </ListItem>
          )
        }
        <ListItem key={'Messages'} disablePadding>
        <ListItemButton onClick={() => setSelectedMenu(MENU_OPTIONS.MY_MESSAGES)}>
            <ListItemIcon style={itemIconStyle}>
              <Badge color="primary" badgeContent={unreadMessages}>
                <MailIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'Messages'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {selectedMenu === MENU_OPTIONS.MY_INFO && <MyInfo />}
      {selectedMenu === MENU_OPTIONS.MY_APPOINTMENTS && <MyAppointments nav={goToMyMessages} />}
      {selectedMenu === MENU_OPTIONS.MY_AGENDA && <MyAppointments nav={goToMyMessages} isDoctor={true} />}
      {selectedMenu === MENU_OPTIONS.MY_AVAILABILITIES && <MyAvailabilities />}
      {selectedMenu === MENU_OPTIONS.MY_MESSAGES && <MyMessages isDoctor={currentUser.isDoctor} markMsgsReadCallback={handleConversationChange} />}
      {_.isEmpty(selectedMenu) && (
        <WelcomePage 
          icon={'person'} 
          title={"Bienvenido a tu cuenta!"} 
          subtitle={"Administra tus turnos, tu informacion y mensajes desde aqui."}
        />
      )}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

const MyAccount = () => <ResponsiveDrawer />;

export default MyAccount;
