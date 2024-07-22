import React from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from "@mui/material";
import { DAY_LABELS } from "../../../../utils/constants";

const cardWidth = 500;

const AvailabilityCard = ({ availability }) => {
  const [t] = useTranslation();
  const { id, weekday, startHour, endHour, frequency, Office, validUntil } = availability;
  return (
    <Card
      key={id}
      sx={{ width: `${cardWidth}px`, marginTop: 2, flexDirection: "column", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardContent>
        <div style={{ display: "flex", marginBottom: 4 }}>
          <Typography variant="h6">{DAY_LABELS[weekday]}</Typography>
        </div>
        <Typography variant="body">
          {t('my_account.my_availabilities.availability_card.office_no', {
            officeId: Office.number,
          })}
        </Typography>
        <br />
        <Typography variant="body">
          {t('my_account.my_availabilities.availability_card.start_hour', {
            startHour: startHour.slice(0, 5),
          })}
        </Typography>
        <br />
        <Typography variant="body">
          {t('my_account.my_availabilities.availability_card.end_hour', {
            endHour: endHour.slice(0, 5),
          })}
        </Typography>
        <br />
        <Typography variant="body">
          {t('my_account.my_availabilities.availability_card.frequency', {
            frequency,
          })}
        </Typography>
        <br />
        <Typography variant="body">
          {t('my_account.my_availabilities.availability_card.valid_until', {
            validUntil,
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;
