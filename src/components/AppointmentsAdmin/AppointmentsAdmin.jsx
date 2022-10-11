
import { useEffect, useState } from "react";
import _ from 'lodash';
import { getAppointments } from "../../services/admin";
import AdminTable from "../AdminTable";

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = ['Users Name', 'Doctors Name', 'Doctors Specialty', 'Office ID', 'Arrival Time', 'Status']

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await getAppointments();
      const sortedData = _.sortBy(response, ['id']);
      setAppointments(sortedData);
    } catch (err) {
      console.log('Error while fetching appointments: ', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AdminTable 
      headers={headers} 
      rows={appointments} 
      kind={'appointment'}
      updateRows={fetchAppointments}
      isLoading={isLoading}
    />
  );
}

export default AppointmentsAdmin;
