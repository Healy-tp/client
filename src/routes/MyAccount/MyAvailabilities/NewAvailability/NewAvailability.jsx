import _ from 'lodash';
import { useEffect, useState } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Container, Box, Grid, Typography, Chip, Button} from '@mui/material';

import { createAvailability, getAvailabilities } from '../../../../services/appointments';
import { getOffices } from '../../../../services/offices';
import { FREQUENCIES, DAYS, DAY_LABELS, TIMES, MONTH_LABELS } from '../../../../utils/constants';
import AvailabilityInput from '../components/AvailabilityInput';
import DialogAlert from '../../../../components/Dialog/Dialog';
import { getAvailabilityRanges } from '../../../../utils/availability';
import Snackbar from '../../../../components/Snackbar';


const NewAvailability = ({goBack}) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableRanges, setAvailableRanges] = useState([]);

  const [availabilities, setAvailabilities] = useState([]);
  const [availableOffices, setAvailableOffices] = useState([]);

  const [selectedOffice, setSelectedOffice] = useState(-1);
  const [weekday, setWeekday] = useState(-1);
  const [startHour, setStartHour] = useState(-1);
  const [endHour, setEndHour] = useState(-1);
  const [frequency, setFrequency] = useState(-1);
  const [month, setMonth] = useState(-1);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });
  const { open, message, type } = snackbar;

  const currentMonth = new Date().getMonth();
  const MONTHS = [currentMonth + 1, currentMonth + 2, currentMonth + 3].map(m => m > 11 ? m - 12 : m );
  

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const response = await getAvailabilities();
      setAvailabilities(response);
    }

    const fetchOffices = async () => {
      const response = await getOffices();
      setAvailableOffices(response);
    }

    try {
      fetchAvailabilities();
      fetchOffices();
    } catch (err) {
      console.log('error getting data from server', err);
    }
  }, []);

  const handleChangeOffice = (event) => {
    setSelectedOffice(event.target.value);
    if (weekday !== -1) {
      setWeekday(-1);
      setStartHour(-1);
      setEndHour(-1);
    }
  };

  const getValidUntil = () => {
    const year = month < currentMonth ? new Date().getFullYear() + 1 : new Date().getFullYear();
    return `${year}-${month+1}-01`;
  }

  const handleSubmit = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const validateRequest = () => {
    console.log('validate request', startHour, endHour);
    if (startHour >= endHour) {
      console.log('pasa aca')
      setSnackbar({type: 'error', open: true, message: 'Comienzo y salida invalidos'});
      return false;
    }
    return true;
  }

  const submitAvailabilityReq = async () => {
    if (!validateRequest()) return;
    try {
      const payload = {
        weekday,
        frequency,
        officeId: selectedOffice,
        validUntil: getValidUntil(),
        startHour: `${startHour}:00`,
        endHour: `${endHour}:00`,
      }
      const response = await createAvailability(payload);
      // console.log(response);
      setDialogOpen(false);
      goBack();

    } catch (err) {
      setSnackbar({ type: 'error', open: true, message: err.response.data.errors[0].message});
    }
  }

  const handleChangeDay = (event) => {
    if (event.target.value === -1 ) {
      setStartHour(-1);
      setEndHour(-1);
      setWeekday(event.target.value);
      setFrequency(-1);
      setMonth(-1);
      return;
    }
    
    if (selectedOffice !== null && event.target.value !== -1 ) {
      const filteredAvailabilities = availabilities.filter(a => a.officeId === selectedOffice && a.weekday === event.target.value)
        .map(a => {
          return {
            startHour: parseInt(a.startHour.slice(0, 2)),
            endHour: parseInt(a.endHour.slice(0, 2))
          }
        });

      const sortedAvailabilities = _.sortBy(filteredAvailabilities, ['startHour'])
      const ranges = getAvailabilityRanges(sortedAvailabilities);
      setAvailableRanges(ranges);
    }
    setWeekday(event.target.value);
  };

  const handleChangeStartHour = (event) => {
    if (event.target.value === -1 ) {
      setEndHour(-1);
      setFrequency(-1);
      setMonth(-1);
    }
    setStartHour(event.target.value);
  }

  const handleChangeEndHour = (event) => {
    if (event.target.value === -1 ) {
      setFrequency(-1);
      setMonth(-1);
    }
    setEndHour(event.target.value);
  }

  const handleChangeFrquency = (event) => {
    if (event.target.value === -1 ) {
      setFrequency(-1);
      setMonth(-1);
    }
    setFrequency(event.target.value);
  }

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button color="error" onClick={goBack}>Back</Button>
        <CalendarMonthIcon color='primary' sx={{fontSize: 80}} />
        <Typography color="primary" variant="h3">Programa un nuevo horario de atencion</Typography>
      </Box>
      <Grid container spacing={2} sx={{marginTop: 5}} >
        <AvailabilityInput
          disabled={false}
          value={selectedOffice}
          defaultValue={-1}
          handleChange={handleChangeOffice}
          elements={availableOffices}
          kind='id-and-number'
          labelSuffix={''}
          inputLabel={'Office'}
        />
        <AvailabilityInput
          disabled={selectedOffice === -1}
          value={weekday}
          defaultValue={-1}
          handleChange={handleChangeDay}
          elements={DAYS}
          labels={DAY_LABELS}
          labelSuffix={''}
          inputLabel={'Day'}
        />
        {
          selectedOffice !== -1 && weekday !== -1 ? (
            <>
              <Grid item xs={12} justifyContent={'center'}>
                <Typography color={'primary'}>Los rangos disponibles para la oficina y dia seleccionados son:</Typography>
              </Grid>
              <Grid item xs={12}>
                {
                  availableRanges.map(c => <Chip label={c} />)
                }
              </Grid>
              <Grid item xs={12} justifyContent={'center'}>
                <Typography color={'primary'}>Por favor selecciona un horario a atender dentro de los rangos disponibles</Typography>
              </Grid>
              <AvailabilityInput
                disabled={false}
                value={startHour}
                defaultValue={-1}
                handleChange={handleChangeStartHour}
                elements={TIMES}
                kind={'same-as-label'}
                labelSuffix={'HS'}
                inputLabel={'Comienzo'}
                helperText={'Horario de entrada al consultorio'}
              />
              <AvailabilityInput
                disabled={startHour === -1}
                value={endHour}
                defaultValue={-1}
                handleChange={handleChangeEndHour}
                elements={TIMES}
                kind={'same-as-label'}
                labelSuffix={'HS'}
                inputLabel={'Salida'}
                helperText={'Horario de salida del consultorio'}
              />
            </>
          ) : <></>
        }
        {
          endHour !== -1 ? (
            <>
              <Grid item xs={12} justifyContent={'center'}>
                <Typography color={'primary'}>Por favor selecciona la frecuencia (en minutos) con la que queres recibir turnos</Typography>
              </Grid>
              <AvailabilityInput
                disabled={false}
                value={frequency}
                defaultValue={-1}
                handleChange={handleChangeFrquency}
                elements={FREQUENCIES}
                kind={'same-as-label'}
                labelSuffix={'MIN'}
                inputLabel={'Frecuencia'}
                helperText={'Frecuencia de cada turno'}
              />
            </>
          ) : <></>
        }
        {
          frequency !== -1 ? (
            <>
              <Grid item xs={12} justifyContent={'center'}>
                <Typography color={'primary'}>Por favor selecciona hasta que mes queres que sea valida la atencion</Typography>
              </Grid>
              <AvailabilityInput
                disabled={false}
                value={month}
                defaultValue={-1}
                handleChange={handleChangeMonth}
                elements={MONTHS}
                labels={MONTH_LABELS}
                labelSuffix={''}
                inputLabel={'Mes'}
                helperText={'Hasta este mes (no inclusive) sera valida la atencion seleccionada'}
              />
            </>
          ) : <></>
        }
        {
          month !== -1 ? (
            <>
              <Grid item xs={12} justifyContent={'center'} marginBottom={10}>
               <Button onClick={handleSubmit} variant="contained">Solicitar Horario de atencion</Button>
              </Grid>
            </>
          ) : <></>
        }
      </Grid>
      <DialogAlert 
        open={dialogOpen}
        handleClose={handleClose}
        handleAccept={submitAvailabilityReq}
        title={"Solicitar horario de atencion?"}
        msg={`Dias ${DAY_LABELS[weekday]} de ${startHour} hs hasta ${endHour} hs.\n 
        Turnos cada ${frequency} min. Valido hasta ${MONTH_LABELS[month]}`}
      />
      <Snackbar 
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
    </Container>
  );
}

export default NewAvailability;
