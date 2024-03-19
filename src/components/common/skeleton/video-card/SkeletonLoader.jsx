import { Grid } from '@mui/material';
import VideoCardSkeleton from './VideoCardSkeleton';

const SkeletonLoader = ({ count }) => (
  <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
    {[...Array(count)].map((_, index) => (
      <Grid item xs={12} sm={4} md={4} key={index}>
        <VideoCardSkeleton variant="rectangular" height={230} />
      </Grid>
    ))}
  </Grid>
);

export default SkeletonLoader;
