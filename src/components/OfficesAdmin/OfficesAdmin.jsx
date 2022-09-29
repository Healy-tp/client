
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import { getOffices } from "../../services/admin";
import AdminTable from "../AdminTable";
import { ButtonGroup, Button, CircularProgress } from "@mui/material";


export default function OfficesAdmin() {
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const headers = ['ID', 'Specialties', 'Office Number']

  const getOfficesApi = async () => {
    try {
      setIsLoading(true);
      const { data } = await getOffices();
      const sortedData = _.sortBy(data, ['id']);
      setOffices(sortedData);
    } catch (err) {
      console.log('Error while fetching offices: ', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOfficesApi();
  }, []);

  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginLeft: 8 }}>
        <Button onClick={() => navigate('/admin/new-office')}>New</Button>
      </ButtonGroup>
      {isLoading 
        ? <CircularProgress
            size={60}
            sx={{ position: 'absolute', top: '40%', left: '50%' }}
          />
        : <AdminTable
            headers={headers}
            rows={offices}
            kind='office'
            updateRows={getOfficesApi}
          />
      }
    </>
  );
}
