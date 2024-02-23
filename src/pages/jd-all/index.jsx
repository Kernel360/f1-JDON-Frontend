import React from "react";
import { Container } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import Header from "./header";
import Body from "./body";

function JdAll() {
  return (
    <Container maxWidth="md">
      {/* 상단 검색바 */}
      <Header />
      {/* 공고 내역 컴포넌트 & 페이지네이션 */}
      <Body />
      {/* 하단 Navbar */}
      <BottomNav />
    </Container>
  );
}

export default JdAll;
