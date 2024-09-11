import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Typography, Button, CircularProgress } from "@mui/material";

import WelcomePage from "../WelcomePage";
import AvailabilityCard from "./components/AvailabilityCard";
import { getAvailabilitiesByDoctorId } from "../../../services/appointments";
import NewAvailability from "./NewAvailability";

const MyAvailabilities = ({ nav }) => {
  const [t] = useTranslation();
  const [newAvailabilityPage, setNewAvailabilityPage] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAvailabilitiesByDoctorIdFromApi = async () => {
      try {
        setIsLoading(true);
        const response = await getAvailabilitiesByDoctorId();
        setAvailabilities(_.sortBy(response, ["weekday"]));
      } catch (err) {
        console.log("could not get availabilities", err);
      } finally {
        setIsLoading(false);
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
        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} sx={{ marginTop: 6, marginBottom: 6 }}>
          {isLoading ? (
            <CircularProgress
              size={60}
              sx={{ position: "absolute", top: "40%", left: "50%" }}
            /> 
          ) : (
            <>
              <Typography color="primary" variant="h3" style={{ marginBottom: 6, marginTop: 6 }}>
                {t('my_account.my_availabilities.your_schedules')}
              </Typography>
              {availabilities.length > 0 ? (
                availabilities.map((availability) => (
                <AvailabilityCard
                  key={availability.id}
                  availability={availability}
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
                  sx={{ marginTop: 4 }}
                  onClick={changePage}
                >
                  {t('my_account.my_availabilities.new_availability')}
                </Button>
            </>
          )}
          
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
