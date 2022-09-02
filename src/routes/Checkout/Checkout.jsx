import { useContext, useState } from "react";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import {  
  Box, Button, Snackbar 
} from '@mui/material';
import { newAppointment } from "../../services/appointments";
import { useNavigate } from "react-router-dom";


function Checkout() {

  const {selectedData} = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });
  const { open, message } = snackbar;

  const handleClose = () => {
    setSnackbar({ open: false, message: '' });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await newAppointment({
        arrivalTime: `${selectedData.date.toJSON().slice(0, 10)} ${selectedData.selectedTime.toJSON().slice(11,16)}`,
        doctorId: selectedData.doctorId,
        officeId: selectedData.selectedOffice,

      });
      setSnackbar({ type: 'success', open: true, message: 'Appointment made.' });
      navigate('/');
    } catch (error) {
      console.log(error);
      setSnackbar({ type: 'error', open: true, message: error.response.data.message });
    }
  }


  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Snackbar
        open={open}
        handleClose={handleClose}
        message={message}
        type={"error"}
      />
      <div>
      <p>TIME: {selectedData.date.toJSON().slice(0, 10)} {selectedData.selectedTime.toJSON().slice(11,16)}</p>
      <p>DOCTOR: {selectedData.doctorName}</p>
      <p>Specialty: {selectedData.doctorSpecialty}</p>
      <p>Office: {selectedData.selectedOffice}</p>
      <Button type="submit">Confirm</Button>
      </div>
    </Box>
  )
}

export default Checkout;
