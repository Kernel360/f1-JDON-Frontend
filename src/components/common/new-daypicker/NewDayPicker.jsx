import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import {
  datePicker,
  datePickerContainer,
} from "../../../pages/info/InfoStyles";
import TotalInputForm from "../total-input-form/TotalInputForm";

function NewDayPicker({
  label,
  initialValue,
  value,
  valid,
  isMeetDay,
  onChange,
}) {
  const handleDateChange = (newDate) => {
    onChange(newDate);
  };

  const initialDate = new Date(initialValue);
  // console.log("11피커에서 오는 날짜", initialValue);
  console.log("22피커에서 오는 날짜", value);

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
          <DatePicker
            value={isDateString(value) ? new Date(value) : value}
            inputFormat="yyyy.MM.dd"
            onChange={handleDateChange}
            sx={datePicker(value)}
            renderInput={(params) => <TextField {...params} />}
            minDate={isMeetDay ? new Date() : undefined}
            maxDate={isMeetDay ? undefined : new Date()}
          />
        </LocalizationProvider>
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
