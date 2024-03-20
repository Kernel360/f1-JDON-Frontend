import { formatDate, formatTime } from 'utils/dateUtils';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box } from '@mui/material';

import CoffeeInfoItem from './CoffeeInfoItem';

const { DetailInfoBoxStyle, recruitInfoStyle } = require('../styles');

function RecruitmentInfo({ coffeeChatData }) {
  const formattedDate = formatDate(coffeeChatData?.meetDate);
  const formattedTime = formatTime(coffeeChatData?.meetDate);

  return (
    <Box sx={DetailInfoBoxStyle}>
      <Box sx={recruitInfoStyle}>[ 모집 정보 ]</Box>
      <CoffeeInfoItem icon={<CalendarMonthIcon />} text={formattedDate} iconColor="#FF6565" />
      <CoffeeInfoItem icon={<AccessTimeFilledIcon />} text={formattedTime} iconColor="#52BF91" />
      <CoffeeInfoItem
        icon={<PeopleAltIcon />}
        text={`${coffeeChatData?.currentRecruitCount} / ${coffeeChatData.totalRecruitCount}`}
        iconColor="#575757"
      />
    </Box>
  );
}

export default RecruitmentInfo;
