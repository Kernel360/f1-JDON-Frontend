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
import NewInput from "../../components/common/new-input/NewInput";
import NewDayPicker from "../../components/common/new-daypicker/NewDayPicker";

function InFoBasic({ nickname, birth, sex, onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState({ nickname, birth, sex });

  const handleInputChange = (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    onChange({ [field]: newValue });
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    handleInputChange("birth", newValue);
  };

  const handleSexChange = (newSex) => {
    handleInputChange("gender", newSex);
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
        <NewInput placeholder="사용하실 닉네임을 입력해주세요" label="닉네임" />
        <NewDayPicker
          selectedDate={value.birth}
          label="생일"
          onChange={() => {}}
        />

        <Box>
          <FormLabel>성별</FormLabel>
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            {["남", "여"].map((item) => (
              <Grid item xs={5.5}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleSexChange("남")}
                  sx={infoBasicStyles.genderButton}
                >
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default InFoBasic;
