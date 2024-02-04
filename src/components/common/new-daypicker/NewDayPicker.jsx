import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import {
  datePicker,
  datePickerContainer,
} from "../../../pages/info/InfoStyles";
import TotalInputForm from "../total-input-form/TotalInputForm";

function NewDayPicker({ label, value, valid, isMeetDay, onChange }) {
  const handleDateChange = (newDate) => {
    onChange(newDate);
  };
  const validateDate = (newDate) => {
    // 유효한 날짜인지 확인
    if (isNaN(newDate.getTime())) {
      console.error("Invalid date");
      return false;
    }
    return true;
  };

  return (
    <TotalInputForm value={value} label={label} valid={valid}>
      <Grid container sx={datePickerContainer(value)}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={format}
        >
          <DatePicker
            value={value || null}
            inputFormat="yyyy-MM-dd"
            onChange={(newDate) => {
              // 유효성 검사 후 변경
              if (validateDate(newDate)) {
                handleDateChange(newDate);
              }
            }}
            sx={datePicker(value)}
            renderInput={(params) => <TextField {...params} />}
            minDate={isMeetDay && new Date()}
          />
        </LocalizationProvider>
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
