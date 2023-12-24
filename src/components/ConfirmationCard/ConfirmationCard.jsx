import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { dateToString, timeToString } from "../../utils/dateTimeFormatter";

const ConfirmationCard = ({
  doctorName,
  doctorSpecialty,
  date,
  selectedTime,
  handleCancel,
  handleSubmit,
  user,
}) => (
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
          For User: {user.name}
        </Typography>
      ) : (
        <></>
      )}
      <br />
      <Typography variant="body2">
        Date: {dateToString(date)}
        <br />
        Time: {timeToString(selectedTime)}hs
      </Typography>
    </CardContent>

    <CardActions>
      <Button variant="contained" color="secondary" onClick={handleCancel}>
        Go back
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Confirm
      </Button>
    </CardActions>
  </Card>
);

export default ConfirmationCard;
