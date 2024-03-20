import eyeIcon from 'assets/icons/eye.svg';
import { JobBadge } from 'components/common/badge/JobBadge';

import { Box, Typography } from '@mui/material';

import { CoffeeDetailStyles, viewCountContainerStyle } from '../styles';

function HostInfoWithViewcount({ coffeeChatData }) {
  return (
    <Box sx={CoffeeDetailStyles.UpTitle}>
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Typography sx={{ color: '#9A9AA1', fontWeight: 400, fontSize: '13px' }}>
          {coffeeChatData.nickname}
        </Typography>
        {coffeeChatData.hostJobCategoryName && (
          <JobBadge job={coffeeChatData.hostJobCategoryName} />
        )}
      </Box>
      <Typography sx={viewCountContainerStyle}>
        <img src={eyeIcon} alt="조회수" />
        {coffeeChatData.viewCount}
      </Typography>
    </Box>
  );
}

export default HostInfoWithViewcount;
