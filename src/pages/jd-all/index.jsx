import React from 'react';
import { Container } from '@mui/material';
import BottomNav from '../../components/common/BottomNav';
// import JDSearchBar from './JDSearchBar';
import JDComponent from './JDComponent';
// import CommonHeader from '../../components/common/Header';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
function JdAll() {
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      {/* 헤더베너 (로고) */}
      <HeaderWithSearchBar isSearchBarTrue={false} />
      {/* 상단 검색바 (현재 비활성화, 추후 활성화 예정.)*/}
      {/* <JDSearchBar /> */}
      {/* 공고 내역 컴포넌트 & 페이지네이션 */}
      <JDComponent />
      {/* 하단 Navbar */}
      <BottomNav />
    </Container>
  );
}

export default JdAll;
