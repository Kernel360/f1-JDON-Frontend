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

const isDateString = (value) => {
  console.log("[날짜 x]New Date:", value);
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value);
};
const validateDate = (newDate) => {
  console.log("New Date:", newDate);
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  return regex.test(newDate);
};
function DateTimePickerComponent({ value, onChange }) {
  const now = new Date();
  return (
    <DateTimePicker
      value={validateDate(value) || null}
      inputFormat="yyyy-MM-dd HH:mm"
      defaultValue={new Date()}
      sx={datePicker(value)}
      onChange={(newDate) => {
        onChange(newDate);
      }}
      renderInput={(params) => <TextField {...params} />}
      minDateTime={now}
    />
  );
}

function DatePickerComponent({ value, onChange, isMeetDay }) {
  return (
    <DatePicker
      value={value}
      inputFormat="yyyy-MM-dd"
      sx={datePicker(value)}
      onChange={(newDate) => {
        onChange(newDate);
      }}
      renderInput={(params) => <TextField {...params} />}
      maxDate={new Date()}
    />
  );
}

function NewDayPicker({ label, value, valid, isMeetDay, daytime, onChange }) {
  const handleDateChange = (newDate) => {
    onChange(newDate);
  };

  return (
    <TotalInputForm value={value} label={label} valid={valid}>
      <Grid container sx={datePickerContainer(value)}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={format}
        >
          {daytime ? (
            <DateTimePickerComponent
              value={validateDate(value) || new Date(value) || value}
              onChange={handleDateChange}
            />
          ) : (
            <DatePickerComponent
              value={isDateString(value) ? new Date(value) : value}
              onChange={handleDateChange}
              isMeetDay={isMeetDay}
            />
          )}
        </LocalizationProvider>
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
