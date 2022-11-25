import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Box, Container, Card, Typography, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { getHistoryWithUser, upsertNotes } from '../../services/appointments';


const HistoryWithUser = () => {

  const location = useLocation();
  const counterpartId = location.state.counterpartId;

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(-1);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchHistoryWithUserFromApi = async () => {
      try {
        const response = await getHistoryWithUser(counterpartId);
        setAppointments(response);
      } catch (err) {
        console.log('error getting user history', err);
      }
    }

    fetchHistoryWithUserFromApi();
  },  []);

  const isDoctor = currentUser.isDoctor;
  const userFullName = appointments.length > 0 ? `${appointments[0].User.firstName} ${appointments[0].User.lastName}` : '';
  const doctorFullName = appointments.length > 0 ? `${appointments[0].Doctor.firstName} ${appointments[0].Doctor.lastName}` : '';

  const handleEditClick = (apptId) => {
    setEditMode(!editMode);
    setSelectedAppointment(apptId === selectedAppointment ? -1 : apptId);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await upsertNotes(selectedAppointment, {text: inputText});
      setEditMode(false);
      setSelectedAppointment(-1);
      setInputText('');
    } catch (err) {
      console.log('error updating notes', err);
    }
  }

  return (
    <Container sx={{spacing: 2}}>
      <Button onClick={() => navigate('/my-account')}>
        Volver
      </Button>
      <Typography variant="h2">
        Historial de turnos con {isDoctor ? 'Paciente' : 'Doctor' }: {isDoctor ? userFullName : doctorFullName }
      </Typography>
      {
        appointments.map((a) => {
          return (
            <Card sx={{marginTop: 8}}>
              <Typography variant="h4">
                Fecha: {a.arrivalTime.slice(0, 10)} - Horario: {a.arrivalTime.slice(11, 16)} 
              </Typography>

              <Typography variant="h6" sx={{marginTop: 2}}>
                Notas
              </Typography>

              <Typography 
                variant={!a.notes ? "subtitle1" : "body1"}
                color={!a.notes ? "blue" : "black"} 
                sx={{marginTop: 1}}
              >
                {!a.notes ? "No hay notas hasta el momento" : a.notes}
              </Typography>

              {
                isDoctor ? (
                  <Box component="form" onSubmit={() => {}} sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <TextField 
                      disabled={!editMode && selectedAppointment !== a.id}
                      fullWidth 
                      defaultValue={!editMode ? "" : a.notes}
                      maxRows="5"
                      helperText="Editar Notas"
                      onChange={(event)=> {
                        setInputText(event.target.value);
                      }}
                      // disabled={editMode || selectedAppointment === a.id}
                      multiline
                    >
                    </TextField>
                    <Button 
                      onClick={() => handleEditClick(a.id)} 
                      variant="contained" 
                      component="label"
                      size="small"
                      endIcon={<EditIcon />}
                      sx={{justifyContent: "center"
                    }}>
                      {editMode && selectedAppointment === a.id ? "Cancelar Edicion" : "Editar Notas" }
                    </Button>
                    {
                      editMode && selectedAppointment === a.id ? (
                        <Button 
                          onClick={handleSubmit} 
                          variant="contained" 
                          component="label"
                          size="small"
                          endIcon={<UpgradeIcon />}
                          sx={{justifyContent: "center"}}>
                          Actualizar notas
                        </Button>
                      ) : <></>
                    }
                  </Box>
                ) : <></>
              }            
              
            </Card>
          )
        })
      }
    </Container>
  )

}

export default HistoryWithUser;
