import React from 'react';

import { datePicker, datePickerContainer } from 'components/member/sign-up/InfoStyles';
import { parseISO } from 'date-fns';
import format from 'date-fns/locale/ko';

import { Grid, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TotalInputForm from '../input/TotalInputForm';

const isDateString = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value);
};

function InputComponent({ value, onChange, children, disablePast, maxDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={format}>
      {React.cloneElement(children, {
        value: value,
        onChange: onChange,
        maxDate: maxDate,
        disablePast: disablePast,
      })}
    </LocalizationProvider>
  );
}

function NewDayPicker({ label, value, onChange, valid, helperText, daytime }) {
  const now = new Date();
  const handleDateChange = (newDate) => {
    if (typeof newDate === 'string') {
      newDate = parseISO(newDate);
    }
    if (!newDate || isNaN(newDate.getDate())) {
      alert('날짜를 선택해주세요.');
      return;
    }
    onChange(newDate);
  };

  return (
    <TotalInputForm value={value} label={label} valid={valid} helperText={helperText}>
      <Grid container sx={datePickerContainer(value)}>
        {daytime ? (
          <InputComponent
            value={value ? parseISO(value) : now}
            onChange={handleDateChange}
            disablePast>
            <DateTimePicker
              slotProps={{
                textField: {
                  readOnly: true,
                },
              }}
              minutesStep={30}
              sx={datePicker(value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </InputComponent>
        ) : (
          <InputComponent
            value={isDateString(value) ? new Date(value) : value}
            onChange={onChange}
            maxDate={new Date()}>
            <DatePicker
              slotProps={{
                textField: {
                  readOnly: true,
                },
              }}
              sx={datePicker(value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </InputComponent>
        )}
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
