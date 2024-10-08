import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import _ from "lodash";
import { editUser } from "../../services/admin";

const UserTableRow = ({ user, setSnackbar, updateRows }) => {
  const [t] = useTranslation();

  const defaultEditFields = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editFields, setEditFields] = useState(defaultEditFields);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    // setSelectedData({...selectedData, doctorId: doctor.id, doctorName: `${doctor.firstName} ${doctor.lastName}`, specialty: doctor.specialty})
    // navigate('/admin/appointment-for-user');
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(user, ["firstName", "lastName", "email", "phoneNumber", "version"]);
    if (!_.isEqual(editFields, originalFields)) {
      try {
        const id = user.id;
        await editUser({ id, version: originalFields.version, ...editFields });
        setSnackbar({
          type: "success",
          open: true,
          message: t("admin.users.edit.success"),
        });
        setEditMode(false);
        await updateRows();
      } catch (error) {
        const errorMsg = _.get(
          error,
          "response.data.errors[0].message",
          "Something went wrong",
        );
        let snackMsg;
        if (errorMsg.includes("Version mismatch")) {
          snackMsg = t('admin.users.edit.version_mismatch_error')
        } else {
          snackMsg =  t('admin.users.edit.error')
        }
        setSnackbar({
          type: "error",
          open: true,
          message: snackMsg,
        });
      }
    } else {
      setSnackbar({
        type: "info",
        open: true,
        message: t("admin.users.edit.no_changes_made"),
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // TODO: implement delete user
    setAnchorEl(null);
  };

  const handleCancelEdit = () => {
    setEditFields(defaultEditFields);
    setEditMode(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shouldShowCreateAppointment = !user.isAdmin && !user.isDoctor;

  return (
    <TableRow
      key={user.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {
          editMode ? (
            <TextField
              value={editFields.firstName}
              onChange={handleChange}
              name="firstName"
              size="small"
              style={{ width: "70px " }}
            />
          ) : user.firstName
        }
      </TableCell>
      <TableCell component="th" scope="row">
        {
          editMode ? (
            <TextField
              value={editFields.lastName}
              onChange={handleChange}
              name="lastName"
              size="small"
              style={{ width: "70px " }}
            />
          ) : user.lastName
        }
      </TableCell>
      <TableCell>
        {
          editMode ? (
            <TextField
              value={editFields.email}
              onChange={handleChange}
              name="email"
              size="small"
              style={{ width: "200px " }}
            />
          ) : user.email
        }
      </TableCell>
      <TableCell>
        {
          editMode ? (
            <TextField
              value={editFields.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              size="small"
              style={{ width: "200px " }}
            />
          ) : user.phoneNumber
        }
      </TableCell>
      <TableCell>{t(`admin.users.row.status.${user.status}`)  }</TableCell>
      <TableCell>
        {
          editMode ? (
            <>
              <Button onClick={handleCancelEdit}>{t('actions.cancel')}</Button>
              <Button onClick={handleSaveEdition}>{t('actions.save')}</Button>
            </>
          ) : (
            <>
              <Button
              id={user.id}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={showMenu}
            >
              {t("admin.users.row.options")}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {shouldShowCreateAppointment && (
                <MenuItem id={user.id} onClick={handleClick}>
                  {t("admin.users.row.actions.create_appointment")}
                </MenuItem>
              )}
              <MenuItem onClick={handleEdit}>{t("admin.users.row.actions.edit")}</MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: "red" }}>{t("admin.users.row.actions.delete")}</MenuItem>
            </Menu>
            </>   
          )
        }
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
