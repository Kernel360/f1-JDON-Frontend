import { InputAdornment, TextField } from '@mui/material';
import { duplicateCheckButtonStyle, nicknameTextField } from 'components/member/sign-up/InfoStyles';
import { theme } from 'styles/themeMuiStyle';
import TotalInputForm from './TotalInputForm';

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
  min,
  btnState,
}) {
  const buttonStyle = {
    ...duplicateCheckButtonStyle,
    background: 'white',
    color: theme.palette.primary.main,
  };

  return (
    <TotalInputForm value={value} label={label} valid={valid} helperText={helperText}>
      <TextField
        required
        multiline={isMultiline}
        fullWidth
        value={value}
        minRows={3}
        minLength={min}
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
                  <InputAdornment position="end" sx={{ background: 'transparent' }}>
                    <button type="button" style={buttonStyle} onClick={onClick} disabled={btnState}>
                      {valid ? (
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            border: valid ? '1px solid' : '',
                            borderRadius: '999px',
                          }}>
                          v
                        </div>
                      ) : (
                        ' 중복 확인'
                      )}
                    </button>
                  </InputAdornment>
                ),
              }
            : undefined
        }></TextField>
    </TotalInputForm>
  );
}

export default NewInput;
