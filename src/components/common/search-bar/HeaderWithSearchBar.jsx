import SearchBar from 'components/common/search-bar';
import logo from 'assets/images/logo.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderWithSearchBar({
  setSelectedChip,
  searchOptions,
  set검색어,
  검색어,
  isSearchBarTrue = true,
}) {
  const navigate = useNavigate();

  const imgHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('keyword', JSON.stringify(검색어 || ''));
  }, [검색어]);

  return (
    <>
      <div onClick={imgHandler} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="logo" width={80} style={{ height: 50, marginTop: 10 }} />
      </div>
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
