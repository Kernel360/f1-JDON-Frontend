import { Box, Skeleton } from '@mui/material';

const VideoCardSkeleton = () => {
  return (
    <Box sx={{ my: 1, cursor: 'pointer', position: 'relative' }}>
      <Skeleton
        width="100%"
        height={180}
        variant="rectangular"
        animation="wave"
        sx={{
          borderRadius: '8px',
        }}
      />

      <Box sx={{ mt: 1 }}>
        <Skeleton width="60%" height={24} />
        <Skeleton width="80%" height={30} />
        <Skeleton width="40%" height={24} />
        <Skeleton width="30%" height={24} />
      </Box>
    </Box>
  );
};

export default VideoCardSkeleton;
