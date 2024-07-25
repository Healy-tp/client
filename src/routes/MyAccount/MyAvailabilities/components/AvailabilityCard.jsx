import React from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Chip } from "@mui/material";

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
          <Typography variant="h6">{t(`days.${weekday}`)}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: 'column', gap: 4 }}>
          <Typography variant="body">
            {t('my_account.my_availabilities.availability_card.office_no')} <Chip label={Office.number} />
          </Typography>
          <Typography variant="body">
            {t('my_account.my_availabilities.availability_card.start_hour')} <Chip label={`${startHour.slice(0, 5)}hs`} />
          </Typography>
          <Typography variant="body">
            {t('my_account.my_availabilities.availability_card.end_hour')} <Chip label={`${endHour.slice(0, 5)}hs`} />
          </Typography>
          <Typography variant="body">
            {t('my_account.my_availabilities.availability_card.frequency')} <Chip label={frequency} />
          </Typography>
          <Typography variant="body">
            {t('my_account.my_availabilities.availability_card.valid_until')} <Chip label={validUntil} />
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;
