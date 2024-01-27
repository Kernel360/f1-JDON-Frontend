import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { OptionButton, infoBasicStyles } from "./InfoStyles";
import NewInput from "../../components/common/new-input/NewInput";
import { checkNicknameDuplicate } from "../../api/api";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import NewDayPicker from "../../components/common/new-daypicker/NewDayPicker";
import TotalInputForm from "../../components/common/total-input-form/TotalInputForm";

function InFoBasic({ onChange }) {
  const [helperText, setHelperText] = useState();
  const [value, setValue] = useRecoilState(userInfo);
  const [valid, setValid] = useState(false);

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    onChange({ [field]: newValue });
  };

  const checkNickname = async () => {
    try {
      const isAvailable = await checkNicknameDuplicate({
        nickname: value.nickname,
      });
      if (isAvailable) {
        setHelperText("사용 가능한 닉네임입니다!");
        setValid(true);
      } else {
        setHelperText("사용 불가능한 닉네임입니다");
        setValid(false);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      setHelperText("오류가 발생했습니다");
    }
  };

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
          value={value.nickname}
          valid={valid}
          helperText={helperText}
          duplicate
          onChange={(e) => {
            handleInputChange("nickname", e.target.value);
            setValid(false);
            setHelperText("중복 확인을 해주세요");
          }}
          onClick={checkNickname}
        />
        <NewDayPicker
          label="생일"
          value={value.birth}
          onChange={(newDate) => handleInputChange("birth", newDate)}
        />
        <TotalInputForm label="성별" value={value.gender} valid={valid}>
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            {["남", "여"].map((item) => (
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
