import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import { Box, Button, Container, Grid, Link, CssBaseline } from '@mui/material';
import SwipJobSkill from 'components/common/swipe/SwipJobSkill';
import { buttonStyle } from 'components/common/navigation-btn/NavigationBtnStyles';
import NewInput from 'components/common/new-input/NewInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobIdState, kindOfJdState, selectedJobSkillState } from 'recoil/atoms';
import { checkNicknameDuplicate, getMemberInfo, updateMemberInfo } from '../../api/api';
import NewDayPicker from 'components/common/new-daypicker/NewDayPicker';
import TotalInputForm from 'components/common/total-input-form/TotalInputForm';
import { OptionButton, infoBasicStyles } from '../info/InfoStyles';
import { NO_SC, NO_ADMIN, NO_SPACE_BAR } from 'constants/nickname';

const GENDERS = ['남성', '여성'];

export default function InfoEdit() {
  const [jobId, setJobId] = useRecoilState(jobIdState);
  const [selectedJobSkill, setSelectedJobSkill] = useRecoilState(selectedJobSkillState);
  const [helperText, setHelperText] = useState('');
  const [validation, setValidation] = useState(true);

  const [oldNickname, setOldNickname] = useState(''); // 받아온 원래 이름
  const [nickname, setNickname] = useState('');
  const [btnState, setBtnState] = useState(Boolean);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  const setMemberInfo = (memberData) => {
    setNickname(memberData.nickname || '');
    setOldNickname(memberData.nickname || '');
    setBirthday(memberData.birth ?? null);
    setGender(memberData.gender ?? '');
    setJobId(memberData.jobCategoryId ?? '');
    setSelectedJobSkill(memberData.skillList ?? []);
  };

  useEffect(() => {
    if (oldNickname === nickname) {
      setBtnState(true);
      setValidation(true);
      setHelperText('현재 설정되어 있는 닉네임입니다.');
    } else {
      setBtnState(false);
    }
  }, [oldNickname, nickname]);

  //회원 정보 가져오기
  useEffect(() => {
    (async () => {
      try {
        const memberData = await getMemberInfo();
        setMemberInfo(memberData.data);
      } catch (error) {
        console.error('회원 정보 가져오기 에러', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (NO_ADMIN.test(nickname)) {
      setHelperText('관리자를 닉네임으로 사용할 수 없습니다.');
      setValidation(false);
      return;
    }
    if (NO_SC.test(nickname)) {
      setHelperText('특수기호가 포함되어 있습니다.');
      setValidation(false);
      return;
    }
    if (NO_SPACE_BAR.test(nickname)) {
      setHelperText('띄어쓰기가 포함되어 있습니다.');
      setValidation(false);
      return;
    }
  }, [nickname]);

  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  const handleBithdayChange = (newDate) => {
    const formattedDate = newDate instanceof Date ? newDate.toISOString().split('T')[0] : newDate;

    setBirthday(formattedDate);
  };

  const checkNickname = async () => {
    if (nickname) {
      try {
        const res = await checkNicknameDuplicate({
          nickname: nickname, //중간밸류 중복확인
        });

        if (NO_ADMIN.test(nickname) || NO_SC.test(nickname) || NO_SPACE_BAR.test(nickname)) {
          return;
        }
        if (res === 204 && !NO_ADMIN.test(nickname) && !NO_SC.test(nickname) && !NO_SPACE_BAR.test(nickname)) {
          //만약 사용가능하다면
          setValidation(true); // 유효성 o
          setHelperText('사용 가능한 닉네임입니다!');
        }
      } catch (error) {
        if (nickname === '관리자') {
          setValidation(false);
          setHelperText('사용할 수 없는 단어 또는 기호가 포함되어 있습니다.');
          return;
        }
        if (error.response && error.response.status === 409) {
          setValidation(false); // 중간밸류 유효성 x
          setHelperText('이미 존재하는 닉네임입니다');
        } else {
          setValidation(false);
          setHelperText('오류가 발생했습니다');
        }
      }
    }
  };

  const isSaveButtonDisabled = () => {
    const isNicknameValid = validation === true;
    const isBirthdayValid = birthday !== null;
    const isGenderValid = gender !== '';
    const isJobIdValid = jobId !== '';
    const isSelectedJobSkillValid = selectedJobSkill.length === 3;

    return !(isNicknameValid && isBirthdayValid && isGenderValid && isJobIdValid && isSelectedJobSkillValid);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    let data = {
      nickname,
      birth: birthday,
      gender,
      jobCategoryId: jobId,
      skillList: selectedJobSkill,
    };

    try {
      await updateMemberInfo(data);
      alert('정보 수정을 성공하였습니다');
      navigate('/mypage');
    } catch (error) {
      console.error('회원 정보 업데이트 에러', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Header title="정보수정" />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: '22px',
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
                setHelperText('닉네임을 중복확인을 해주세요');
              }
            }}
            onClick={checkNickname}
            btnState={btnState}
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
        <Box sx={{ textAlign: 'right' }}>
          <Link
            component={RouterLink}
            to="/mypage/withdrawal"
            variant="subtitle1"
            sx={{
              color: '#B5B5B5',
              fontWeight: '500',
              marginRight: '13px',
              marginBottom: '10px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            회원탈퇴
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
