import { infoBoxContainer, infoTitle, noticeMsg } from 'components/coffeechats/Create/styles';
import { jobStyle } from 'components/common/card/CardStyle';

import { Box } from '@mui/material';

function UserInfo({ nickname, jobId }) {
  return (
    <Box
      sx={{
        color: '#373737',
        fontWeight: 600,
        fontSize: '13px',
      }}>
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
        <div style={noticeMsg}>* 작성자 정보는 마이페이지 회원정보에서 수정 가능합니다</div>
      </Box>
    </Box>
  );
}

export default UserInfo;
