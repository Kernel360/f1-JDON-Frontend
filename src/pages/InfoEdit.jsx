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
import { checkNicknameDuplicate, getMemberInfo } from "../api/api";
import NewDayPicker from "../components/common/new-daypicker/NewDayPicker";
import { OptionButton, infoBasicStyles } from "./info/InfoStyles";
import TotalInputForm from "../components/common/total-input-form/TotalInputForm";

export default function InfoEdit() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useRecoilState(jobIdState);
  const [selectedJobSkill, setSelectedJobSkill] = useRecoilState(
    selectedJobSkillState
  );
  const [helperText, setHelperText] = useState("");
  // const [value, setValue] = useRecoilState(userInfo);
  const [nick, setNick] = useState(""); //중간 밸류를 생성
  const [validtion, setValidation] = useState(false); // 이건 중간밸류 확인

  const [memberInfo, setMemberInfo] = useState({});
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState(null); // or some default date
  const [gender, setGender] = useState("");
  // const [jobId, setJobId] = useState("");
  // const [selectedJobSkill, setSelectedJobSkill] = useState("");

  // 리코일 사용안하면
  // const handleInputChange = async (field, newValue) => {
  //   setValue((prev) => ({ ...prev, [field]: newValue }));
  // };

  useEffect(() => {
    // 페이지가 로드될 때 회원 정보를 받아오는 통신 로직
    const fetchMemberInfo = async () => {
      try {
        const memberData = await getMemberInfo();
        console.log("men", memberData.data.birth);
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

  console.log("11set멤버", jobId);
  console.log("22set멤버", selectedJobSkill);

  const handleGenderChange = (newValue) => {
    setGender(newValue);
    console.log("gender", newValue);
  };

  const handleBithdayChange = (newDate) => {
    console.log("birth 넘어온 날것", newDate);
    const formattedDate =
      newDate instanceof Date ? newDate.toISOString().split("T")[0] : newDate;
    console.log("birth 가공한 데이트", formattedDate);

    setBirthday(formattedDate);
  };

  const handleSaveChanges = () => {
    // 여기서 변경된 정보를 저장하는 로직을 추가
    // 저장이 완료되면 프로필 페이지로 이동
    navigate("/mypage");
  };

  const checkNickname = async () => {
    console.log("checkNickname", nickname);
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
            valid={validtion}
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
          <TotalInputForm label="성별" value={gender} valid={validtion}>
            <Grid container sx={infoBasicStyles.genderBtnContainer}>
              {["남성", "여성"].map((item) => (
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
          <TotalInputForm
            label="직무 및 기술스택"
            // value={gender}
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
