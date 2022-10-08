
import { useState } from "react";
import _ from 'lodash';
import moment from 'moment';
import { Button, Menu, MenuItem, Select, TableCell, TableRow, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { editAvailability } from '../../services/admin';
import { FREQUENCIES } from '../../utils/constants';
import { dateToString } from '../../utils/dateTimeFormatter';

const AvailabilityTableRow = ({ availability, updateRows, setSnackbar }) => {
  const defaultEditFields = {
    frequency: availability.frequency,
    validUntil: availability.validUntil,
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editFields, setEditFields] = useState(defaultEditFields);
  const openMenu = Boolean(anchorEl);

  const { id, Doctor, officeId, weekday, startHour, endHour, frequency, validUntil } = availability;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditFields({ ...editFields, [name]: value })
  };

  const handleDateChange = (value) => {
    setEditFields({ ...editFields, validUntil: dateToString(value) });
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(availability, ['frequency']);
    if (!_.isEqual(editFields, originalFields)) {
      try {
        await editAvailability({ id, ...editFields });
        setSnackbar({ type: 'success', open: true, message: 'Availability successfully updated' });
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
      <TableCell component="th" scope="row">
        {`${Doctor.firstName} ${Doctor.lastName}`}
      </TableCell>
      <TableCell>{Doctor.specialty}</TableCell>
      <TableCell>{officeId}</TableCell>
      <TableCell>{moment().weekday(weekday).format('dddd')}</TableCell>
      <TableCell>{startHour}</TableCell>
      <TableCell>{endHour}</TableCell>
      <TableCell>
        {editMode
          ? (
            <Select
              id="select-frequency"
              name="frequency"
              value={editFields.frequency}
              label="Frequency"
              onChange={handleChange}
              style={{ width: '70px' }}
            >
              {FREQUENCIES.map((freq) => (
                <MenuItem
                  key={freq}
                  value={freq}
                >
                  {freq}
                </MenuItem>
              ))}
            </Select>
          )
          : `${frequency} min`
        }
      </TableCell>
      <TableCell style={{ width: '190px' }}>
        {editMode
          ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={editFields.validUntil}
                onChange={handleDateChange}
                disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="yyyy-MM-dd"
              />
            </LocalizationProvider>
          )
          : validUntil
        }
      </TableCell>
      <TableCell>
        {
          editMode
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
                  <MenuItem onClick={handleEdit}>Edit Availability</MenuItem>
                  <MenuItem onClick={() => console.log('TODO')}>Delete</MenuItem>
                </Menu>
              </>
            )
        }
      </TableCell>
    </TableRow>
  )
}

export default AvailabilityTableRow;
