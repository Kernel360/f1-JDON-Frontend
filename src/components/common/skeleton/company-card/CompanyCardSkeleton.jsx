import { Box, Skeleton } from '@mui/material';

const CompanyCardSkeleton = () => {
  return (
    <Box sx={{ my: 1, cursor: 'pointer', position: 'relative' }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{
          borderRadius: '8px',
          height: {
            xs: '186px',
            sm: '155px',
            md: '200px',
            lg: '156px',
          },
        }}
      />

      <Box sx={{ mt: 1 }}>
        <Skeleton width="60%" height={24} />
        <Skeleton width="80%" height={28} />
      </Box>
    </Box>
  );
};

export default CompanyCardSkeleton;
