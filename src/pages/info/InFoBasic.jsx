import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { OptionButton, infoBasicStyles } from "./InfoStyles";
import NewInput from "../../components/common/new-input/NewInput";
import { checkNicknameDuplicate } from "../../api/api";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import NewDayPicker from "../../components/common/new-daypicker/NewDayPicker";
import TotalInputForm from "../../components/common/total-input-form/TotalInputForm";
import { AGREE_DATA } from "./agreeData";

function InFoBasic({ agree, setAgree }) {
  const [helperText, setHelperText] = useState("");
  const [dateHelperText, setDateHelperText] = useState("");
  const [value, setValue] = useRecoilState(userInfo);
  const [currentDialog, setCurrentDialog] = useState(null);

  const [nick, setNick] = useState(""); //중간 밸류를 생성
  const [validtion, setValidation] = useState(false); // 이건 중간밸류 확인

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleAgreeChange = (event) => {
    setAgree({
      ...agree,
      [event.target.name]: event.target.checked,
    });
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
        } else {
          setValidation(false);
          setHelperText("오류가 발생했습니다");
          setNick("");
        }
      }
    }
  };

  const handleBithdayChange = (newDate) => {
    console.log("birth 넘어온 날것", newDate);
    const formattedDate =
      newDate instanceof Date ? newDate.toISOString().split("T")[0] : newDate;
    console.log("birth 가공한 데이트", formattedDate);

    handleInputChange("birth", formattedDate);
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
          // valid={validtion}
          isMeetDay={false}
          // helperText={dateHelperText}
          onChange={(newDate) => {
            handleBithdayChange(newDate);
            // const now = new Date();
            // if (newDate <= now) {
            //   handleInputChange("birth", newDate);
            // } else {
            //   setValidation(false);
            //   setDateHelperText("현재시간보다 이후입니다");
            // }
          }}
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
        <Box>
          <Divider />
          <Box>
            <FormLabel component="legend">
              <Typography fontSize="0.875rem" paddingY={2}>
                * 서비스 가입을 위한 이용약관에 동의해주세요
              </Typography>
            </FormLabel>
            <FormGroup>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agree[1]}
                      onChange={handleAgreeChange}
                      name="1"
                    />
                  }
                  label={
                    <Typography fontSize="0.875rem" color="#383838">
                      개인정보 수집 및 이용 (필수)
                    </Typography>
                  }
                />
                <Button
                  onClick={() => setCurrentDialog("privacy")}
                  size="small"
                >
                  보기
                </Button>
                <DetailDialog
                  open={currentDialog === "privacy"}
                  handleClose={() => setCurrentDialog(null)}
                  title=" 개인정보 수집 및 이용"
                  content={TermsAndConditions(0)}
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agree[2]}
                      onChange={handleAgreeChange}
                      name="2"
                    />
                  }
                  label={
                    <Typography fontSize="0.875rem" color="#383838">
                      서비스 이용 약관 (필수)
                    </Typography>
                  }
                />
                <Button onClick={() => setCurrentDialog("terms")} size="small">
                  보기
                </Button>
                <DetailDialog
                  open={currentDialog === "terms"}
                  handleClose={() => setCurrentDialog(null)}
                  title="서비스 이용 약관"
                  content={TermsAndConditions(1)}
                />
              </Box>
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function DetailDialog({ open, handleClose, title, content }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}

function TermsAndConditions(i) {
  return (
    <div>
      {AGREE_DATA[i].children.map((item, index) => (
        <div key={index}>
          <h4 style={{ fontSize: 16 }}>{item.title}</h4>
          <p style={{ fontSize: 12 }}>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default InFoBasic;
