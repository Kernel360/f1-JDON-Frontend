import { Skeleton } from '@mui/material';
import SkeletonLoader from 'components/common/skeleton/video-card/SkeletonLoader';

function SkeletonCompanySection() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="40%"
        height={28}
        sx={{ borderRadius: '8px', mt: 5, ml: 1 }}
      />
      <SkeletonLoader count={3} />
    </>
  );
}
export default SkeletonCompanySection;
