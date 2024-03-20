import { Container, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { SearchContainer, SearchResetBtn, SearchTextFiled } from './SearchBarStyles';
import SelectOption from './SelectOption';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchBar({ searchOptions, setSelectedChip, set검색어 }) {
  const { pathname } = useLocation();
  const prevKeyword = JSON.parse(localStorage.getItem('keyword')) || '';
  const [실시간키워드, set실시간키워드] = useState(prevKeyword || '');
  const placeholder = pathname === '/' ? '기술 키워드를 입력하세요' : '검색어를 입력하세요';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      // JD-ON, 커피챗 페이지
      if (searchOptions) {
        if (실시간키워드.length > 50) {
          alert('50자 미만의 키워드만 검색 가능합니다.');
          return;
        }
        set검색어(실시간키워드);
        return;
      }

      // 메인페이지
      if (실시간키워드.length > 20) {
        alert('20자 미만의 키워드만 검색 가능합니다.');
        return;
      }
      setSelectedChip((prev) => ({
        ...prev,
        keyword: e.target.value,
        userSelected: true,
      }));
    }
  };

  const keywordResetHandler = () => {
    set실시간키워드('');
  };

  return (
    <Container maxWidth="md" sx={SearchContainer}>
      <TextField
        fullWidth
        value={실시간키워드}
        placeholder={placeholder}
        onChange={(e) => {
          set실시간키워드(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        sx={SearchTextFiled}
        InputProps={{
          startAdornment: searchOptions ? (
            <SelectOption searchOptions={searchOptions} useCompanyName={pathname === '/jds'} />
          ) : (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#BCBCC4' }} />
            </InputAdornment>
          ),
          endAdornment: 실시간키워드.length > 0 && (
            <IconButton aria-label="delete" size="small" onClick={keywordResetHandler}>
              <CancelIcon />
            </IconButton>
          ),
        }}
      />
      <Box sx={SearchResetBtn}>
        {searchOptions
          ? 실시간키워드.length > 50
            ? '검색어는 50자 이하여야 합니다.'
            : ''
          : 실시간키워드.length > 20
            ? '검색어는 20자 이하여야 합니다.'
            : ''}
      </Box>
    </Container>
  );
}

export default SearchBar;
