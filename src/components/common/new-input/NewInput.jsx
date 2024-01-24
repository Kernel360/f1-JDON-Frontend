import {
  Box,
  Button,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  duplicateCheckButtonStyle,
  nicknameTextField,
} from "../../../pages/info/InfoStyles";

function NewInput({ label, value, placeholder, onChange }) {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <TextField
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        name="nickname"
        placeholder={placeholder}
        onChange={onChange}
        sx={nicknameTextField(value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ background: "transparent" }}>
              <Button sx={duplicateCheckButtonStyle}>중복확인</Button>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Box>
  );
}

export default NewInput;
