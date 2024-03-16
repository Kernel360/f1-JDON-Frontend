import { Container } from '@mui/material';
import BottomNav from 'components/common/BottomNav';
import JDComponent from './components/JDComponent';
import JDSearchBar from './components/JDSearchBar';

function JdAll() {
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      {/* 로고 + 상단 검색바 */}
      <JDSearchBar />
      {/* 채용공고 컴포넌트 & 페이지네이션 */}
      <JDComponent />
      {/* 하단 Navbar */}
      <BottomNav />
    </Container>
  );
}

export default JdAll;
