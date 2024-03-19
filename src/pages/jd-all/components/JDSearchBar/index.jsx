import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import FiltersAndButton from './FiltersAndButton';

function JDSearchBar({ keyword, setKeyword, sortData, jobCategories, handleSortDataChange }) {
  return (
    <>
      <HeaderWithSearchBar
        isSearchBarTrue={true}
        searchOptions={['제목']}
        검색어={keyword}
        set검색어={setKeyword}
      />
      <FiltersAndButton
        sortData={sortData}
        onChange={handleSortDataChange}
        kindOfJd={jobCategories}
      />
    </>
  );
}

export default JDSearchBar;
