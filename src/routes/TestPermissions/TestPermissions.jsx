import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

import { getAppointmentsByUserId } from '../../services/appointments';

const TestPermissions = () => {

  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await getAppointmentsByUserId();
        console.log(response);
        console.log('CURRENT USER', currentUser);
      } catch (err) {

      }
    }
    console.log('CURRENT USER', currentUser);
    // getAppointments();
  }, []);
  

  return (
    <>
      {
        currentUser ? (
          <div>LOGUEADO</div>
        ) : (
          <div>UNAUTHORIZED</div>
        )
      }
    </>
  )
}


export default TestPermissions;
