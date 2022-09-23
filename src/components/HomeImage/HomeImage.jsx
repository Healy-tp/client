import * as React from 'react';
import HomeImageLayout from './HomeImageLayout';
import {Button, Typography} from '@mui/material';

const backgroundImage =
  'https://previews.123rf.com/images/pitinan/pitinan1908/pitinan190802975/129009452-healthcare-people-group-professional-doctor-working-in-hospital-office-or-clinic-with-other-doctors-.jpg';

export default function HomeImage({onClick}) {
  return (
    <HomeImageLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Cuida tu salud
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Reserva turnos con los mejores profesionales medicos.
      </Typography>
      <Button
        onClick={onClick}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        Agenda tu turno
      </Button>
    </HomeImageLayout>
  );
}
