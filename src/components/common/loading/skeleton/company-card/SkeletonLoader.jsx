import { Grid } from '@mui/material';
import CompanyCardSkeleton from './CompanyCardSkeleton';

const SkeletonLoader = ({ count }) => (
  <Grid container spacing={{ xs: 2, md: 2 }} sx={{ py: 1 }}>
    {[...Array(count)].map((_, index) => (
      <Grid item xs={6} sm={4} md={4} key={index}>
        <CompanyCardSkeleton variant="rectangular" height={230} />
      </Grid>
    ))}
  </Grid>
);

export default SkeletonLoader;
