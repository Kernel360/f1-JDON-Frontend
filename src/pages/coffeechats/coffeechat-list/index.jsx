import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import BottomNav from 'components/common/BottomNav';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import { useEffect, useState } from 'react';
import PaginationComponent from 'components/common/Pagenation';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import FiltersAndButton from './FiltersAndButton';
import { foundTxtStyle, listContainer } from '../style';
import useFetchCoffeeData from '../hooks/useFetchCoffeeData';
import useFetchJobCategories from '../hooks/useFetchJobCategory';

const defaultSortData = {
  sort: 'createdDate',
  jobCategory: '',
};

export function Coffee() {
  console.log(111);
  const pageNum = JSON.parse(localStorage.getItem('page'));
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const prevKeyword = JSON.parse(localStorage.getItem('keyword'));
  const [검색어, set검색어] = useState(prevKeyword || '');
  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('커피챗 정보 불러오는 중..');
  const { coffeeData } = useFetchCoffeeData(currentPage, sortData, 검색어);
  const { jobCategories } = useFetchJobCategories();

  const handleSortDataChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundTxt('커피챗 정보가 없습니다.');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <HeaderWithSearchBar
        isSearchBarTrue={true}
        searchOptions={['제목']}
        검색어={검색어}
        set검색어={set검색어}
      />
      <FiltersAndButton
        sortData={sortData}
        onChange={handleSortDataChange}
        kindOfJd={jobCategories}
      />
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 ? (
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item} kindOfJd={jobCategories} />
            </Grid>
          ))
        ) : (
          <Typography sx={foundTxtStyle}>{foundTxt}</Typography>
        )}
      </Grid>
      {coffeeData?.content?.length > 0 && (
        <Box sx={listContainer}>
          <Stack justifyContent="center" alignItems="center">
            <PaginationComponent
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
