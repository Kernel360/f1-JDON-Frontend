// InfoEdit.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Header from "../components/common/Header";
import { Box, Button, Container, Grid, Typography, Link } from "@mui/material";

import SwipJobSkill from "../components/common/swipe/SwipJobSkill";
import InputField from "../components/common/InputField";
import DuplicateCheckButton from "../components/common/DuplicateCheckButton";
import DatePickerField from "../components/common/DatePickerField";
import GenderBtn from "../components/common/GenderBtn";
import { buttonStyle } from "../components/common/navigation-btn/NavigationBtnStyles";

export default function InfoEdit() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null); // or some default date
  const [sex, setSex] = useState(""); // or
  const [jobSkill, setJobSkill] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);

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
    setBirthday(newValue);
    handleInputChange("birthday", newValue);
  };
  const handleSexChange = (selectedGender) => {
    console.log("성별 선택", selectedGender);
  };
  const handleSaveChanges = () => {
    // 여기서 변경된 정보를 저장하는 로직을 추가
    // 저장이 완료되면 프로필 페이지로 이동
    navigate("/mypage");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header title={"정보수정"} sx={{ marginLeft: "24px" }} />
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
          <Grid container spacing={4.5}>
            <Grid item xs={12}>
              <DatePickerField
                value={birthday}
                selectedDate={birthday}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <GenderBtn handleSexChange={handleSexChange} />
            </Grid>
            <Grid item xs={12}>
              <SwipJobSkill />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSaveChanges}
                sx={{
                  ...buttonStyle.Button,
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                수정
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ textAlign: "right" }}>
          <Link
            component={RouterLink}
            to="/mypage/withdrawal"
            variant="subtitle1"
            sx={{
              color: "#B5B5B5",
              fontWeight: "500",
              marginRight: "13px",
              marginBottom: "10px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            회원탈퇴
          </Link>
        </Box>
      </Container>
    </Container>
  );
}
