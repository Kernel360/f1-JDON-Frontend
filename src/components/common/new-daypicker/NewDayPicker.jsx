import { Box, FormLabel, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import {
  datePicker,
  datePickerContainer,
} from "../../../pages/info/InfoStyles";

function NewDayPicker({ selectedDate, label, onChange }) {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Grid container sx={datePickerContainer(selectedDate)}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={format}
        >
          <DatePicker
            value={selectedDate}
            inputFormat="yyyy.MM.dd"
            onChange={onChange}
            sx={datePicker(selectedDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </Box>
  );
}

export default NewDayPicker;
