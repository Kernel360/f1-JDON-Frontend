import NewDayPicker from 'components/common/date-picker/NewDayPicker';
import NewInput from 'components/common/input/NewInput';
import { formatDateTime } from 'utils/dateUtils';

import { Box, Grid } from '@mui/material';

function CoffeeChatForm({ formValue, helperTexts, updateFormValue }) {
  return (
    <>
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
    </>
  );
}

export default CoffeeChatForm;
