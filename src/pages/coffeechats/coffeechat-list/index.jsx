import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import BottomNav from 'components/common/BottomNav';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import { useEffect, useState } from 'react';
import { getJobCategory } from 'api/api';
import PaginationComponent from 'components/common/Pagenation';
import { useRecoilState } from 'recoil';
import { kindOfJdState } from 'recoil/atoms';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import FiltersAndButton from './FiltersAndButton';
import { foundTxtStyle, listContainer } from '../style';
import useFetchCoffeeData from '../hooks/useFetchCoffeeData';
const defaultSortData = {
  sort: 'createdDate',
  jobCategory: '',
};

export function Coffee() {
  const pageNum = JSON.parse(localStorage.getItem('page'));
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [kindOfJd, setKindOfJd] = useRecoilState(kindOfJdState);
  const [searchKeyword, setSearchKeyword] = useState('');
  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('커피챗 정보 불러오는 중..');
  const { coffeeData, fetchCoffeeData } = useFetchCoffeeData(currentPage, sortData, searchKeyword);

  const handleChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const fetchJobCategories = async (setKindOfJd) => {
    try {
      const { jobGroupList } = await getJobCategory();
      setKindOfJd(jobGroupList[0].jobCategoryList);
    } catch (error) {
      console.error('Error fetching job categories:', error);
    }
  };

  useEffect(() => {
    fetchJobCategories(setKindOfJd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        keyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        fetchData={fetchCoffeeData}
      />
      <FiltersAndButton sortData={sortData} onChange={handleChange} kindOfJd={kindOfJd} />
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 ? (
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item} kindOfJd={kindOfJd} />
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
