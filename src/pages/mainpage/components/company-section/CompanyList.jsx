import SkeletonCompanySection from './SkeletonCompanySection';

const { Grid } = require('@mui/material');
const { default: CompanyCard } = require('components/common/card/CompanyCard');

function CompanyList({ loading, data }) {
  if (!loading) {
    return <SkeletonCompanySection />;
  }
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} sx={{ py: 1 }}>
      {data.map((item, index) => (
        <Grid item xs={6} sm={4} md={4} key={index}>
          <CompanyCard data={item} />
        </Grid>
      ))}
    </Grid>
  );
}
export default CompanyList;
