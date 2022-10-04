import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useContext, useState } from 'react';
import MyInfo from './MyInfo';
import MyAppointments from './MyAppointments';
import MyMessages from './MyMessages';
import { UserContext } from '../../contexts/UserContext';
import { useEffect } from 'react';
import { getUnreadMessagesCount } from '../../services/notifications';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { currentUser } = useContext(UserContext); 

  const [selectedMenu, setSelectedMenu] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(0);

  const goToMyMessages = () => {
    setSelectedMenu('my-messages');
  }

  useEffect(() => {
    const getUnreadMessagesCountFromApi = async () => {
      const response = await getUnreadMessagesCount();
      setUnreadMessages(response.count);
    }
    getUnreadMessagesCountFromApi();
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={'My info'} disablePadding>
          <ListItemButton onClick={() => setSelectedMenu('my-info')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'My info'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'My appointments'} disablePadding>
          <ListItemButton onClick={() => setSelectedMenu('my-appointments')}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary={'My appointments'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Messages'} disablePadding>
        <ListItemButton onClick={goToMyMessages}>
            <ListItemIcon>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      {
        selectedMenu === 'my-info' ? <MyInfo /> : 
        selectedMenu === 'my-appointments' ? <MyAppointments nav={goToMyMessages} /> : 
        selectedMenu === 'my-messages' ? <MyMessages isDoctor={currentUser.isDoctor} /> : <>Bienvenido a mi cuenta</>
      }
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// export default ResponsiveDrawer;


const MyAccount = () => {

  return (
    <ResponsiveDrawer />
  )
}

export default MyAccount;
