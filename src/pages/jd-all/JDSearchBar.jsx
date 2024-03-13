import { useState } from 'react';
import SearchBar from '../../components/common/search-bar/SearchBar';
import { useSetRecoilState } from 'recoil';
import { jdSearchValue } from '../../recoil/atoms';

function JDSearchBar() {
  const [search, setSearch] = useState('');
  const setSearchVal = useSetRecoilState(jdSearchValue);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      setSearchVal(search);
    }
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };
  return (
    <>
      <SearchBar keyword={search} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
    </>
  );
}

export default JDSearchBar;
