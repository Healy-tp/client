
import { useEffect, useState } from "react";
import { getAppointments } from "../../services/admin";
import AdminTable from "../AdminTable";



const AppointmentsAdmin = () => {
  const headers = ['Users Name', 'Doctors Name', 'Doctors Specialty', 'Office ID', 'Arrival Time', 'Status']

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointmentsApi = async () => {
      const response = await getAppointments();
      setAppointments(response);
    } 

    getAppointmentsApi();
  }, []);

  return (
    <AdminTable headers={headers} rows={appointments} kind={'appointment'}/>
  );
}

export default AppointmentsAdmin;
