import React, { useState, useMemo } from "react";
import { Grid, TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import TotalInputForm from "../total-input-form/TotalInputForm";

const isDateString = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value);
};

function InputComponent({
  value,
  onChange,
  renderInput,
  disablePast,
  maxDate,
  setError,
  errorMessage,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={format}>
      {React.cloneElement(renderInput, {
        value: value,
        onChange: onChange,
        maxDate: maxDate,
        disablePast: disablePast,
        onError: (newError) => setError(newError),
        slotProps: {
          textField: {
            helperText: errorMessage,
          },
        },
      })}
    </LocalizationProvider>
  );
}

function NewDayPicker({ label, value, onChange, daytime }) {
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "disablePast":
        return "! 커피챗 날짜는 오늘부터만 가능합니다.";
      case "maxDate":
        return "! 유효하지 않는 생일입니다. 다시 입력해주세요.";
      case "invalidDate":
        return "유효하지 않는 값입니다. 입력해주세요.";
      default:
        return "";
    }
  }, [error]);

  const now = new Date();

  const handleDateChange = (newDate) => {
    if (newDate < now) {
      onChange(newDate);
    }
  };

  return (
    <TotalInputForm value={value} label={label}>
      <Grid container>
        {daytime ? (
          <InputComponent
            value={value}
            onChange={handleDateChange}
            renderInput={
              <DateTimePicker
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            }
            disablePast
            setError={setError}
            errorMessage={errorMessage}
          />
        ) : (
          <InputComponent
            value={isDateString(value) ? new Date(value) : value}
            onChange={handleDateChange}
            renderInput={
              <DatePicker
                inputFormat="yyyy-MM-dd"
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            }
            maxDate={new Date()}
            setError={setError}
            errorMessage={errorMessage}
          />
        )}
      </Grid>
    </TotalInputForm>
  );
}

export default NewDayPicker;
