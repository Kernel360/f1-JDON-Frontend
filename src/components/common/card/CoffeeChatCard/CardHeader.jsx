import BadgeForJob from 'components/common/badge/BadgeForJob';
import BadgeForStatus from 'components/common/badge/BadgeForStatus';

import {
  Box,
  Typography,
} from '@mui/material';

import eyeIcon from '../../../../assets/icons/eye.svg';
import { headerStyles } from './CoffeeChatCardStyle';

function CardHeader({ data }) {
  return (
    <Box sx={headerStyles.container}>
      <Box display="flex" gap={1}>
        <BadgeForStatus data={data?.activeStatus} />
        <BadgeForJob data={data?.hostJobCategoryName} />
      </Box>
      <Typography sx={headerStyles.viewCount}>
        <img src={eyeIcon} alt="조회수" />
        {data.viewCount}
      </Typography>
    </Box>
  );
}

export default CardHeader;
