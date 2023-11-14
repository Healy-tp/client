import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import {  
  Button, Card, CardContent, CardActions, Typography, Link, Snackbar
} from '@mui/material';

import DialogAlert from '../../../../../components/Dialog';
import { confirmAppointment, deleteAppointment, doctorCancelation, startChat } from '../../../../../services/appointments';
import {
  START_CHAT_DIALOG_MSG, 
  START_CHAT_DIALOG_TITLE, 
  CANCEL_APPT_DIALOG_MSG, 
  CANCEL_APPT_DIALOG_TITLE,
  CONFIRM_APPT_DIALOG_MSG,
  CONFIRM_APPT_DIALOG_TITLE,
} from './utils/dialogs';
import { UserContext } from '../../../../../contexts/UserContext';
import statusColor from './utils/statusColor';

const cardWidth = 500;

const AppointmentCard = ({ appt, nav }) => {
  const {currentUser} = useContext(UserContext);
  const isDoctor = currentUser.isDoctor;
  const navigate = useNavigate();

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [confirmApptDialogOpen, setConfirmDialogOpen] = useState(false);
  const [apptId, setApptId] = useState(-1);

  const [snackbar, setSnackBar] = useState({
    open: false,
    message: '',
  });
  const { open, message } = snackbar;

  const handleMessageClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setMessageDialogOpen(true);
  };

  const handleCancelClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setCancelDialogOpen(true);
  };

  const handleConfirmApptClickOpen = (selectedAppt) => {
    setApptId(selectedAppt);
    setConfirmDialogOpen(true);
  };

  const handleClose = () => {
    setApptId(-1);
    setMessageDialogOpen(false);
    setCancelDialogOpen(false);
    setConfirmDialogOpen(false);
    setSnackBar({open: false, message: ''});
  };

  const handleMessageAccept = async () => {
    try {
      await startChat(apptId);
      nav();
    } catch (err) {
      console.log('error starting chat with user', err);
      const errorMsg = _.get(err, 'response.data.errors[0].message', 'Something went wrong');
      setSnackBar({ open: true, message: errorMsg });
    }
  }

  const handleCancelAccept = async () => {
    try {
      if (isDoctor) {
        await doctorCancelation(apptId);
      } else {
        await deleteAppointment(apptId);
      }
      setCancelDialogOpen(false);
      setApptId(-1);
    } catch (err) {
      console.log('Error canceling appointment', err);
    }
  }

  const handleConfirmAppt = async () => {
    try {
      await confirmAppointment(apptId);
      setConfirmDialogOpen(false);
      setApptId(-1);
    } catch (err) {
      console.log('error confirming appointment', err);
    }
  }

  const { id, Doctor, User, status, Office, arrivalTime } = appt;
  return (
    <Card key={id} sx={{ width: `${cardWidth}px`, marginTop: 2, flexDirection: 'column' }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {
              !isDoctor 
                ? (
                  <Link onClick={() => navigate(`/history-with-user/${appt.doctorId}`, { state: { counterpartId: appt.doctorId} })}>
                    {Doctor.firstName} {Doctor.lastName} - {Doctor.specialty}
                  </Link>
                ) 
                : (
                  <Link onClick={() => navigate(`/history-with-user/${User.id}`, { state: { counterpartId: User.id} })}>
                    {User.firstName} {User.lastName} 
                  </Link>
                )
            }
          </Typography>
          <div style={{ backgroundColor: statusColor(status), padding: '5px', borderRadius: '8px' }}>
            <Typography variant="body1">
              {_.capitalize(status)}
            </Typography>
          </div>
        </div>
        <br />
        <Typography variant="body">
          {`Office: ${Office.number}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Date: ${ arrivalTime ? arrivalTime.slice(0,10) : null}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Time: ${ arrivalTime ? arrivalTime.slice(11, 16) : null}`}
        </Typography>
      </CardContent>

      <CardActions>
        {
          !isDoctor && status === 'to_confirm' ? (
            <Button size="small" color="success" variant="contained" onClick={() => handleConfirmApptClickOpen(id)}>Confirm</Button>    
          ) : <></>
        }
        <Button size="small" variant="contained" onClick={() => handleMessageClickOpen(id)}>Enviar mensaje</Button>
        {
          !isDoctor ? <Button size="small" variant="contained" onClick={() => navigate(`/my-account/${id}/edit`, { state: { appt }})}>Modificar</Button> : <></>
        }
        <Button size="small" color="error" variant="contained" onClick={() => handleCancelClickOpen(id)}>Cancelar</Button>
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

      <DialogAlert 
        open={confirmApptDialogOpen} 
        handleAccept={handleConfirmAppt} 
        handleClose={handleClose}
        title={CONFIRM_APPT_DIALOG_TITLE}
        msg={CONFIRM_APPT_DIALOG_MSG}
      />

      <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
    </Card>
  )
}

export default AppointmentCard;
