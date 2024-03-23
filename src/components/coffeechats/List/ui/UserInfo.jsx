import {
  infoBoxContainer,
  infoTitle,
  noticeMsg,
} from 'components/coffeechats/create/styles';
import { jobStyle } from 'components/common/card/CardStyle';

import { Box } from '@mui/material';

import { userInfoContainer } from '../style';
import InfoItemWrapper from './InfoItemWrapper';

function UserInfo({ nickname, jobId }) {
  return (
    <Box sx={userInfoContainer}>
      <Box sx={infoBoxContainer}>
        [ 작성자 정보 ]
        <InfoItemWrapper title="닉네임">
          <Box display="flex" alignItems="center" gap={1}>
            <div style={{ ...infoTitle, fontWeight: 400 }}>{nickname}</div>
          </Box>
        </InfoItemWrapper>
        <InfoItemWrapper title="직군">
          <Box color="#FF814D" style={jobStyle(jobId)}>
            {jobId === 2 ? '서버개발자' : '프론트엔드 개발자'}
          </Box>
        </InfoItemWrapper>
        <Box style={noticeMsg}>* 작성자 정보는 마이페이지 회원정보에서 수정 가능합니다</Box>
      </Box>
    </Box>
  );
}

export default UserInfo;
