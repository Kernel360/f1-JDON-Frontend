import { Box, Skeleton } from '@mui/material';

const CompanyCardSkeleton = () => {
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
        <Skeleton width="60%" height={18} />
        <Skeleton width="60%" height={18} />
      </Box>
    </Box>
  );
};

export default CompanyCardSkeleton;
