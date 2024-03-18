import SearchBar from 'components/common/search-bar';
import logo from 'assets/images/logo.svg';
import { useEffect } from 'react';

function HeaderWithSearchBar({
  setSelectedChip,
  searchOptions,
  set검색어,
  검색어,
  isSearchBarTrue = true,
}) {
  useEffect(() => {
    검색어 && localStorage.setItem('keyword', JSON.stringify(검색어));
  }, [검색어]);

  return (
    <>
      <img src={logo} alt="logo" width={80} style={{ height: 50, marginTop: 10 }} />
      {isSearchBarTrue ? (
        <SearchBar
          검색어={검색어}
          set검색어={set검색어}
          searchOptions={searchOptions}
          setSelectedChip={setSelectedChip}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default HeaderWithSearchBar;
