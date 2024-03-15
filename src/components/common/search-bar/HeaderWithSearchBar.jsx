import SearchBar from 'components/common/search-bar/SearchBar';
import logo from 'assets/images/logo.svg';
import { useState } from 'react';

function HeaderWithSearchBar({ setSelectedChip, isSearchBarTrue = true, searchOptions }) {
  const [search, setSearch] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      setSelectedChip((prev) => ({
        ...prev,
        keyword: e.target.value,
        userSelected: true,
      }));
    }
  };

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
          onKeyDown={handleKeyDown}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default HeaderWithSearchBar;
