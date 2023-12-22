import React from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchTextFiled } from "./SearchBarStyles";

export function SearchBar() {
  return (
    <Container
      maxWidth="md"
      fullWidth
      sx={{
        padding: "0 !important",
      }}
    >
      <TextField
        fullWidth
        sx={SearchTextFiled(1)}
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
