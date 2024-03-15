import { Container, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContainer, SearchTextFiled } from './SearchBarStyles';
import SelectOption from './SelectOption';

function SearchBar({
  keyword,
  searchOptions,
  onChange,
  fetchData,
  setSelectedChip,
  setSearchKeyword,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (searchOptions) {
        setSearchKeyword(e.target.value);
        fetchData(1);
        return;
      }
      setSelectedChip((prev) => ({
        ...prev,
        keyword: e.target.value,
        userSelected: true,
      }));
    }
  };

  return (
    <Container maxWidth="md" sx={SearchContainer}>
      <TextField
        fullWidth
        value={keyword}
        placeholder="검색어를 입력하세요"
        onChange={(e) => onChange(e)}
        onKeyDown={handleKeyDown}
        sx={SearchTextFiled}
        InputProps={{
          startAdornment: searchOptions ? (
            <SelectOption searchOptions={searchOptions} />
          ) : (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#BCBCC4' }} />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

export default SearchBar;
