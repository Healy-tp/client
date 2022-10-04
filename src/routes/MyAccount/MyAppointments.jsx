
import {  
  Box, Button, Snackbar, Card, CardContent, CardActions, Typography, Container, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from '@mui/material';
import { useEffect, useState } from 'react';
import DialogAlert from '../../components/Dialog';
import { getAppointmentByUserId, startChat } from '../../services/appointments';



const MyAppointments = ({ nav }) => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointmentsByUserIdFromApi = async () => {
      const response = await getAppointmentByUserId();
      // console.log('response', response.data);
      setAppointments(response.data);
    }
    getAppointmentsByUserIdFromApi();
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [apptId, setApptId] = useState(-1);

  const handleClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setApptId(-1);
    setDialogOpen(false);
  };

  const handleAccept = async () => {
    await startChat(apptId);
    nav();
  }

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
              <Button size="small" onClick={() => handleClickOpen(a.id)}>Message</Button>
            </CardActions>
            
            <DialogAlert open={dialogOpen} handleAccept={handleAccept} handleClose={handleClose}/>
          </Card>
        ))
      }
    </Container>
    
  );
}

export default MyAppointments;
