import React from "react";
import { Grid, TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import format from "date-fns/locale/ko";
import TotalInputForm from "../total-input-form/TotalInputForm";
import {
  datePicker,
  datePickerContainer,
} from "../../../pages/info/InfoStyles";

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
    if (typeof newDate === "string") {
      newDate = parseISO(newDate);
    }
    if (newDate > now) {
      onChange(newDate);
    }
  };

  return (
    <TotalInputForm
      value={value}
      label={label}
      valid={valid}
      helperText={helperText}
    >
      <Grid container sx={datePickerContainer(value)}>
        {daytime ? (
          <InputComponent
            value={value ? parseISO(value) : now}
            onChange={handleDateChange}
            children={
              <DateTimePicker
                slotProps={{
                  textField: {
                    readOnly: true,
                  },
                }}
                sx={datePicker(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            }
            disablePast
          />
        ) : (
          <InputComponent
            value={isDateString(value) ? new Date(value) : value}
            onChange={onChange}
            children={
              <DatePicker
                slotProps={{
                  textField: {
                    readOnly: true,
                  },
                }}
                sx={datePicker(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            }
            maxDate={new Date()}
          />
        )}
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
