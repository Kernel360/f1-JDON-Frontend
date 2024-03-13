import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import Header from 'components/common/Header';
import NewInput from 'components/common/new-input/NewInput';
import NewDayPicker from 'components/common/new-daypicker/NewDayPicker';
import { useEffect } from 'react';
import { getCoffeeChatDetail, registerCoffeeChat, updateCoffeechat } from 'api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { theme } from 'styles/themeMuiStyle';
import NewBtn from 'components/common/new-btn/NewBtn';
import { useForm } from '../hooks/useForm';
import { formatDateTime } from '../dateUtils';
import { COFFEE_CHILD_ID } from 'constants/headerProps';

function UpdateCoffeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formValue, setFormValue, helperTexts, isFormValid, updateFormValue } = useForm({
    title: '',
    content: '',
    totalRecruitCount: '',
    meetDate: '',
    openChatUrl: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getCoffeeChatDetail(id);
        setFormValue({
          title: res.title || '',
          content: res.content || '',
          totalRecruitCount: res.totalRecruitCount || '',
          meetDate: res.meetDate || '',
          openChatUrl: res.openChatUrl || '',
        });
      } catch (error) {
        if (error.response.status) {
          navigate('/404');
        }

        console.error('Error fetching coffee chat detail:', error);
      }
    })();
  }, [id, navigate, setFormValue]);

  const hanldeRegister = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCoffeechat(id, formValue);
        alert('커피챗이 수정되었습니다.');
      } else {
        await registerCoffeeChat(formValue);
        alert('커피챗이 생성되었습니다.');
      }
      navigate(`/coffee/${id}`);
    } catch (error) {
      console.error('Error fetching hot skills:', error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Header title={COFFEE_CHILD_ID.title} url={COFFEE_CHILD_ID.url + id} />
        <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
          <Typography fontSize={18} fontWeight={600} paddingTop={1}>
            수정하실 커피챗 정보를 입력해주세요 ☕️
          </Typography>
          <Box
            component="form"
            sx={{
              mt: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '13px',
              width: '100%',
            }}>
            <NewInput
              placeholder="커피챗 제목을 입력해주세요"
              label="제목"
              helperText={helperTexts.title}
              value={formValue.title}
              onChange={(e) => updateFormValue('title', e.target.value)}
            />
            <NewInput
              placeholder="커피챗 내용을 입력해주세요"
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
                    placeholder="숫자만 입력해주세요"
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
                      updateFormValue('meetDate', formatDateTime(newValue));
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <NewInput
              placeholder="오픈채팅방 링크를 입력해주세요"
              label="오픈채팅방 링크"
              helperText={helperTexts.openChatUrl}
              value={formValue.openChatUrl}
              onChange={(e) => updateFormValue('openChatUrl', e.target.value)}
            />
            <NewBtn
              title="수정완료"
              onClick={hanldeRegister}
              disable={!isFormValid}
              isActive={!isFormValid}
              styles={{
                mt: 3,
                mb: 3,
                width: '100%',
                p: '13px',
                borderRadius: '999px',
                background: isFormValid ? theme.palette.primary.main : '#EBEBEB',
                color: isFormValid ? 'white' : '#BCBCC4',
                fontSize: '16px',
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default UpdateCoffeeForm;
