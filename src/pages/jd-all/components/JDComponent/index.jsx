import { Box, Grid, Stack } from '@mui/material';
import CompanyCard from 'components/common/card/CompanyCard';
import PaginationComponent from 'components/common/Pagenation';
import useJDComponents from 'pages/jd-all/hooks/useJDComponents';

function JDComponent({ keyword, sortData }) {
  const { jobData, foundTxt, currentPage, handlePageChange } = useJDComponents(keyword, sortData);

  return (
    <>
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

      {/* 페이지네이션 컴포넌트 */}
      <Stack justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <PaginationComponent
          pageCount={jobData?.pageInfo.totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}

export default JDComponent;
