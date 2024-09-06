import React, { useState } from "react";
import _ from "lodash";
import { useTranslation } from 'react-i18next';
import {
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import { dateTimeToString } from "../../utils/dateTimeFormatter";
import { APPOINTMENT_STATUS } from "../../utils/constants";
import { editAppointment } from "../../services/admin";
import { markAssistance } from "../../services/appointments";

const AppointmentTableRow = ({ appt, updateRows, setSnackbar }) => {
  const { t } = useTranslation();

  const defaultEditFields = {
    status: appt.status,
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editFields, setEditFields] = useState(defaultEditFields);

  const openMenu = Boolean(anchorEl);

  const { id, Doctor, User, Office, arrivalTime, status, assisted } = appt;
  const [assistedCheckbox, setAssistedCheckbox] = useState(assisted);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(appt, ["status"]);
    if (!_.isEqual(appt, originalFields)) {
      try {
        await editAppointment({ id, ...editFields });
        setSnackbar({
          type: "success",
          open: true,
          message: t('admin.appointments.edit.success')
        });
        setEditMode(false);
        await updateRows();
      } catch (error) {
        setSnackbar({
          type: "error",
          open: true,
          message: t('admin.appointments.edit.error')
        });
      }
    } else {
      setSnackbar({
        type: "info",
        open: true,
        message: t('admin.appointments.edit.no_changes_made')
      });
    }
  };

  const handleCancelEdit = () => {
    setEditFields(defaultEditFields);
    setEditMode(false);
  };

  const handleMarkAssistance = async (apptId) => {
    try {
      await markAssistance(apptId);
      setAssistedCheckbox(true);
      setSnackbar({
        type: "success",
        open: true,
        message: t('admin.appointments.edit.mark_assistance_success'),
      });
    } catch (err) {
      console.log(err);
      setSnackbar({
        type: "error",
        open: true,
        message: t('admin.appointments.edit.mark_assistance_error'),
      });
    }
  };

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell
        component="th"
        scope="row"
      >{`${User.firstName} ${User.lastName}`}</TableCell>
      <TableCell>{`${Doctor.firstName} ${Doctor.lastName}`}</TableCell>
      <TableCell>{Doctor.specialty}</TableCell>
      <TableCell>{Office.number}</TableCell>
      <TableCell>
        {arrivalTime ? dateTimeToString(arrivalTime) : t('admin.appointments.edit.extra_appointment')}
      </TableCell>
      <TableCell>
        {editMode ? (
          <Select
            id="select-status"
            name="status"
            value={editFields.status}
            label="Status"
            onChange={handleChange}
            style={{ width: "130px" }}
          >
            {_.map(_.values(APPOINTMENT_STATUS), (option, i) => (
              <MenuItem key={i} value={option} disabled={option === status}>
                {option}
              </MenuItem>
            ))}
          </Select>
        ) : (
          _.capitalize(status)
        )}
      </TableCell>
      <TableCell>
        <Checkbox disabled checked={assistedCheckbox} />
      </TableCell>
      <TableCell>
        {editMode ? (
          <>
            <Button onClick={handleCancelEdit}>{t('actions.cancel')}</Button>
            <Button onClick={handleSaveEdition}>{t('actions.save')}</Button>
          </>
        ) : (
          <>
            <Button
              id={id}
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            >
              {t('admin.appointments.edit.options')}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleEdit}>{t('admin.appointments.edit.menu_option')}</MenuItem>
              <MenuItem disabled={assistedCheckbox} onClick={() => handleMarkAssistance(id)}>
               {t('admin.appointments.edit.mark_assistance')}
              </MenuItem>
              <MenuItem onClick={() => console.log("TODO")}>{t('actions.delete')}</MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AppointmentTableRow;
