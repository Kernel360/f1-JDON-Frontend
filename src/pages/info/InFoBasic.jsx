import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OptionButton, infoBasicStyles } from "./InfoStyles";
import NewInput from "../../components/common/new-input/NewInput";
import { checkNicknameDuplicate } from "../../api/api";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import NewDayPicker from "../../components/common/new-daypicker/NewDayPicker";
import TotalInputForm from "../../components/common/total-input-form/TotalInputForm";

function InFoBasic({ onChange }) {
  const [helperText, setHelperText] = useState("");
  const [value, setValue] = useRecoilState(userInfo);
  const [nick, setNick] = useState(""); //중간 밸류를 생성
  const [validtion, setValidation] = useState(false); // 이건 중간밸류 확인

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    //onChange({ [field]: newValue });
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
  useEffect(() => {
    console.log(value);
  }, [value, validtion]);

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        추가 정보를 알려주세요!
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        서비스에 활용됩니다
      </Typography>
      <Box component="form" noValidate sx={infoBasicStyles.formContainer}>
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
          value={value.birth}
          onChange={(newDate) => handleInputChange("birth", newDate)}
        />
        <TotalInputForm label="성별" value={value.gender} valid={validtion}>
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            {["남성", "여성"].map((item) => (
              <Grid item xs={5.5} key={item}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleInputChange("gender", item)}
                  sx={OptionButton(value.gender === item)}
                >
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </TotalInputForm>
      </Box>
    </>
  );
}

export default InFoBasic;
