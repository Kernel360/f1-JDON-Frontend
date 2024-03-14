
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import Header from 'components/common/Header';
import NewInput from 'components/common/new-input/NewInput';
import NewDayPicker from 'components/common/new-daypicker/NewDayPicker';
import { useEffect, useState } from 'react';
import { getMemberInfo, registerCoffeeChat } from 'api/api';
import { useNavigate } from 'react-router-dom';
import { theme } from 'styles/themeMuiStyle';
import NewBtn from 'components/common/new-btn/NewBtn';
import { formatDateTime } from '../dateUtils';
import { useForm } from '../hooks/useForm';
import { COFFEE_CHILD } from 'constants/headerProps';
import { jobStyle } from 'components/common/card/CardStyle';
import { infoBoxContainer, infoTitle, noticeMsg } from './styles';

function Coffeeopen() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [nickname, setNickName] = useState('');
  const [jobId, setJobId] = useState(0);
  const { formValue, helperTexts, isFormValid, updateFormValue } = useForm({
    title: '',
    content: '',
    totalRecruitCount: '',
    meetDate: '',
    openChatUrl: '',
  });

  const submitCoffeeChat = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      alert('이미 등록된 커피챗입니다.');
      return;
    }
    try {
      const res = await registerCoffeeChat(formValue);
      if (!res.data) {
        alert('커피챗 등록에 실패했습니다.');
        return;
      }
      setIsRegistered(true);
      alert('등록이 완료되었습니다.');
      navigate(`/coffee/${res.data.coffeeChatId}`);
    } catch (error) {
      console.error('Error registering coffee chat:', error);
    }
  };

  useEffect(() => {
    const memData = async () => {
      const res = await getMemberInfo();
      setNickName(res.data.nickname);
      setJobId(res.data.jobCategoryId);
    };
    memData();
  }, []);

  return (
    <Container maxWidth="sm" display="flex" flexDirection="column">
      <CssBaseline />
      <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />
      <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
        <Typography fontSize={18} fontWeight={600} paddingTop={1} textAlign="left">
          커피챗 정보를 입력해주세요. ☕️
        </Typography>
        <Box
          component="form"
          noValidate
          mt="10px"
          display="flex"
          flexDirection="column"
          gap="13px"
          width="100%"
        >
          <Box
            sx={{
              color: '#373737',
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            <Box sx={infoBoxContainer}>
              [ 작성자 정보 ]
              <Box display="flex" alignItems="center" gap={1}>
                <div style={infoTitle}>닉네임</div>
                <div style={{ ...infoTitle, fontWeight: 400 }}>{nickname}</div>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <div style={infoTitle}>직군</div>
                <div color="#FF814D" style={jobStyle(jobId)}>
                  {jobId === 2 ? '서버개발자' : '프론트엔드 개발자'}
                </div>
              </Box>
              <div style={noticeMsg}>
                * 작성자 정보는 마이페이지 회원정보에서 수정 가능합니다
              </div>

            </Box>
          </Box>
          <NewInput
            placeholder="커피챗 제목을 입력해주세요."
            label="제목"
            helperText={helperTexts.title}
            value={formValue.title}
            onChange={(e) => updateFormValue('title', e.target.value)}
          />
          <NewInput
            placeholder="커피챗 내용을 입력해주세요."
            label="상세 내용"
            helperText={helperTexts.content}
            value={formValue.content}
            isMultiline={true}
            onChange={(e) => updateFormValue('content', e.target.value)}
          />
          <Box>
            <Grid container width="100%" display="flex" justifyContent="space-between">
              <Grid item xs={5.6}>
                <NewInput
                  placeholder="숫자만 입력해주세요."
                  label="총 모집 인원"
                  helperText={helperTexts.totalRecruitCount}
                  type="number"
                  min={0}
                  value={
                    isNaN(formValue.totalRecruitCount) || formValue.totalRecruitCount === 0
                      ? null
                      : formValue.totalRecruitCount
                  }
                  onChange={(e) => {
                    updateFormValue('totalRecruitCount', parseInt(e.target.value, 10));
                  }}
                />
              </Grid>

              <Grid item xs={5.6}>
                <NewDayPicker
                  label="일시"
                  daytime={true}
                  value={formValue.meetDate}
                  onChange={(newValue) => {
                    const newTime = formatDateTime(newValue);
                    updateFormValue('meetDate', newTime);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <NewInput
            placeholder="카카오톡 오픈채팅방 링크만 입력 가능합니다. ex)https://open.kakao.com/o/"
            label="카카오톡 오픈채팅방 링크"
            helperText={helperTexts.openChatUrl}
            value={formValue.openChatUrl}
            onChange={(e) => updateFormValue('openChatUrl', e.target.value)}
          />
          <NewBtn
            title={isRegistered ? '이미 등록된 커피챗입니다.' : '등록하기'}
            onClick={submitCoffeeChat}
            disable={!isFormValid || isRegistered}
            isActive={!isFormValid || isRegistered}
            styles={{
              width: '100%',
              p: '13px',
              fontSize: '16px',
              borderRadius: '999px',
              background: !isRegistered && isFormValid ? theme.palette.primary.main : '#EBEBEB',
              color: !isRegistered && isFormValid ? 'white' : '#BCBCC4',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
export default Coffeeopen;
