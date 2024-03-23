import eyeIcon from 'assets/icons/eye.svg';
import BadgeForJob from 'components/common/badge/BadgeForJob';
import BadgeForStatus from 'components/common/badge/BadgeForStatus';

import {
  Box,
  Typography,
} from '@mui/material';

import {
  CoffeeDetailStyles,
  viewCountContainerStyle,
} from '../styles';

function HostInfoWithViewcount({ coffeeChatData }) {
  return (
    <Box sx={CoffeeDetailStyles.UpTitle}>
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Typography sx={{ color: '#9A9AA1', fontWeight: 400, fontSize: '13px' }}>
          {coffeeChatData?.nickname}
        </Typography>

        <BadgeForJob data={coffeeChatData?.hostJobCategoryName} />
        <BadgeForStatus data={coffeeChatData?.status} />
      </Box>
      <Typography sx={viewCountContainerStyle}>
        <img src={eyeIcon} alt="조회수" />
        {coffeeChatData?.viewCount}
      </Typography>
    </Box>
  );
}

export default HostInfoWithViewcount;
