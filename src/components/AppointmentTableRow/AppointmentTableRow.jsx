
import { useState } from "react";
import _ from 'lodash';
import { Button, Menu, MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { dateTimeToString } from '../../utils/dateTimeFormatter';
import { APPOINTMENT_STATUS } from '../../utils/constants';
import { editAppointment } from '../../services/admin';

const AppointmentTableRow = ({ appt, updateRows, setSnackbar }) => {
  const defaultEditFields = {
    status: appt.status,
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editFields, setEditFields] = useState(defaultEditFields);

  const openMenu = Boolean(anchorEl);

  const { id, Doctor, User, officeId, arrivalTime, status } = appt;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditFields({ ...editFields, [name]: value })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(appt, ['status']);
    if (!_.isEqual(appt, originalFields)) {
      try {
        await editAppointment({ id, ...editFields });
        setSnackbar({ type: 'success', open: true, message: 'Appointment successfully updated' });
        setEditMode(false);
        await updateRows();
      } catch (error) {
        setSnackbar({ type: 'error', open: true, message: error.response.data.message });
      }
    } else {
      setSnackbar({ type: 'info', open: true, message: 'No changes were made' });
    }
  };

  const handleCancelEdit = () => {
    setEditFields(defaultEditFields);
    setEditMode(false);
  };

  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">{`${User.firstName} ${User.lastName}`}</TableCell>
      <TableCell>{`${Doctor.firstName} ${Doctor.lastName}`}</TableCell>
      <TableCell>{Doctor.specialty}</TableCell>
      <TableCell>{officeId}</TableCell>
      <TableCell>{dateTimeToString(arrivalTime)}</TableCell>
      <TableCell>
        {editMode
          ? (
            <Select
              id="select-status"
              name="status"
              value={editFields.status}
              label="Status"
              onChange={handleChange}
              style={{ width: '130px' }}
            >
              {_.map(_.values(APPOINTMENT_STATUS), (option, i) => (
                <MenuItem
                  key={i}
                  value={option}
                  disabled={option === status}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          )
          : _.capitalize(status)
        }
      </TableCell>
      <TableCell>
      {editMode
        ? (
          <>
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSaveEdition}>Save</Button>
          </>
        )
        : (
          <>
            <Button
              id={id}
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick}
            >
              Options
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEdit}>Edit Appointment</MenuItem>
              <MenuItem onClick={() => console.log('TODO')}>Delete</MenuItem>
            </Menu>
          </>
        )
      }
      </TableCell>
    </TableRow>
  )
}

export default AppointmentTableRow;
