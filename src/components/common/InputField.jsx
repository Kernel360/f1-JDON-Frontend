// InputField.js
import React from "react";
import { Box, FormLabel, TextField, InputAdornment } from "@mui/material";

const InputField = ({
  label,
  type,
  id,
  name,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  helperText,

  inputProps,
}) => {
  return (
    <Box width="100%" mb={4}>
      <FormLabel>{label}</FormLabel>
      <TextField
        type={type}
        required
        fullWidth
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        error={error}
        helperText={error ? helperText : ""}
        InputProps={{
          endAdornment: inputProps?.endAdornment,
        }}
      />
    </Box>
  );
};
export default InputField;
