import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Header from 'components/common/Header';
import { Box, Button, Container, Grid, Link, CssBaseline } from '@mui/material';
import SwipJobSkill from 'components/common/swipe/SwipJobSkill';
import { buttonStyle } from 'components/common/navigation-btn/NavigationBtnStyles';
import NewInput from 'components/common/new-input/NewInput';
import { useRecoilState } from 'recoil';
import { jobIdState, selectedJobSkillState } from 'recoil/atoms';
import { checkNicknameDuplicate, getJobCategory, getMemberInfo, updateMemberInfo } from '../../api/api';
import NewDayPicker from 'components/common/new-daypicker/NewDayPicker';
import TotalInputForm from 'components/common/total-input-form/TotalInputForm';
import { OptionButton, infoBasicStyles } from '../info/InfoStyles';
import { NoSCAndAdmin, NoSpaceBar } from 'constants/nickname';

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
  const [jobCategories, setJobCategories] = useState([]);

  console.log('123', oldNickname);

  const setMemberInfo = (memberData) => {
    setNickname(memberData.nickname || '');
    setOldNickname(memberData.nickname || '');
    setBirthday(memberData.birth ?? null);
    setGender(memberData.gender ?? '');
    setJobId(memberData.jobCategoryId ?? '');
    setSelectedJobSkill(memberData.skillList ?? []);
  };

  // 현재 진행상황 : form을 모두 채워야 진행되는건지 물어봐야함.
  // 만약
  useEffect(() => {
    if (oldNickname === nickname) {
      setBtnState(true);
      setHelperText('이전 이름으로 변경할 수 없습니다.');
    } else {
      setBtnState(false);
    }
  }, [oldNickname, nickname]);

  useEffect(() => {
    // 페이지가 로드될 때 회원 정보를 받아오는 통신 로직
    const fetchMemberInfo = async () => {
      try {
        const memberData = await getMemberInfo();

        setMemberInfo(memberData.data);

        const categoryData = await getJobCategory();
        setJobCategories(categoryData.jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error('회원 정보 가져오기 에러', error);
      }
    };

    fetchMemberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selectedJobSkill이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('selectedJobSkill', JSON.stringify(selectedJobSkill));
  }, [selectedJobSkill]);

  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  const handleBithdayChange = (newDate) => {
    console.log('birth 넘어온 날것', newDate);
    const formattedDate = newDate instanceof Date ? newDate.toISOString().split('T')[0] : newDate;
    console.log('birth 가공한 데이트', formattedDate);

    setBirthday(formattedDate);
  };

  const checkNickname = async () => {
    if (nickname) {
      try {
        const res = await checkNicknameDuplicate({
          nickname: nickname, //중간밸류 중복확인
        });

        if (NoSCAndAdmin.test(nickname)) {
          setValidation(false);
          setHelperText('사용할 수 없는 단어 또는 기호가 포함되어 있습니다.');
          return;
        }
        if (NoSpaceBar.test(nickname)) {
          setValidation(false);
          setHelperText('띄어쓰기가 포함되어 있습니다.');
          return;
        }
        if (res === 204 && !NoSCAndAdmin.test(nickname) && !NoSpaceBar.test(nickname)) {
          //만약 사용가능하다면
          setValidation(true); // 유효성 o
          setHelperText('사용 가능한 닉네임입니다!');
        }
      } catch (error) {
        //그렇지 않다면

        if (nickname === '관리자') {
          setValidation(false);
          setHelperText('사용할 수 없는 단어 또는 기호가 포함되어 있습니다.');
          return;
        }
        if (error.response && error.response.status === 409) {
          setValidation(false); // 중간밸류 유효성 x
          setHelperText('이미 존재하는 닉네임입니다');
          // setNickname("");
        } else {
          setValidation(false);
          setHelperText('오류가 발생했습니다');
          // setNickname("");
        }
      }
    }
  };

  const isSaveButtonDisabled = () => {
    // 모든 필드에 대한 유효성 검사를 추가합니다.
    const isNicknameValid = validation === true;
    const isBirthdayValid = birthday !== null;
    const isGenderValid = gender !== '';
    const isJobIdValid = jobId !== '';
    const isSelectedJobSkillValid = selectedJobSkill.length === 3;

    // 모든 필드가 유효한 경우에만 버튼을 활성화합니다.
    return !(isNicknameValid && isBirthdayValid && isGenderValid && isJobIdValid && isSelectedJobSkillValid);
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
        console.log('정보수정 성공! 수정 데이터: ', res);
      }
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
            <SwipJobSkill jobCategories={jobCategories} />
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
