
import { useEffect, useState } from "react";
import { getDoctors } from "../../services/appointments";
import AdminTable from "../AdminTable";


export default function DoctorsAdmin() {

  const headers = ['Name', 'Specialty']

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctorsApi = async () => {
      const response = await getDoctors();
      setDoctors(response.data);
    } 

    getDoctorsApi()
  }, []);

  return (
    <AdminTable headers={headers} rows={doctors} kind={'doctor'}/>
  );
}
