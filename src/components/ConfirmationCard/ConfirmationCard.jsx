import {  
  Box, Button, Snackbar, Card, CardContent, CardActions, Typography
} from '@mui/material';


const ConfirmationCard = ({ doctorName, doctorSpecialty, date, selectedTime, handleSubmit, user}) => {

  return (
    <Card sx={{ alignItems: 'center', marginTop: 8, mr: 32, ml: 32, flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {doctorName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {doctorSpecialty}
        </Typography>
        {
          user ? 
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            For User: {user.name}
          </Typography> : <></>
        }
        <br />

        <Typography variant="body2">
          Date: {date.toJSON().slice(0, 10)}
          <br />
          <br /> 
          Time: {selectedTime.toJSON().slice(11,16)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={handleSubmit}>Confirm</Button>
      </CardActions>
    </Card>
  )
}

export default ConfirmationCard;
