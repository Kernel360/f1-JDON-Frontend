import { Box, Grid, FormLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/locale/ko';
import { datePickerContainer, datePicker } from '../../pages/info/InfoStyles';

const DatePickerField = ({ value, selectedDate, onChange }) => {
  return (
    <Box>
      <FormLabel>생일</FormLabel>
      <Grid container sx={datePickerContainer(value)}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={format}>
          <DatePicker
            value={selectedDate}
            inputFormat="yyyy.MM.dd"
            onChange={onChange}
            sx={datePicker(value)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ flexGrow: 1 }} />}
          />
        </LocalizationProvider>
      </Grid>
    </Box>
  );
};

export default DatePickerField;
