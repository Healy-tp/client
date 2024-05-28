import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Typography, Button } from "@mui/material";

import WelcomePage from "../WelcomePage";
import AvailabilityCard from "./components/AvailabilityCard";
import { getAvailabilitiesByDoctorId } from "../../../services/appointments";
import NewAvailability from "./NewAvailability";

const MyAvailabilities = ({ nav }) => {
  const [t] = useTranslation();
  const [newAvailabilityPage, setNewAvailabilityPage] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    const getAvailabilitiesByDoctorIdFromApi = async () => {
      try {
        const response = await getAvailabilitiesByDoctorId();
        setAvailabilities(_.sortBy(response, ["weekday"]));
      } catch (err) {
        console.log("could not get availabilities", err);
      }
    };
    getAvailabilitiesByDoctorIdFromApi();
  }, []);

  const changePage = () => {
    setNewAvailabilityPage(!newAvailabilityPage);
  };

  return (
    <>
      {!newAvailabilityPage ? (
        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} sx={{ marginTop: 2 }}>
          <Typography color="primary" variant="h3">
            {t('my_account.my_availabilities.your_schedules')}
          </Typography>
          {availabilities.length > 0 ? (
            availabilities.map((availability) => (
            <AvailabilityCard
              key={availability.id}
              av={availability}
              nav={nav}
            />)
          )
          ) : (
            <WelcomePage
              icon="appts"
              title={t('my_account.my_availabilities.no_availabilities_title')}
            />
          )}
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={changePage}
            >
              {t('my_account.my_availabilities.new_availability')}
            </Button>
        </Container>
      ) : (
        <NewAvailability 
          goBack={changePage} 
          availabilitiesArray={availabilities}
          setAvailabilitiesArray={setAvailabilities}
        />
      )}
    </>
  );
};

export default MyAvailabilities;
