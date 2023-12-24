import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const AvailabilityInput = ({
  disabled,
  value,
  handleChange,
  elements,
  labels,
  labelSuffix,
  defaultValue,
  inputLabel,
  kind,
  helperText,
}) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={inputLabel}
          onChange={handleChange}
        >
          <MenuItem value={defaultValue}>-</MenuItem>
          {elements.map((x) => (
            <MenuItem key={x.number} value={kind === "id-and-number" ? x.id : x}>
              {kind === "id-and-number"
                ? x.number
                : kind === "same-as-label"
                  ? x
                  : labels[x]}{" "}
              {labelSuffix}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default AvailabilityInput;
