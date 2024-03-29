import { Container } from '@mui/material';
import BottomNav from 'components/common/footer/BottomNav';
import JDComponent from './components/JDComponent';
import JDSearchBar from './components/JDSearchBar';
import useJDSearchBar from './hooks/useJDSearchBar';

function JdAll() {
  const { keyword, setKeyword, sortData, jobCategories, handleSortDataChange } = useJDSearchBar();
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      {/* 로고 + 상단 검색바 */}
      <JDSearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        sortData={sortData}
        jobCategories={jobCategories}
        handleSortDataChange={handleSortDataChange}
      />
      {/* 채용공고 컴포넌트 & 페이지네이션 */}
      <JDComponent keyword={keyword} sortData={sortData} />
      {/* 하단 Navbar */}
      <BottomNav />
    </Container>
  );
}

export default JdAll;
