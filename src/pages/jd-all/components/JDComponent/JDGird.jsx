import { Box, Grid } from '@mui/material';
import CompanyCard from 'components/common/card/CompanyCard';
import SkeletonLoader from 'components/common/skeleton/company-card/SkeletonLoader';

function JDGird({ jobData, foundTxt, loading }) {
  return (
    <>
      {loading ? (
        <SkeletonLoader count={12} />
      ) : (
        <Box sx={{ width: '100%' }}>
          {jobData.content.length > 0 ? (
            <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
              {jobData.content.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                  <CompanyCard data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '100px 0',
              }}>
              <div
                style={{
                  fontSize: '16px',
                  color: '#B9B9B9',
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                {foundTxt}
              </div>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default JDGird;
