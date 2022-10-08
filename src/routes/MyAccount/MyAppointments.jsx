
import {  
  Button, Card, CardContent, CardActions, Typography, Container, TextField, Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DialogAlert from '../../components/Dialog';
import { deleteAppointment, getAppointmentByUserId, startChat } from '../../services/appointments';
import { dateToString } from '../../utils/dateTimeFormatter';
import {
  START_CHAT_DIALOG_MSG, 
  START_CHAT_DIALOG_TITLE, 
  CANCEL_APPT_DIALOG_MSG, 
  CANCEL_APPT_DIALOG_TITLE
} from './dialogs';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import WelcomePage from './WelcomePage';


const MyAppointments = ({ nav, isDoctor }) => {

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    const getAppointmentsByUserIdFromApi = async () => {
      const response = await getAppointmentByUserId(isDoctor ? { isDoctor: true } : {});
      setAppointments(response);
    }
    getAppointmentsByUserIdFromApi();
  }, []);
  
  const navigate = useNavigate();

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [apptId, setApptId] = useState(-1);

  const handleMessageClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setMessageDialogOpen(true);
  };

  const handleCancelClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setCancelDialogOpen(true);
  };

  const handleClose = () => {
    setApptId(-1);
    setMessageDialogOpen(false);
    setCancelDialogOpen(false);
  };

  const handleMessageAccept = async () => {
    await startChat(apptId);
    nav();
  }

  const handleCancelAccept = async () => {
    await deleteAppointment(apptId);
    setCancelDialogOpen(false);
    setApptId(-1);
  }

  return (
    <Container sx={{marginTop: 2}}>
      {
        isDoctor ? (
          <Grid container spacing={2} maxWidth={'xs'} justifyContent="center" alignItems='center'>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{marginTop: 2}}
                  shouldDisableDate={(date) => {
                    const filteredDays = appointments.map(a => new Date(a.arrivalTime).getDay());
                    return !filteredDays.includes(date.getDay());
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Button variant='filled'>Manage Agenda for the day</Button>
            </Grid>
          </Grid>
        ) : <></>
      }
      {
        appointments.length > 0 ? appointments.filter(a => isDoctor ? a.arrivalTime.slice(0,10) === dateToString(selectedDate) : true).map(a => (
          <Card key={a.id} sx={{ alignItems: 'center', marginTop: 2, flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h6">
                {
                  !isDoctor ? `${a.Doctor.firstName} ${a.Doctor.lastName} - ${a.Doctor.specialty}` :
                  `${a.User.firstName} ${a.User.lastName}`
                }
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
              <Button size="small" variant="contained" onClick={() => handleMessageClickOpen(a.id)}>Message</Button>
              <Button size="small" variant="contained" onClick={() => navigate(`/my-account/${a.id}/edit`, { state: { appt: a }})}>Modify</Button>
              <Button size="small" color="error" onClick={() => handleCancelClickOpen(a.id)}>Cancel</Button>
            </CardActions>
            
            <DialogAlert 
              open={messageDialogOpen} 
              handleAccept={handleMessageAccept} 
              handleClose={handleClose}
              title={START_CHAT_DIALOG_TITLE}
              msg={START_CHAT_DIALOG_MSG}
            />

            <DialogAlert 
              open={cancelDialogOpen} 
              handleAccept={handleCancelAccept} 
              handleClose={handleClose}
              title={CANCEL_APPT_DIALOG_TITLE}
              msg={CANCEL_APPT_DIALOG_MSG}
            />
          </Card>
        )) : (
          <WelcomePage
            icon='appts'
            msg1={"Todavia no tienes turnos"}
            msg2={"Podes ir al inicio para sacar un turno con el medico que necesites"}
          />
        )
      }
    </Container>
    
  );
}

export default MyAppointments;
