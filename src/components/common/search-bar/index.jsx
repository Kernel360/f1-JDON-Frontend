import { Container, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContainer, SearchTextFiled } from './SearchBarStyles';
import SelectOption from './SelectOption';
import { useState } from 'react';

function SearchBar({ searchOptions, setSelectedChip, set검색어 }) {
  const [실시간키워드, set실시간키워드] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (searchOptions) {
        set검색어(실시간키워드);
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
        value={실시간키워드}
        placeholder="검색어를 입력하세요"
        onChange={(e) => {
          set실시간키워드(e.target.value);
        }}
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
