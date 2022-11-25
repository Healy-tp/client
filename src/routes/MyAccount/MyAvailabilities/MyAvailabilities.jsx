import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

import WelcomePage from '../WelcomePage';
import AvailabilityCard from './components/AvailabilityCard';
import { getAvailabilitiesByDoctorId } from '../../../services/appointments';
import NewAvailability from './NewAvailability';


const MyAvailabilities = ({ nav }) => {

  const [newAvailabilityPage, setNewAvailabilityPage] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    const getAvailabilitiesByDoctorIdFromApi = async () => {
      try {
        const response = await getAvailabilitiesByDoctorId();
        setAvailabilities(_.sortBy(response, ['weekday']));
      } catch (err) {
        console.log('could not get availabilities', err);
      }
    }
    getAvailabilitiesByDoctorIdFromApi();
  }, []);
  
  const changePage = () => {
    setNewAvailabilityPage(!newAvailabilityPage);
  }
  
  return (
    <>
      {
        !newAvailabilityPage ? (
          <Container sx={{marginTop: 2}}>
            <Typography color="primary" variant="h3">Tus Horarios de Atencion</Typography>
            {
              availabilities.length > 0 ? availabilities.map(a => (
                <AvailabilityCard 
                  av={a}
                  nav={nav}
                />
              )) : (
                <WelcomePage
                  icon='appts'
                  title={"Todavia no horarios de atencion"}
                  subtitle={"Podes crear uno nuevo desde el boton"}
                />
              )
            }
            <Button 
              variant="contained" 
              sx={{marginTop: 2, marginBottom: 5}}
              onClick={changePage}
            >
              New Availability
            </Button>
          </Container>
        ) : <NewAvailability goBack={changePage}/>
      }
    </>
    
  );
}

export default MyAvailabilities;
