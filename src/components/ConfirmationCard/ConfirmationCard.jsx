import {  
  Button, Card, CardContent, CardActions, Typography
} from '@mui/material';

const ConfirmationCard = ({ doctorName, doctorSpecialty, date, selectedTime, handleCancel, handleSubmit, user }) => (
  <Card sx={{ alignItems: 'center', flexDirection: 'column', width: '500px', borderRadius: '10px', padding: '5px' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        Dr. {doctorName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {doctorSpecialty}
      </Typography>
      {user 
        ? <Typography sx={{ mb: 1.5 }} color="text.secondary">For User: {user.name}</Typography> 
        : <></>
      }
      <br />
      <Typography variant="body2">
        Date: {date.toJSON().slice(0, 10)}
        <br />
        Time: {selectedTime.toJSON().slice(11,16)}hs
      </Typography>
    </CardContent>

    <CardActions>
      <Button variant="contained" color="secondary" onClick={handleCancel}>Go back</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Confirm</Button>
    </CardActions>
  </Card>
);

export default ConfirmationCard;
