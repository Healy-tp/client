import { Box, Grid, TextField, Autocomplete, Chip, Button, Container, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useContext} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { timeToString } from '../../utils/dateTimeFormatter';

const Scheduler = ({
  availableTimes,
  appointments,
  availabilities,
  autoCompleteFields,
  autoCompleteOnChange,
  datePickerOnChange,
  buttonOnClick,
  isAdmin,
  handleCheckboxChange,
}) => {

  const {selectedData, setSelectedData} = useContext(AppointmentContext);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          spacing: 2
        }}
      >
        <Grid container spacing={2} maxWidth={'xs'} justifyContent="center" alignItems='center'>
          <Grid item>
            <Autocomplete
              disablePortal
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              onChange={autoCompleteOnChange}
              id="combo-box-demo"
              options={autoCompleteFields.options}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label={autoCompleteFields.label} />}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha"
                value={selectedData.date}
                onChange={datePickerOnChange}
                disabled={selectedData.datePickerDisabled}
                disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={(date) => {
                  const filteredDays = availabilities.filter(av => av.Doctor.id === selectedData.doctorId).map(av => av.weekday);
                  return !filteredDays.includes(date.getDay()); // || availabilities.filter(av => new Date(av.validUntil) < date).length > 0;
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container marginTop={5} justifyContent={'center'}>
            <Grid>
              {
                availableTimes.map(t => {
                  return (
                    <Chip 
                      key={t}
                      label={timeToString(t)} 
                      onClick={() => setSelectedData({ ...selectedData, selectedTime: t })}
                      clickable={true}
                      color="primary" 
                      disabled={appointments.map((a) => ({doctorId: a.doctorId, date: new Date(a.arrivalTime).getTime()})).filter(a => a.doctorId === selectedData.doctorId).map(a => a.date).includes(t.getTime())}
                      variant={ t === selectedData.selectedTime ? "filled" : "outlined"}
                      style={{ margin: 4 }}
                    />
                  )
                })
              }
            </Grid>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={buttonOnClick}
              disabled={!selectedData.extraAppt ? (!selectedData.selectedTime || !selectedData.doctorId || !selectedData.date) : (!selectedData.doctorId || !selectedData.date)}
            >
              Sacar turno
            </Button>
          </Grid>
          {
            isAdmin ? (
              <Grid item>
                <FormGroup>
                  <FormControlLabel control={
                    <Checkbox onChange={handleCheckboxChange}/>
                  } label="Sobreturno" />
                </FormGroup>
              </Grid>
            ) : <></>
          }
        </Grid>
      </Box>
    </Container>
  )
}


export default Scheduler;
