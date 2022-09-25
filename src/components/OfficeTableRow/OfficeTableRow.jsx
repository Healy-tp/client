
import { useState } from "react";
import _ from 'lodash';
import { 
  Button,
  Chip,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  TextField
} from "@mui/material";

const OfficeTableRow = ({ office }) => {
  const defaultEditFields = {
    specialties: office.specialties,
    number: office.number,
  };

  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editFields, setEditFields] = useState(defaultEditFields);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = (event) => {
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

  const handleDelete = (index) => {
    if (editFields.specialties.length > 1) {
      const newSpecialties = editFields.specialties.filter((s, i) => i !== index);
      setEditFields({ ...editFields, specialties: newSpecialties });
    }
  };

  const handleSaveEdition = async () => {
    const originalFields = _.pick(office, ['specialties', 'number']);
    if (!_.isEqual(editFields, originalFields)) {
      console.log('saving editions');
    } else {
      console.log('nothing changed');
    }
  };

  const handleCancelEdit = () => {
    setEditFields(defaultEditFields);
    setEditMode(false);
  };

  const { id, specialties, number } = office;
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>
        {editMode
          ? (
            <>
              {_.map(editFields.specialties, (s, index) => <Chip label={s} style={{ margin: 2 }} onDelete={(e) => handleDelete(index)} />)}
              <Chip style={{ margin: 2 }} label="+" onClick={(e) => console.log('abri el menu')} /> 
              {/* Add the menu for the add chip and add an icon */}
            </>
          )
          : (
            _.map(specialties, (s) => <Chip label={s} style={{ margin: 2 }}/>)
          )
        }
      </TableCell>
      <TableCell>
        {editMode
          ? (
            <TextField
              value={editFields.number}
              onChange={handleChange}
              name="number"
              size="small"
            />
          )
          : number
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
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Options
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit Office</MenuItem>
                </Menu>
              </>
            )
        }
      </TableCell>
    </TableRow>
  )
}

export default OfficeTableRow;
