import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/common/Header";
import { Box, Button, Container, Grid, Link, CssBaseline } from "@mui/material";
import SwipJobSkill from "../components/common/swipe/SwipJobSkill";
import { buttonStyle } from "../components/common/navigation-btn/NavigationBtnStyles";
import NewInput from "../components/common/new-input/NewInput";
import { useRecoilState } from "recoil";
import { userInfo, jobIdState, selectedJobSkillState } from "../recoil/atoms";
import {
  checkNicknameDuplicate,
  getMemberInfo,
  updateMemberInfo,
} from "../api/api";
import NewDayPicker from "../components/common/new-daypicker/NewDayPicker";
import { OptionButton, infoBasicStyles } from "./info/InfoStyles";
import TotalInputForm from "../components/common/total-input-form/TotalInputForm";

const GENDERS = ["남성", "여성"];

export default function InfoEdit() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useRecoilState(jobIdState);
  const [selectedJobSkill, setSelectedJobSkill] = useRecoilState(
    selectedJobSkillState
  );
  const [helperText, setHelperText] = useState("");
  // const [value, setValue] = useRecoilState(userInfo);
  // const [nick, setNick] = useState("");
  const [validation, setValidation] = useState(true);

  const [memberInfo, setMemberInfo] = useState({});
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");

  useEffect(() => {
    // 페이지가 로드될 때 회원 정보를 받아오는 통신 로직
    const fetchMemberInfo = async () => {
      try {
        const memberData = await getMemberInfo();
        console.log("men", memberData.data);
        setMemberInfo(memberData.data);
        setNickname(memberData.data.nickname || "닉네임 설정이 필요합니다.");
        setBirthday(memberData.data.birth || null);
        setGender(memberData.data.gender || "");
        setJobId(memberData.data.jobCategoryId || "");
        setSelectedJobSkill(memberData.data.skillList || "");
      } catch (error) {
        console.error("회원 정보 가져오기 에러", error);
      }
    };

    fetchMemberInfo();
  }, []);

  // console.log("11set멤버", jobId);
  // console.log("22set멤버", selectedJobSkill);

  const handleGenderChange = (newValue) => {
    setGender(newValue);
    // console.log("gender", newValue);
  };

  const handleBithdayChange = (newDate) => {
    // console.log("birth 넘어온 날것", newDate);
    const formattedDate =
      newDate instanceof Date ? newDate.toISOString().split("T")[0] : newDate;
    // console.log("birth 가공한 데이트", formattedDate);

    setBirthday(formattedDate);
  };

  const checkNickname = async () => {
    // console.log("checkNickname", nickname);
    if (nickname) {
      try {
        const res = await checkNicknameDuplicate({
          nickname: nickname, //중간밸류 중복확인
        });
        if (res === 204) {
          //만약 사용가능하다면
          setValidation(true); // 유효성 o
          setHelperText("사용 가능한 닉네임입니다!");
          // handleInputChange("nickname", nickname); // 진짜 밸류를 입력
          setNickname(nickname);
        }
      } catch (error) {
        //그렇지 않다면
        if (error.response && error.response.status === 409) {
          setValidation(false); // 중간밸류 유효성 x
          setHelperText("이미 존재하는 닉네임입니다");
          setNickname("");
        } else {
          setValidation(false);
          setHelperText("오류가 발생했습니다");
          setNickname("");
        }
      }
    }
  };

  const isSaveButtonDisabled = () => {
    // 모든 필드에 대한 유효성 검사를 추가합니다.
    const isNicknameValid = validation === true;
    const isBirthdayValid = birthday !== null;
    const isGenderValid = gender !== "";
    const isJobIdValid = jobId !== "";
    const isSelectedJobSkillValid = selectedJobSkill.length === 3;

    // 모든 필드가 유효한 경우에만 버튼을 활성화합니다.
    return !(
      isNicknameValid &&
      isBirthdayValid &&
      isGenderValid &&
      isJobIdValid &&
      isSelectedJobSkillValid
    );
  };

  const handleSaveChanges = async () => {
    let data = {
      nickname,
      birth: birthday,
      gender,
      jobCategoryId: jobId,
      skillList: selectedJobSkill,
    };

    try {
      const res = await updateMemberInfo(data);
      if (res) {
        console.log("정보수정 성공! 수정 데이터: ", res);
      }

      // 저장이 완료되면 프로필 페이지로 이동
      // navigate("/mypage");
    } catch (error) {
      console.error("회원 정보 업데이트 에러", error);
    }
  };

  console.log("c총데이타", nickname, birthday, gender, jobId, selectedJobSkill);

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
            value={nickname}
            valid={validation}
            helperText={helperText}
            duplicate
            onChange={(e) => {
              setNickname(e.target.value);
              if (nickname) {
                setValidation(false);
                setHelperText("닉네임을 중복확인을 해주세요");
              }
            }}
            onClick={checkNickname}
          />
          <NewDayPicker
            label="생일"
            value={birthday}
            onChange={(newValue) => handleBithdayChange(newValue)}
            isMeetDay={false}
          />
          <TotalInputForm label="성별" value={gender} valid={validation}>
            <Grid container sx={infoBasicStyles.genderBtnContainer}>
              {GENDERS.map((item) => (
                <Grid item xs={5.5} key={item}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleGenderChange(item)}
                    sx={OptionButton(gender === item)}
                  >
                    {item}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </TotalInputForm>
          <TotalInputForm label="직무 및 기술스택" valid={validation}>
            <SwipJobSkill />
          </TotalInputForm>
          <Button
            type="submit"
            onClick={handleSaveChanges}
            mt={2}
            fullWidth
            sx={{
              ...buttonStyle.Button,
              ...(isSaveButtonDisabled() ? {} : buttonStyle.ActiveButton),
            }}
            disabled={isSaveButtonDisabled()}
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
