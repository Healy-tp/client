import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppointmentContext } from "../../contexts/AppointmentContext";
import { newAppointment } from "../../services/appointments";
import { createAppointmentForUser } from '../../services/admin';
import ConfirmationCard from "../../components/ConfirmationCard";
import Snackbar from '../../components/Snackbar';


function Checkout({from}) {

  const {selectedData} = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });
  const { open, message, type } = snackbar;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (from === 'user') {
        await newAppointment({
          arrivalTime: `${selectedData.date.toJSON().slice(0, 10)} ${selectedData.selectedTime.toJSON().slice(11,16)}`,
          doctorId: selectedData.doctorId,
          officeId: selectedData.selectedOffice,
        });
        setSnackbar({ type: 'success', open: true, message: 'Appointment made.' });
        navigate('/');
      } else {
        await createAppointmentForUser({
          arrivalTime: `${selectedData.date.toJSON().slice(0, 10)} ${selectedData.selectedTime.toJSON().slice(11,16)}`,
          doctorId: selectedData.doctorId,
          officeId: selectedData.selectedOffice,
          userId: selectedData.user.id,
        });
        
        setSnackbar({ type: 'success', open: true, message: 'Appointment made.' });
        navigate('/admin');
      }
    } catch (error) {
      // console.log(error);
      setSnackbar({ type: 'error', open: true, message: error.response.data.message });
    }
  }

  return (
    <div style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
      <ConfirmationCard 
        doctorName={selectedData.doctorName}
        doctorSpecialty={selectedData.doctorSpecialty}
        date={selectedData.date}
        selectedTime={selectedData.selectedTime}
        user={from === 'admin' ? selectedData.user : undefined}
        handleCancel={handleGoBack}
        handleSubmit={handleSubmit}
      />
    </div>
    
  )
}

export default Checkout;
