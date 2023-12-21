import React from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchTextFiled } from "./SearchBarStyles";

export function SearchBar() {
  return (
    <Container maxWidth="md">
      <TextField
        fullWidth
        sx={SearchTextFiled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="검색어를 입력하세요"
      />
    </Container>
  );
}
