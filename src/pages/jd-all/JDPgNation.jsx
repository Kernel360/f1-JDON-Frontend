import { Stack } from "@mui/material";
import React, { useState } from "react";
import PaginationComponent from "../../components/common/Pagenation";

function JDPgNation() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
      <PaginationComponent
        pageCount={10}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </Stack>
  );
}

export default JDPgNation;
