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

  return (
    <TotalInputForm value={value} label={label} valid={valid}>
      <Grid container sx={datePickerContainer(value)}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={format}
        >
          <DatePicker
            value={value}
            inputFormat="yyyy-MM-dd"
            onChange={handleDateChange}
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
