import React from "react";
import { Container } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import JDSearchBar from "./JDSearchBar";
import JDComponent from "./JDComponent";
import JDPageNation from "./JDPgNation";
import CommonHeader from "../../components/common/Header";
function JdAll() {
  return (
    <Container maxWidth="md">
      {/* 헤더 (뒤로가기) */}
      <CommonHeader title={'메인 페이지'}/>
      {/* 상단 검색바 */}
      <JDSearchBar />
      {/* 공고 내역 컴포넌트 */}
      <JDComponent />
      {/* 페이지네이션 컴포넌트 (추후 삭제되거나 수정될듯함!)*/}
      <JDPageNation />
      {/* 하단 Navbar */}
      <BottomNav />
    </Container>
  );
}

export default JdAll;
