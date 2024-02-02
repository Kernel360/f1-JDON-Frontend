// InfoEdit.js
import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { changeMemberInfo, getMemberInfo } from "../api/api";

export default function InfoEdit() {
  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState({});
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null); // or some default date
  const [gender, setGender] = useState("");
  const [skillList, setSkillList] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);

  const [isNicknameValid, setNicknameValid] = useState(true);

  // 초반에 정보들 넣어주기
  const handleInputChange = (name, value) => {
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "birthday") {
      setBirthday(value);
    } else if (name === "sex") {
      setGender(value);
    }
  };

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const memberData = await getMemberInfo();
        console.log("member", memberData);
        setMemberInfo(memberData.data);
        setNickname(memberData.data.nickname || "");
        setBirthday(memberData.data.birthday || null);
        setGender(memberData.data.gender || "");
        setSkillList(memberData.data.skillList || null);
        setJobCategoryId(memberData.data.setJobCategoryId || null);
      } catch (error) {
        // 접근권한 없을때
        if (error.response && error.response.status === 401) {
          navigator("/signin");
        }
        console.error("회원 정보 가져오기 에러", error);
      }
    };

    fetchMemberInfo();
  }, []);

  console.log("sssss", memberInfo);
  console.log("ㄴㄴㄴㄴㄴ", gender);

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
    setGender(selectedGender);
  };
  const handleSaveChanges = async () => {
    // navigate("/mypage");
    try {
      await changeMemberInfo({
        nickname,
        birthday,
        gender,
        jobCategoryId,
        skillList,
      });

      // 수정된 정보를 가져와서 상태 업데이트
      const updatedMemberInfo = await getMemberInfo();
      setMemberInfo(updatedMemberInfo.data);
    } catch (error) {
      console.error("회원 정보 수정 에러", error);
    }
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
            value={nickname || ""}
            onChange={handleInputChange}
            error={!isNicknameValid}
            helperText={!isNicknameValid ? "다른 닉네임으로 입력해주세요." : ""}
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
              <GenderBtn
                initialGender={gender}
                handleSexChange={handleSexChange}
              />
            </Grid>
            <Grid item xs={12}>
              <SwipJobSkill data={memberInfo} />
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
