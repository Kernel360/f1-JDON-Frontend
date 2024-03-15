import SearchBar from 'components/common/search-bar';
import logo from 'assets/images/logo.svg';

function HeaderWithSearchBar({
  setSelectedChip,
  searchOptions,
  set검색어,
  검색어,
  isSearchBarTrue = true,
}) {
  // const [search, setSearch] = useState(검색어);

  // const handleSearchChange = (e) => {
  //   const newSearch = e.target.value;
  //   set검색어(newSearch);
  // };

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
