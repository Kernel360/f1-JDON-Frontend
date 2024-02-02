import { InputAdornment, TextField } from "@mui/material";
import {
  duplicateCheckButtonStyle,
  nicknameTextField,
} from "../../../pages/info/InfoStyles";
import { theme } from "../../../styles/themeMuiStyle";
import TotalInputForm from "../total-input-form/TotalInputForm";

function NewInput({
  label,
  value,
  valid,
  type,
  placeholder,
  helperText,
  onChange,
  onClick,
  duplicate,
}) {
  const buttonStyle = {
    ...duplicateCheckButtonStyle,
    background: valid ? "white" : theme.palette.primary.gray300,
    color: valid ? theme.palette.primary.main : theme.palette.primary.gray500,
  };

  return (
    <TotalInputForm
      value={value}
      label={label}
      valid={valid}
      helperText={helperText}
    >
      <TextField
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        sx={nicknameTextField(value, valid)}
        InputProps={
          duplicate
            ? {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ background: "transparent" }}
                  >
                    <button type="button" style={buttonStyle} onClick={onClick}>
                      {valid ? (
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            border: valid ? "1px solid" : "",
                            borderRadius: "999px",
                          }}
                        >
                          v
                        </div>
                      ) : (
                        " 중복 확인"
                      )}
                    </button>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      ></TextField>
    </TotalInputForm>
  );
}

export default NewInput;
