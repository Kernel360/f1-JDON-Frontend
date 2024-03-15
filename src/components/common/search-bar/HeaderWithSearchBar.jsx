import SearchBar from 'components/common/search-bar';
import logo from 'assets/images/logo.svg';
import { useState } from 'react';

function HeaderWithSearchBar({
  setSelectedChip,
  searchOptions,
  setSearchKeyword,
  keyword,
  fetchData,
  isSearchBarTrue = true,
}) {
  const [search, setSearch] = useState(keyword);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  return (
    <>
      <img src={logo} alt="logo" width={80} style={{ height: 50, marginTop: 10 }} />
      {isSearchBarTrue ? (
        <SearchBar
          keyword={search}
          onChange={handleSearchChange}
          searchOptions={searchOptions}
          setSearchKeyword={setSearchKeyword}
          setSelectedChip={setSelectedChip}
          fetchData={fetchData}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default HeaderWithSearchBar;
