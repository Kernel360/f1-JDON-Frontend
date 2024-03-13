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
import TotalInputForm from 'components/common/total-input-form/TotalInputForm';

function Coffeeopen() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [nickname, setNickName] = useState('');
  const [job, setJob] = useState();
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
      console.log(res);
      setNickName(res.nickname);
      setJob(res.getJobCategory);
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
          mt="30px"
          display="flex"
          flexDirection="column"
          gap="13px"
          width="100%">
          <TotalInputForm label="작성자 정보">
            <Box
              sx={{
                borderRadius: '10px',
                width: '100%',
                heigth: '64px',
                background: '#F3F5FF',
                py: '16px',
                mt: '10px',
                px: '16px',
              }}>
              <Box
                sx={{
                  pb: '5px',
                  color: '#696969',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                {nickname}
                {job}
              </Box>
              <Typography>* 작성자 정보는 마이페이지 회원정보에서 수정 가능합니다</Typography>
            </Box>
          </TotalInputForm>
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
