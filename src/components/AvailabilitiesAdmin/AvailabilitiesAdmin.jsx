
import { useEffect, useState } from "react";
import { getAvailabilities } from "../../services/admin";
import AdminTable from "../AdminTable";



const AvailabilitiesAdmin = () => {
  const headers = ['Doctors Name', 'Doctors Specialty', 'Office ID', 'Weekday', 'Start Hour', 'End Hour', 'Frequency', 'Valid Until']

  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    const getAvailabilitiesApi = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response.data);
    } 

    getAvailabilitiesApi();
  }, []);

  return (
    <AdminTable headers={headers} rows={availabilities} kind={'availability'}/>
  );
}

export default AvailabilitiesAdmin;
