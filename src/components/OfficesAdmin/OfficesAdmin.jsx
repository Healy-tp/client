
import { useEffect, useState } from "react";
import { getOffices } from "../../services/admin";
import AdminTable from "../AdminTable";
import { ButtonGroup, Button } from "@mui/material";

export default function OfficesAdmin() {

  const headers = ['Office ID', 'Specialties']

  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const getOfficesApi = async () => {
      const response = await getOffices();
      setOffices(response.data);
    } 

    getOfficesApi()
  }, []);

  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>New</Button>
        <Button>OtherAction 1</Button>
        <Button>OtherAction 2</Button>
      </ButtonGroup>
      <AdminTable headers={headers} rows={offices} kind={'office'}/>
    </>
  );
}
