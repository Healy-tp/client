
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import { ButtonGroup, Button } from "@mui/material";
import { getOffices } from "../../services/admin";
import AdminTable from "../AdminTable";

export default function OfficesAdmin() {
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const headers = ['ID', 'Specialties', 'Office Number']

  const fetchOffices = async () => {
    try {
      setIsLoading(true);
      const data = await getOffices();
      const sortedData = _.sortBy(data, ['id']);
      setOffices(sortedData);
    } catch (err) {
      console.log('Error while fetching offices: ', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOffices();
  }, []);

  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginLeft: 8 }}>
        <Button onClick={() => navigate('/admin/new-office')}>New</Button>
      </ButtonGroup>
      <AdminTable
        headers={headers}
        rows={offices}
        kind='office'
        updateRows={fetchOffices}
        isLoading={isLoading}
      />
    </>
  );
}
