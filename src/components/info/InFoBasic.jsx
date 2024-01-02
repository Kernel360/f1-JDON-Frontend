import {
  Box,
  Button,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import { useState } from "react";
import {
  datePicker,
  datePickerContainer,
  duplicateCheckButtonStyle,
  infoBasicStyles,
  nicknameTextField,
} from "./InfoStyles";

export function InFoBasic({ nickname, birthday, sex, onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState({ nickname, birthday, sex });


  const handleInputChange = (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    onChange({ [field]: newValue });
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    handleInputChange("birthday", newValue);
  };

  const handleSexChange = (newSex) => {
    handleInputChange("sex", newSex);
  };

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        추가 정보를 알려주세요!
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        서비스에 활용됩니다
      </Typography>
      <Box component="form" noValidate sx={infoBasicStyles.formContainer}>
        <Box>
          <FormLabel>닉네임</FormLabel>
          <TextField
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            placeholder="사용하실 닉네임을 입력해주세요"
            onChange={(e) => handleInputChange("nickname", e.target.value)}
            sx={nicknameTextField(value.nickname)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ background: "transparent" }}
                >
                  <Button sx={duplicateCheckButtonStyle}>중복확인</Button>
                </InputAdornment>
              ),
            }}
          >
            <button style={{ width: "10px", height: "20px" }}>중복확인</button>
          </TextField>
        </Box>

        <Box>
          <FormLabel>생일</FormLabel>
          <Grid container sx={datePickerContainer(value.birthday)}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={format}
            >
              <DatePicker
                value={selectedDate}
                inputFormat="yyyy.MM.dd"
                onChange={handleDateChange}
                sx={datePicker(value.birthday)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ flexGrow: 1 }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Box>

        <Box>
          <FormLabel>성별</FormLabel>
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleSexChange("남")}
                sx={infoBasicStyles.genderButton}
              >
                남
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleSexChange("여")}
                sx={infoBasicStyles.genderButton}
              >
                여
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
