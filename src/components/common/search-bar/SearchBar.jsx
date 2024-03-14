import { Container, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchTextFiled } from './SearchBarStyles';

function SearchBar({ keyword, onChange, onKeyDown }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: '0 !important',
        '& .MuiInputBase-input': {
          padding: '12px',
        },
      }}>
      <TextField
        fullWidth
        value={keyword}
        sx={SearchTextFiled(1)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#BCBCC4' }} />
            </InputAdornment>
          ),
        }}
        placeholder="검색어를 입력하세요"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </Container>
  );
}

export default SearchBar;
