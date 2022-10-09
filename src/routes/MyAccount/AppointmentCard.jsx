import {  
  Button, Card, CardContent, CardActions, Typography, Container, TextField, Grid
} from '@mui/material';

import { useEffect, useState, useContext } from 'react';
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
import { UserContext } from '../../contexts/UserContext';


const AppointmentCard = ({ appt, nav }) => {

  const currentUser = useContext(UserContext);
  const isDoctor = currentUser.isDoctor;
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
    <Card key={appt.id} sx={{ alignItems: 'center', marginTop: 2, flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6">
          {
            !isDoctor ? `${appt.Doctor.firstName} ${appt.Doctor.lastName} - ${appt.Doctor.specialty}` :
            `${appt.User.firstName} ${appt.User.lastName}`
          }
        </Typography>
        <br />
        <Typography variant="body">
          {`Office: ${appt.officeId}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Date: ${appt.arrivalTime.slice(0,10)}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Time: ${appt.arrivalTime.slice(11, 16)}`}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="contained" onClick={() => handleMessageClickOpen(appt.id)}>Message</Button>
        <Button size="small" variant="contained" onClick={() => navigate(`/my-account/${appt.id}/edit`, { state: { appt }})}>Modify</Button>
        <Button size="small" color="error" onClick={() => handleCancelClickOpen(appt.id)}>Cancel</Button>
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
  )
}

export default AppointmentCard;
