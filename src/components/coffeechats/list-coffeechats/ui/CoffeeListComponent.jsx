import { useState } from 'react';

import useFetchCoffeeData
  from 'components/coffeechats/list-coffeechats/queryHooks/useFetchCoffeeData';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import Loading from 'components/common/loading/Loading';

import { Grid } from '@mui/material';

import CoffeePagenation from './CoffeePagenation';

function CoffeeListComponent({ jobCategories, sortData, 검색어 }) {
  const pageNum = JSON.parse(localStorage.getItem('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageNum);
  const { coffeeData, isLoading } = useFetchCoffeeData(currentPage, sortData, 검색어);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 &&
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item} kindOfJd={jobCategories} />
            </Grid>
          ))}
      </Grid>
      <CoffeePagenation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        coffeeData={coffeeData}
      />
    </>
  );
}
export default CoffeeListComponent;