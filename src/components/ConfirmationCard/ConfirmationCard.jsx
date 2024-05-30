import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { dateToStringForDisplay, timeToString } from "../../utils/dateTimeFormatter";

const ConfirmationCard = ({
  doctorName,
  doctorSpecialty,
  date,
  selectedTime,
  handleCancel,
  handleSubmit,
  user,
}) => {  
  const [t] = useTranslation();
  return (
    <Card
      sx={{
        alignItems: "center",
        flexDirection: "column",
        width: "500px",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Dr. {doctorName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {doctorSpecialty}
        </Typography>
        {user ? (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {t('checkout.for_user')}: {user.name}
          </Typography>
        ) : null
        }
        <br />
        <Typography variant="body2">
          {t('checkout.date')}: {dateToStringForDisplay(date)}
          <br />
          {t('checkout.time')}: {timeToString(selectedTime)}hs
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          {t('checkout.go_back')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t('checkout.confirm')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConfirmationCard;
