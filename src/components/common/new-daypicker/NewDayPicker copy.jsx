import React, { useState, useMemo } from "react";
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

function InputComponent({
  value,
  onChange,
  children,
  disablePast,
  maxDate,
  setError,
  errorMessage,
}) {
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
  //const [error, setError] = useState(null);

  // const errorMessage = useMemo(() => {
  //   switch (error) {
  //     case "disablePast":
  //       return "! 커피챗 날짜는 오늘부터만 가능합니다.";
  //     case "maxDate":
  //       return "! 유효하지 않는 생일입니다. 다시 입력해주세요.";
  //     case "invalidDate":
  //       return "유효하지 않는 값입니다. 입력해주세요.";
  //     default:
  //       return "";
  //   }
  // }, [error]);

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
                sx={datePicker(value)}
                renderInput={(params) => (
                  <TextField InputProps={{ readOnly: true }} />
                )}
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
                inputFormat="yyyy-MM-dd"
                sx={datePicker(value)}
                renderInput={(params) => (
                  <TextField InputProps={{ readOnly: true }} />
                )}
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
