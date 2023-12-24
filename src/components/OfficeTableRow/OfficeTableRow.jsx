import React, { useState } from "react";
import _ from "lodash";
import {
  Button,
  Chip,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { editOffice } from "../../services/admin";
import { SPECIALTIES } from "../../utils/constants";

const OfficeTableRow = ({ office, setSnackbar, updateRows }) => {
  const defaultEditFields = {
    specialties: office.specialties,
    number: office.number,
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSpecialties, setAnchorElSpecialties] = useState(null);
  const [editFields, setEditFields] = useState(defaultEditFields);

  const openMenu = Boolean(anchorEl);
  const openSpecialtiesList = Boolean(anchorElSpecialties);

  const { id, specialties, number } = office;

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

  const handleCloseSpecialtiesList = () => {
    setAnchorElSpecialties(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleDeleteSpecialty = (index) => {
    if (editFields.specialties.length > 1) {
      const newSpecialties = editFields.specialties.filter(
        (s, i) => i !== index,
      );
      setEditFields({ ...editFields, specialties: newSpecialties });
    } else {
      setSnackbar({
        type: "info",
        open: true,
        message: "Office must have at least one specialty",
      });
    }
  };

  const handleAddSpecialty = (s) => {
    const newSpecialties = _.clone(editFields.specialties);
    newSpecialties.push(s);
    setEditFields({ ...editFields, specialties: newSpecialties });
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(office, ["specialties", "number"]);
    if (!_.isEqual(editFields, originalFields)) {
      try {
        await editOffice({ id, ...editFields });
        setSnackbar({
          type: "success",
          open: true,
          message: "Office successfully updated",
        });
        setEditMode(false);
        await updateRows();
      } catch (error) {
        setSnackbar({
          type: "error",
          open: true,
          message: error.response.data.message,
        });
      }
    } else {
      setSnackbar({
        type: "info",
        open: true,
        message: "No changes were made",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditFields(defaultEditFields);
    setEditMode(false);
  };

  return (
    <>
      <TableRow
        key={id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell>
          {editMode ? (
            <>
              {_.map(editFields.specialties, (s, index) => (
                <Chip
                  key={index}
                  label={s}
                  style={{ margin: 2 }}
                  onDelete={() => handleDeleteSpecialty(index)}
                />
              ))}
              <Chip
                style={{ margin: 2 }}
                label="+"
                onClick={(e) => setAnchorElSpecialties(e.currentTarget)}
              />
              <Menu
                id="specialties-menu"
                open={openSpecialtiesList}
                anchorEl={anchorElSpecialties}
                onClose={handleCloseSpecialtiesList}
              >
                {_.map(SPECIALTIES, (s, index) => (
                  <MenuItem
                    key={index}
                    disabled={_.includes(editFields.specialties, s)}
                    onClick={() => handleAddSpecialty(s)}
                  >
                    {s}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            _.map(specialties, (s, i) => (
              <Chip key={i} label={s} style={{ margin: 2 }} />
            ))
          )}
        </TableCell>
        <TableCell>
          {editMode ? (
            <TextField
              value={editFields.number}
              onChange={handleChange}
              name="number"
              size="small"
              style={{ width: "70px " }}
            />
          ) : (
            number
          )}
        </TableCell>
        <TableCell>
          {editMode ? (
            <>
              <Button onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveEdition}>Save</Button>
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
                Options
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
                <MenuItem onClick={handleEdit}>Edit Office</MenuItem>
                <MenuItem onClick={() => console.log("TODO")}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default OfficeTableRow;
