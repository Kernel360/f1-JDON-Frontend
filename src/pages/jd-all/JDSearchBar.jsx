import React, { useState } from 'react'
import SearchBar from '../../components/common/search-bar/SearchBar';

function JDSearchBar({ setSelectedChip }) {
    const [search, setSearch] = useState("");

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
        setSelectedChip((prev) => ({
          ...prev,
          keyword: e.target.value,
          userSelected: true,
        }));
      }
    };
  
    const handleSearchChange = (e) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
    };
    return (
      <>
        <SearchBar
          keyword={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </>
    );
  }

export default JDSearchBar
