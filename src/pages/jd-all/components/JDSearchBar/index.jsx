import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import FiltersAndButton from './FiltersAndButton';
import useJDSearchBar from 'pages/jd-all/hooks/useJDSearchBar';

function JDSearchBar() {
  const { keyword, setKeyword, sortData, jobCategories, handleSortDataChange } = useJDSearchBar();

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
