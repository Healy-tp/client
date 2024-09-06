import React, { useState, useContext } from "react";
import _ from "lodash";
import { useTranslation } from 'react-i18next';

import ForbiddenPage from "../../components/ForbiddenPage";
import { UserContext } from "../../contexts/UserContext";
import { Box, Tab, Tabs } from "@mui/material";
import DoctorsAdmin from "../../components/DoctorsAdmin/DoctorsAdmin";
import AppointmentsAdmin from "../../components/AppointmentsAdmin";
import AvailabilitiesAdmin from "../../components/AvailabilitiesAdmin/AvailabilitiesAdmin";
import OfficesAdmin from "../../components/OfficesAdmin/OfficesAdmin";
import UsersAdmin from "../../components/UsersAdmin";

const TABS = [
  {
    component: <DoctorsAdmin />,
    label: "Doctors",
    value: 0,
  },
  {
    component: <UsersAdmin />,
    label: "Users",
    value: 1,
  },
  {
    component: <OfficesAdmin />,
    label: "Offices",
    value: 2,
  },
  {
    component: <AppointmentsAdmin />,
    label: "Appointments",
    value: 3,
  },
  {
    component: <AvailabilitiesAdmin />,
    label: "Availabilities",
    value: 4,
  },
];

const Admin = () => {
  const [t] = useTranslation();
  const { currentUser } = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!currentUser.isAdmin ? (
        <ForbiddenPage />
      ) : (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            {_.map(TABS, (tab, i) => (
              <Tab key={i} label={t(`admin.labels.${tab.label.toLowerCase()}`)} />
            ))}
          </Tabs>
          {TABS[value].component}
        </Box>
      )}
    </>
  );
};

export default Admin;
