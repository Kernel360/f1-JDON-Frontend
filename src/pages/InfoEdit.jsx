// InfoEdit.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";

import InputField from "../components/common/InputField";
import { SignInStyles } from "./PageStyles";
import { datePickerContainer, datePicker } from "./info/InfoStyles";
import DuplicateCheckButton from "../components/common/DuplicateCheckButton";

import DatePickerField from "../components/common/DatePickerField";

export default function InfoEdit() {
  const navigate = useNavigate();
  // const [nickname, birthday, sex] = ["지렁이", "2111-01-11", "여"];

  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null); // or some default date
  const [sex, setSex] = useState(""); // or
  const [jobSkill, setJobSkill] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState({ nickname, birthday, sex });
  const [isNicknameValid, setNicknameValid] = useState(true);

  // 초반에 정보들 넣어주기
  const handleInputChange = (name, value) => {
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "birthday") {
      setBirthday(value);
    } else if (name === "sex") {
      setSex(value);
    }
  };

  const handleCheckDuplicate = () => {
    // setNicknameValid(validateField(nickname));
    //통신에서 성공하면 변경해주고아니면 에러 창 띄워주기
  };
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    handleInputChange("birthday", newValue);
  };

  const handleSaveChanges = () => {
    // 여기서 변경된 정보를 저장하는 로직을 추가
    // 저장이 완료되면 프로필 페이지로 이동
    navigate("/profile");
  };

  return (
    <div>
      <Header showBackButton={true} myText={"정보수정"} />

      <Container component="main" sx={{ marginTop: 6, paddingX: "29px" }}>
        <form onSubmit={handleSaveChanges}>
          <InputField
            label="닉네임"
            type="standard"
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            placeholder="사용하실 닉네임을 입력해주세요"
            value={nickname}
            onChange={handleInputChange}
            error={!isNicknameValid}
            helperText={!isNicknameValid ? "닉네임을 입력하세요." : ""}
            inputProps={{
              endAdornment: (
                <DuplicateCheckButton
                  onClick={handleCheckDuplicate}
                  text={"중복 확인"}
                />
              ),
            }}
          />
          {/* <Box>
            <FormLabel>생일</FormLabel>
            <Grid container sx={datePickerContainer(value.birthday)}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={format}
              >
                <DatePicker
                  value={selectedDate}
                  inputFormat="yyyy.MM.dd"
                  onChange={handleDateChange}
                  sx={datePicker(value.birthday)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ flexGrow: 1 }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Box> */}
          <DatePickerField
            value={selectedDate}
            selectedDate={selectedDate}
            onChange={handleDateChange}
          />

          <InputField
            label="직무 및 기술 스택"
            type="standard"
            id="jobSkill"
            name="jobSkill"
            autoComplete="jobSkill"
            placeholder="클릭하여 선택하기"
            value={jobSkill}
            onChange={handleInputChange}
            error={!jobSkill}
            helperText={!jobSkill ? "직무 및 기술 스택을 선택해주세요" : ""}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSaveChanges}
            sx={SignInStyles.Button}
          >
            수정
          </Button>
        </form>
      </Container>
    </div>
  );
}
