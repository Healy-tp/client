
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOffices } from "../../services/admin";
import AdminTable from "../AdminTable";
import { ButtonGroup, Button } from "@mui/material";

export default function OfficesAdmin() {
  const [offices, setOffices] = useState([]);
  const navigate = useNavigate();

  const headers = ['ID', 'Specialties', 'Office Number']

  useEffect(() => {
    const getOfficesApi = async () => {
      const { data } = await getOffices();
      setOffices(data);
    } 

    getOfficesApi()
  }, []);

  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginLeft: 8 }}>
        <Button onClick={() => navigate('/admin/new-office')}>New</Button>
      </ButtonGroup>
      <AdminTable headers={headers} rows={offices} kind={'office'}/>
    </>
  );
}
