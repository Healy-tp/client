import * as React from "react";
import { useTranslation } from 'react-i18next';
import HomeImageLayout from "./HomeImageLayout";
import { Button, Typography } from "@mui/material";
import doctorsImg from "../../assets/doctors-main6.webp";

export default function HomeImage({ onClick }) {
  const [t] = useTranslation();
  return (
    <HomeImageLayout
      sxBackground={{
        backgroundImage: `url(${doctorsImg})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={doctorsImg}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {t('home.title')}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        {t('home.subtitle')}
      </Typography>
      <Button
        onClick={onClick}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        {t('home.schedule_appointment')}
      </Button>
    </HomeImageLayout>
  );
}
