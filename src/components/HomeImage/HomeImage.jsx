import * as React from 'react';
import HomeImageLayout from './HomeImageLayout';
import { Button, Typography}  from '@mui/material';
import doctorsImg from '../../assets/doctors-main6.webp';

export default function HomeImage({ onClick} ) {
  return (
    <HomeImageLayout
      sxBackground={{
        backgroundImage: `url(${doctorsImg})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={doctorsImg}
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
