import React from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchTextFiled } from "./SearchBarStyles";

function SearchBar() {
  return (
    <Container
      maxWidth="md"
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
              <SearchIcon sx={{ color: "#BCBCC4" }} />
            </InputAdornment>
          ),
        }}
        placeholder="검색어를 입력하세요"
      />
    </Container>
  );
}

export default SearchBar;
