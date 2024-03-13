import { Box, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import CompanyCard from 'components/common/card/CompanyCard';
import { getAllJDByKeyword } from 'api/api';
import PaginationComponent from 'components/common/Pagenation';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { jdSearchValue } from 'recoil/atoms';

function JDComponent() {
  const searchValue = useRecoilValue(jdSearchValue);
  const resetSearchValue = useResetRecoilState(jdSearchValue);
  const [currentPage, setCurrentPage] = useState(1);
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

  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('회사 정보 불러오는 중..');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundTxt('관련된 회사 정보가 존재하지 않습니다.');
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // --------------------------------

  useEffect(() => {
    resetSearchValue(); // 페이지 진입시 검색 값 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1); // 키워드 검색 시 페이지네이션 인덱스 초기화
  }, [searchValue]);

  useEffect(() => {
    (async (currentPage) => {
      try {
        const data = await getAllJDByKeyword(
          currentPage - 1,
          jobData.pageInfo.pageSize || 12,
          searchValue,
        );
        setJobData(data);
      } catch (error) {
        console.error('Error fetching getJDAll:', error);
      }
    })(currentPage);
  }, [currentPage, jobData.pageInfo.pageSize, searchValue]);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

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
