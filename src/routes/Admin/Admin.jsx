import { useState, useContext } from "react";
import ForbiddenPage from "../../components/ForbiddenPage";
import { UserContext } from "../../contexts/UserContext";
import { Box, Tab, Tabs } from "@mui/material";
import DoctorsAdmin from "../../components/DoctorsAdmin/DoctorsAdmin";
import AppointmentsAdmin from "../../components/AppointmentsAdmin";
import AvailabilitiesAdmin from "../../components/AvailabilitiesAdmin/AvailabilitiesAdmin";
import OfficesAdmin from "../../components/OfficesAdmin/OfficesAdmin";


const Admin = () => {

  const {currentUser} = useContext(UserContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {
        !currentUser.isAdmin ? <ForbiddenPage /> : (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Doctors" />
              <Tab label="Users" />
              <Tab label="Offices" />
              <Tab label="Appointments" />
              <Tab label="Availabilities" />
            </Tabs>

            {
              value === 0 ? <DoctorsAdmin /> : 
              value === 1 ? <></> :
              value === 2 ? <OfficesAdmin /> :
              value === 3 ? <AppointmentsAdmin /> : 
                <AvailabilitiesAdmin />
            }

          </Box>
        )
      
      }
    </>
  );
}

export default Admin;
