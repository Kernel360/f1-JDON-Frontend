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
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogContentText,
  // DialogActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { OptionButton, infoBasicStyles } from 'components/member/sign-up/InfoStyles';
import NewInput from 'components/common/input/NewInput';
import { checkNicknameDuplicate } from 'api/api';
import { userInfo } from 'recoil/atoms';
import { useRecoilState } from 'recoil';
import NewDayPicker from 'components/common/date-picker/NewDayPicker';
import TotalInputForm from 'components/common/input/TotalInputForm';
import { NO_SC, NO_ADMIN, NO_SPACE_BAR } from 'constants/nickname';
import DetailDialog from './DetailDialog';
import TermsAndConditions from './TermsAndConditions';

function StepForBasic({ agree, setAgree }) {
  const [helperText, setHelperText] = useState('');
  const [dateHelperText, setDateHelperText] = useState('');
  const [value, setValue] = useRecoilState(userInfo);
  const [currentDialog, setCurrentDialog] = useState(null);

  const [nick, setNick] = useState(''); //중간 밸류를 생성
  const [validation, setValidation] = useState(false); // 이건 중간밸류 확인

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleAgreeChange = (event) => {
    setAgree({
      ...agree,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (NO_ADMIN.test(nick)) {
      setHelperText('관리자를 닉네임으로 사용할 수 없습니다.');
      setValidation(false);
      return;
    }
    if (NO_SC.test(nick)) {
      setHelperText('특수기호가 포함되어 있습니다.');
      setValidation(false);
      return;
    }
    if (NO_SPACE_BAR.test(nick)) {
      setHelperText('띄어쓰기가 포함되어 있습니다.');
      setValidation(false);
      return;
    }
  }, [nick]);

  const checkNickname = async () => {
    if (nick) {
      try {
        const res = await checkNicknameDuplicate({
          nickname: nick,
        });
        if (NO_ADMIN.test(nick) || NO_SC.test(nick) || NO_SPACE_BAR.test(nick)) {
          return;
        }

        if (res === 204 && !NO_ADMIN.test(nick) && !NO_SC.test(nick) && !NO_SPACE_BAR.test(nick)) {
          //만약 사용가능하다면
          setHelperText('사용 가능한 닉네임입니다!');
          setValidation(true); // 유효성 o
          handleInputChange('nickname', nick); // 진짜 밸류를 입력
        }
      } catch (error) {
        //그렇지 않다면
        if (nick === '관리자') {
          setValidation(false);
          setHelperText('사용할 수 없는 단어 또는 기호가 포함되어 있습니다.');
          return;
        }
        if (error.response && error.response.status === 409) {
          setValidation(false); // 중간밸류 유효성 x
          setHelperText('이미 존재하는 닉네임입니다.');
        } else {
          setValidation(false);
          setHelperText('오류가 발생했습니다.');
          setNick('');
        }
      }
    }
  };

  const handleBirthdayChange = (newDate) => {
    const formattedDate = newDate instanceof Date ? newDate.toISOString().split('T')[0] : newDate;
    handleInputChange('birth', formattedDate);
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
          placeholder="사용하실 닉네임을 입력해주세요."
          label="닉네임"
          value={nick}
          valid={validation}
          helperText={helperText}
          duplicate
          onChange={(e) => {
            setNick(e.target.value);
            setValidation(false);
            setHelperText('닉네임 중복확인을 해주세요.');
          }}
          onClick={checkNickname}
        />

        <NewDayPicker
          label="생일"
          value={value.birth}
          valid={validation}
          isMeetDay={false}
          helperText={dateHelperText}
          onChange={(newDate) => {
            const now = new Date();
            if (newDate <= now) {
              handleBirthdayChange(newDate);
            } else {
              setValidation(false);
              setDateHelperText('현재시간보다 이후입니다');
            }
          }}
        />
        <TotalInputForm label="성별" value={value.gender} valid={validation}>
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            {['남성', '여성'].map((item) => (
              <Grid item xs={5.5} key={item}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleInputChange('gender', item)}
                  sx={OptionButton(value.gender === item)}>
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
                * 서비스 가입을 위한 이용약관에 동의해주세요.
              </Typography>
            </FormLabel>
            <FormGroup>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox checked={agree[1]} onChange={handleAgreeChange} name="1" />}
                  label={
                    <Typography fontSize="0.875rem" color="#383838">
                      개인정보 수집 및 이용 (필수)
                    </Typography>
                  }
                />
                <Button onClick={() => setCurrentDialog('privacy')} size="small">
                  보기
                </Button>
                <DetailDialog
                  open={currentDialog === 'privacy'}
                  handleClose={() => setCurrentDialog(null)}
                  title=" 개인정보 수집 및 이용"
                  content={TermsAndConditions(0)}
                />
              </Box>

              <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox checked={agree[2]} onChange={handleAgreeChange} name="2" />}
                  label={
                    <Typography fontSize="0.875rem" color="#383838">
                      서비스 이용 약관 (필수)
                    </Typography>
                  }
                />
                <Button onClick={() => setCurrentDialog('terms')} size="small">
                  보기
                </Button>
                <DetailDialog
                  open={currentDialog === 'terms'}
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

export default StepForBasic;
