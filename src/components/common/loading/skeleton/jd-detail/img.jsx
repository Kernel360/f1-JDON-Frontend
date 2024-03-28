import { Skeleton } from '@mui/material';

function ImgSkeleton() {
  return (
    <>
      <Skeleton
        width="100%"
        height="100%"
        variant="rectangular"
        animation="wave"
        sx={{
          borderRadius: '8px',
        }}
      />
    </>
  );
}

export default ImgSkeleton;
