import React from "react";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

export default function PaginationComponent({
  pageCount,
  currentPage,
  onChange,
}) {
  //  const handleChange = (event, value) => {
  //    // 페이지 변경 시 처리할 로직 추가
  //    console.log(`현재 페이지: ${value}`);
  //  };
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center", // 수직 가운데 정렬
      }}
    >
      <Pagination
        count={pageCount} // 전체 페이지 수
        page={currentPage} // 현재 페이지
        onChange={onChange} // 페이지 변경 이벤트 핸들러
        variant="outlined"
        color="primary"
        // renderItem={(item) => (
        //   <PaginationItem
        //     {...item}
        //     component={Link}
        //     to={`/page/${item.page}`}
        //   />
        // )}
      />
    </Container>
  );
}
