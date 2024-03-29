import useSearch
  from 'components/coffeechats/list-coffeechats/queryHooks/useSearch';
import useSort
  from 'components/coffeechats/list-coffeechats/queryHooks/useSort';
import CoffeeListComponent
  from 'components/coffeechats/list-coffeechats/ui/CoffeeListComponent';
import FiltersAndButton
  from 'components/coffeechats/list-coffeechats/ui/FiltersAndButton';
import BottomNav from 'components/common/footer/BottomNav';
import HeaderWithSearchBar
  from 'components/common/search-bar/HeaderWithSearchBar';

import { Container } from '@mui/material';

function CoffeeListPage() {
  const { sortData, handleSortDataChange } = useSort();
  const { 검색어, set검색어 } = useSearch();
  const jobCategories = JSON.parse(localStorage.getItem('jobCategories'));

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
      <CoffeeListComponent jobCategories={jobCategories} sortData={sortData} 검색어={검색어} />
      <BottomNav />
    </Container>
  );
}

export default CoffeeListPage;
