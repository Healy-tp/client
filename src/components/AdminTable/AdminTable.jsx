import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoctorTableRow from '../DoctorTableRow/DoctorTableRow';
import AvailabilityTableRow from '../AvailabilityTableRow/AvailabilityTableRow';
import OfficeTableRow from '../OfficeTableRow/OfficeTableRow';
import AppointmentTableRow from '../AppointmentTableRow/AppointmentTableRow';
import UserTableRow from '../UserTableRow/UserTableRow';

const AdminTable = ({ headers, rows, kind, updateRows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headers.map((h, i) => (
                <TableCell key={i}>{h}</TableCell>
              ))
            }
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            kind === 'doctor' ? <DoctorTableRow doctor={row} />  : 
            kind === 'user' ? <UserTableRow user={row} />  : 
            kind === 'office' ? <OfficeTableRow office={row} updateRows={updateRows} /> : 
            kind === 'appointment' ? <AppointmentTableRow appt={row} /> :
            kind === 'availability' ? <AvailabilityTableRow av={row} /> : <></>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminTable;
