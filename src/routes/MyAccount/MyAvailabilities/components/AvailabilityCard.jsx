import {  
  Card, CardContent, Typography
} from '@mui/material';
import { DAY_LABELS } from '../../../../utils/constants';

const cardWidth = 500;

const AvailabilityCard = ({ av }) => {

  const { id, weekday, startHour, endHour, officeId, frequency, validUntil } = av;
  return (
    <Card key={id} sx={{ width: `${cardWidth}px`, marginTop: 2, flexDirection: 'column' }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {DAY_LABELS[weekday]}
          </Typography>
        </div>
        <br />
        <Typography variant="body">
          {`Consultorio ID: ${officeId} (Cambiar a office #)`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Comienzo: ${startHour.slice(0, 5)}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Salida: ${endHour.slice(0, 5)}`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Turnos cada ${frequency} min`}
        </Typography>
        <br />
        <Typography variant="body">
          {`Valido hasta ${validUntil}`}
        </Typography>
        
      </CardContent>      
    </Card>
  )
}

export default AvailabilityCard;
