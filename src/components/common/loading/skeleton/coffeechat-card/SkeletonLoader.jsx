import { Grid } from '@mui/material';

import CoffeeChatCardSkeleton from './CoffeeChatCardSkeleton';

const SkeletonLoader = ({ count }) => (
  <Grid container spacing={{ xs: 2, md: 2 }}>
    {[...Array(count)].map((_, index) => (
      <Grid item xs={12} sm={6} md={6} key={index}>
        <CoffeeChatCardSkeleton variant="rectangular" height={230} />
      </Grid>
    ))}
  </Grid>
);

export default SkeletonLoader;
