
import {  
  Box, Button, Snackbar, Card, CardContent, CardActions, Typography, Container
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAppointmentByUserId } from '../../services/appointments';


const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointmentsByUserIdFromApi = async () => {
      const response = await getAppointmentByUserId();
      console.log('response', response.data);
      setAppointments(response.data);
    }
    getAppointmentsByUserIdFromApi();
  }, []);

  return (
    <Container>

      {
        appointments.map(a => (
          <Card sx={{ alignItems: 'center', marginTop: 2, flexDirection: 'column' }}>
            <CardContent>
              

              <Typography variant="h6">
                {`${a.Doctor.firstName} ${a.Doctor.lastName} - ${a.Doctor.specialty}`}
              </Typography>
              <br />
              <Typography variant="body">
                {`Office: ${a.officeId}`}
              </Typography>
              <br />
              <Typography variant="body">
                {`Date: ${a.arrivalTime.slice(0,10)}`}
              </Typography>
              <br />
              <Typography variant="body">
                {`Time: ${a.arrivalTime.slice(11, 16)}`}
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small">Cancel</Button>
              <Button size="small">Modify</Button>
              <Button size="small">Message</Button>
            </CardActions>
          </Card>
        ))
      }
    </Container>
    
  );
}

export default MyAppointments;
