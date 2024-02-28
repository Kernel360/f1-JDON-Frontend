import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CompanyCard from '../../components/common/card/CompanyCard';
import { getAllJDByKeyword } from '../../api/api';
import PaginationComponent from '../../components/common/Pagenation';
import { useRecoilValue } from 'recoil';
import { jdSearchValue } from '../../recoil/atoms';

function JDComponent() {
  const searchValue = useRecoilValue(jdSearchValue);

  const [jobData, setJobData] = useState({
    content: [],
    pageInfo: {
      totalPages: 0,
      pageSize: 12,
      first: true,
      last: false,
      empty: true,
    },
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    (async (currentPage) => {
      try {
        const data = await getAllJDByKeyword(currentPage - 1, jobData.pageInfo.pageSize || 12, searchValue);
        setJobData(data);
      } catch (error) {
        console.error('Error fetching getJDAll:', error);
      }
    })(currentPage);
  }, [currentPage, jobData.pageInfo.pageSize, searchValue]);

  return (
    <>
      <Box sx={{ width: '100%', my: 4 }}>
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
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#B9B9B9',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              회사 데이터가 존재하지 않습니다
            </div>
          </Box>
        )}
      </Box>

      {/* 페이지네이션 컴포넌트 */}
      <Stack justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
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
