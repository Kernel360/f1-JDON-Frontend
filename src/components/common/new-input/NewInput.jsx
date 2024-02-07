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
  isMultiline,
  style,
}) {
  const buttonStyle = {
    ...duplicateCheckButtonStyle,
    background: valid ? "white" : theme.palette.primary.gray300,
    color: valid ? theme.palette.primary.main : theme.palette.primary.gray500,
  };

  // const multiStyle = (value) => {
  //   style = {
  //     "& .MuiInputBase-root": {
  //       height: "100px", // 입력 필드의 높이 설정
  //       alignItems: "flex-start", // 텍스트 시작점을 상단으로 설정
  //     },
  //     "& .MuiInputBase-input": {
  //       overflow: "auto", // 내용이 넘칠 경우 스크롤 허용
  //       color: value ? theme.palette.primary.main : theme.palette.grey[500],
  //       height: "100px",
  //     },
  //   };
  // };

  return (
    <TotalInputForm
      value={value}
      label={label}
      valid={valid}
      helperText={helperText}
    >
      <TextField
        required
        multiline={isMultiline}
        fullWidth
        value={value}
        minRows={3}
        InputLabelProps={{ shrink: true }}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        sx={{
          ...nicknameTextField(value, valid),

          ...style,
        }}
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
