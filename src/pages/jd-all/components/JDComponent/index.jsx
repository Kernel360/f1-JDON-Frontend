import { Stack } from '@mui/material';
import PaginationComponent from 'components/common/pagenation/Pagenation';
import useJDComponents from 'pages/jd-all/hooks/useJDComponents';
import SkeletonLoader from 'components/common/loading/skeleton/company-card/SkeletonLoader';
import { Suspense, lazy } from 'react';
const JDGird = lazy(() => import('./JDGird'));

function JDComponent({ keyword, sortData }) {
  const { jobData, foundTxt, currentPage, handlePageChange, loading } = useJDComponents(
    keyword,
    sortData,
  );

  return (
    <>
      {/* JDGrid 컴포넌트 */}
      <Suspense fallback={<SkeletonLoader count={12} />}>
        <JDGird jobData={jobData} foundTxt={foundTxt} loading={loading} />
      </Suspense>

      {/* 페이지네이션 컴포넌트 */}
      <Stack justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <PaginationComponent
          pageCount={jobData?.pageInfo.totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}

export default JDComponent;
