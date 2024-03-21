// InputField.js
import { Box, FormLabel, TextField } from '@mui/material';
import { nicknameTextField } from 'pages/info/InfoStyles';

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
  onBlur,
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
        helperText={error ? helperText : ''}
        InputProps={{
          endAdornment: inputProps?.endAdornment,
        }}
        onBlur={onBlur(name)}
        sx={nicknameTextField(value)}
      />
    </Box>
  );
};
export default InputField;
