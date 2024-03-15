import { Container, TextField, InputAdornment, NativeSelect } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchTextFiled } from './SearchBarStyles';
import { useState } from 'react';

function SearchBar({ keyword, searchOptions, onChange, onKeyDown }) {
  const [menuTitle, setMenuTitle] = useState(searchOptions[0]);

  const selectionChangeHandler = (event) => {
    setMenuTitle(event.target.value);
  };
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
          startAdornment: searchOptions ? (
            <NativeSelect
              disableUnderline
              defaultValue={menuTitle}
              value={menuTitle}
              onChange={selectionChangeHandler}
              sx={{
                color: 'rgba(0, 0, 0, 0.54);',
                width: '90px',
                fontSize: '14px',
                '& .MuiInputBase-input': {
                  paddingX: '10px',
                },
              }}>
              <option value={1} style={{ color: 'rgba(0, 0, 0, 0.54);' }}>
                {searchOptions[0]}
              </option>
            </NativeSelect>
          ) : (
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
