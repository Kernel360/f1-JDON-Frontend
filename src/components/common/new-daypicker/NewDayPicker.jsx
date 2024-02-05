import { Grid, TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import {
  datePicker,
  datePickerContainer,
} from "../../../pages/info/InfoStyles";
import TotalInputForm from "../total-input-form/TotalInputForm";

function NewDayPicker({
  label,
  // initialValue,
  value,
  valid,
  isMeetDay,
  daytime,
  onChange,
}) {
  const handleDateChange = (newDate) => {
    onChange(newDate);
  };
  // const initialDate = value || new Date(initialValue);
  const validateDate = (newDate) => {
    // 유효한 날짜인지 확인
    if (isNaN(newDate.getTime())) {
      console.error("Invalid date");
      return false;
    }
    return true;
  };

  const isDateString = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  return (
    <TotalInputForm value={value} label={label} valid={valid}>
      <Grid container sx={datePickerContainer(value)}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={format}
        >
          {daytime ? (
            <DateTimePicker
              value={value || null}
              inputFormat="yyyy-MM-dd HH-mm"
              sx={datePicker(value)}
              onChange={(newDate) => {
                // 유효성 검사 후 변경
                if (validateDate(newDate)) {
                  handleDateChange(newDate);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <DatePicker
              value={isDateString(value) ? new Date(value) : value}
              inputFormat="yyyy-MM-dd"
              sx={datePicker(value)}
              onChange={(newDate) => {
                // 유효성 검사 후 변경
                if (validateDate(newDate)) {
                  handleDateChange(newDate);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
              minDate={isMeetDay && new Date()}
            />
          )}
        </LocalizationProvider>
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
