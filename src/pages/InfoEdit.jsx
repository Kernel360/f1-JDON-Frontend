// InfoEdit.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/common/Header";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Link,
  CssBaseline,
} from "@mui/material";
import SwipJobSkill from "../components/common/swipe/SwipJobSkill";
import InputField from "../components/common/InputField";
import DuplicateCheckButton from "../components/common/DuplicateCheckButton";
import DatePickerField from "../components/common/DatePickerField";
import GenderBtn from "../components/common/GenderBtn";
import { buttonStyle } from "../components/common/navigation-btn/NavigationBtnStyles";
import NewInput from "../components/common/new-input/NewInput";
import { useRecoilState } from "recoil";
import { userInfo } from "../recoil/atoms";
import { checkNicknameDuplicate, getMemberInfo } from "../api/api";
import NewDayPicker from "../components/common/new-daypicker/NewDayPicker";
import { OptionButton, infoBasicStyles } from "./info/InfoStyles";
import TotalInputForm from "../components/common/total-input-form/TotalInputForm";

export default function InfoEdit() {
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState("");
  // const [value, setValue] = useRecoilState(userInfo);
  const [nick, setNick] = useState(""); //중간 밸류를 생성
  const [validtion, setValidation] = useState(false); // 이건 중간밸류 확인

  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null); // or some default date
  const [gender, setGender] = useState("");
  const [jobSkill, setJobSkill] = useState("");

  // 리코일 사용안하면
  const handleInputChange = async (field, newValue) => {
    // setValue((prev) => ({ ...prev, [field]: newValue }));
  };

  useEffect(() => {
    // 페이지가 로드될 때 회원 정보를 받아오는 통신 로직
    const fetchMemberInfo = async () => {
      try {
        const memberData = await getMemberInfo();
        console.log("men", memberData);
        setNickname(memberData.nickname || "닉네임 설정이 필요합니다.");
        setBirthday(memberData.birthday || null);
        setGender(memberData.gender || "");
      } catch (error) {
        // 에러 처리 로직
        console.error("회원 정보 가져오기 에러", error);
      }
    };

    fetchMemberInfo();
  }, []);

  // 초반에 정보들 넣어주기
  // const handleInputChange = (name, value) => {
  //   if (name === "nickname") {
  //     setNickname(value);
  //   } else if (name === "birthday") {
  //     setBirthday(value);
  //   } else if (name === "sex") {
  //     setSex(value);
  //   }
  // };

  const handleSaveChanges = () => {
    // 여기서 변경된 정보를 저장하는 로직을 추가
    // 저장이 완료되면 프로필 페이지로 이동
    navigate("/mypage");
  };

  const checkNickname = async () => {
    if (nick) {
      try {
        const res = await checkNicknameDuplicate({
          nickname: nick, //중간밸류 중복확인
        });
        if (res === 204) {
          //만약 사용가능하다면
          setValidation(true); // 유효성 o
          setHelperText("사용 가능한 닉네임입니다!");
          handleInputChange("nickname", nick); // 진짜 밸류를 입력
        }
      } catch (error) {
        //그렇지 않다면
        if (error.response && error.response.status === 409) {
          setValidation(false); // 중간밸류 유효성 x
          setHelperText("이미 존재하는 닉네임입니다");
          //setNick("");
        } else {
          setValidation(false);
          setHelperText("오류가 발생했습니다");
          setNick("");
        }
      }
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
      <CssBaseline />
      <Header title="정보수정" />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "22px",
        }}
      >
        <form onSubmit={handleSaveChanges}>
          <NewInput
            placeholder="사용하실 닉네임을 입력해주세요"
            label="닉네임"
            value={nick}
            valid={validtion}
            helperText={helperText}
            duplicate
            onChange={(e) => {
              setNick(e.target.value);
              if (nick) {
                setValidation(false);
                setHelperText("닉네임을 중복확인을 해주세요");
              }
            }}
            onClick={checkNickname}
          />
          <NewDayPicker
            label="생일"
            // value={value.birth}
            onChange={(newDate) => handleInputChange("birth", newDate)}
          />
          <TotalInputForm label="성별" value={gender} valid={validtion}>
            <Grid container sx={infoBasicStyles.genderBtnContainer}>
              {["남성", "여성"].map((item) => (
                <Grid item xs={5.5} key={item}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleInputChange("gender", item)}
                    // sx={OptionButton(value.gender === item)}
                  >
                    {item}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </TotalInputForm>
          <TotalInputForm
            label="직무 및 기술스택"
            // value={value.gender}
            valid={validtion}
          >
            <SwipJobSkill />
          </TotalInputForm>
          <Button
            onClick={handleSaveChanges}
            sx={{
              ...buttonStyle.Button,
              width: "100%",
              marginTop: "30px",
            }}
          >
            수정
          </Button>
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
      </Box>
    </Container>
  );
}
