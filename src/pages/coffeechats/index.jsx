import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import BottomNav from 'components/common/BottomNav';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import { useEffect, useState } from 'react';
import { getCoffeeChat, getJobCategory } from 'api/api';
import PaginationComponent from 'components/common/Pagenation';
// import CoffeeBanner from './CoffeeBanner';
import { useRecoilState } from 'recoil';
import { kindOfJdState } from 'recoil/atoms';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import FiltersAndButton from './FiltersAndButton';

export function Coffee() {
  const [coffeeData, setCoffeeData] = useState({
    content: [],
    pageInfo: {
      totalPages: 0,
      pageSize: 12,
      first: true,
      last: false,
      empty: true,
    },
  });
  const defaultSortData = {
    sort: 'createdDate',
    jobCategory: '',
  };
  const pageNum = JSON.parse(localStorage.getItem('page'));
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [kindOfJd, setKindOfJd] = useRecoilState(kindOfJdState);

  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('커피챗 정보 불러오는 중..');

  const handleChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundTxt('커피챗 정보가 없습니다.');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
    // console.log(JSON.parse(pageNum));
  };

  useEffect(() => {
    (async (currentPage) => {
      try {
        const data = await getCoffeeChat(
          currentPage - 1,
          coffeeData.pageInfo.pageSize || 12,
          sortData.sort,
          sortData.jobCategory,
        );
        setCoffeeData(data.data.data);
      } catch (error) {
        console.error('Error fetching getCoffeeChat:', error);
      }
    })(currentPage);
  }, [sortData.sort, sortData.jobCategory, currentPage, coffeeData.pageInfo.pageSize]);

  useEffect(() => {
    (async () => {
      try {
        const { jobGroupList } = await getJobCategory();
        setKindOfJd(jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error('Error fetching job categories:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <HeaderWithSearchBar isSearchBarTrue={false} />
      <FiltersAndButton sortData={sortData} onChange={handleChange} kindOfJd={kindOfJd} />
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 ? (
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item} kindOfJd={kindOfJd} />
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              ml: 2,
              mt: 8,
              width: '100%',
              textAlign: 'center',
              fontSize: '16px',
              color: '#B9B9B9',
              fontWeight: 600,
            }}>
            {foundTxt}
          </Typography>
        )}
      </Grid>
      {coffeeData?.content?.length > 0 && (
        <Box
          sx={{
            width: '100%',
            py: 3,
          }}>
          <Stack justifyContent="center" alignItems="center">
            <PaginationComponent
              pageName="coffee"
              pageCount={coffeeData?.pageInfo.totalPages}
              currentPage={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      )}
      <BottomNav />
    </Container>
  );
}
