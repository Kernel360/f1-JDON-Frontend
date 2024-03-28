import { cardStyles } from 'components/common/card/CoffeeChatCard/CoffeeChatCardStyle';

import { Box, Paper, Skeleton } from '@mui/material';

const CoffeeChatCardSkeleton = () => {
  return (
    <Paper elevation={0} sx={cardStyles('')}>
      <Skeleton width="30%" height={30} sx={{ mt: '3px', ml: '12px' }} />
      <Box sx={{ mt: 1, ml: '12px ' }}>
        <Skeleton width="60%" height={20} />
        <Skeleton width="80%" height={25} />
      </Box>
      <Box sx={{ mt: 4, ml: '12px' }}>
        <Skeleton width="30%" height={25} />
        <Skeleton width="25%" height={25} />
        <Skeleton width="25%" height={25} />
      </Box>
    </Paper>
  );
};

export default CoffeeChatCardSkeleton;
