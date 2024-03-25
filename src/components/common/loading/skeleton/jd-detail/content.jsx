import { Box, Skeleton } from '@mui/material';

function ContentSkeleton() {
  return (
    <>
      <>
        <Box sx={{ mt: 1 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="30%" height="24" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="50%" height="24" />
          <Skeleton width="59%" height="24" />
          <Skeleton width="52%" height="24" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="55%" height="24" />
          <Skeleton width="54%" height="24" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="76%" height="24" />
          <Skeleton width="76%" height="24" />
          <Skeleton width="76%" height="24" />
          <Skeleton width="76%" height="24" />
          <Skeleton width="36%" height="24" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="30%" height="24" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton width="15%" height="18" />
          <Skeleton width="30%" height="24" />
        </Box>
      </>
    </>
  );
}

export default ContentSkeleton;
