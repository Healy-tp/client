import { useContext, useState } from "react";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { newAppointment } from "../../services/appointments";
import { createAppointmentForUser } from '../../services/admin';
import { useNavigate } from "react-router-dom";
import ConfirmationCard from "../../components/ConfirmationCard";


function Checkout({from}) {

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
    <ConfirmationCard 
      doctorName={selectedData.doctorName}
      doctorSpecialty={selectedData.doctorSpecialty}
      date={selectedData.date}
      selectedTime={selectedData.selectedTime}
      user={from === 'admin' ? selectedData.user : undefined}
      handleSubmit={handleSubmit}
    />
  )
}

export default Checkout;
