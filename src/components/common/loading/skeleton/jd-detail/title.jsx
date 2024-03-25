import { Box, Skeleton } from '@mui/material';

function TitleSkeleton() {
  return (
    <Box sx={{ mt: 1 }}>
      <Skeleton width="15%" height="18" />
      <Skeleton width="30%" height="24" />
    </Box>
  );
}

export default TitleSkeleton;
