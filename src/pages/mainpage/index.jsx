import React, { Suspense, useRef } from 'react';

import BottomNav from 'components/common/footer/BottomNav';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';

import { Container } from '@mui/material';

import SubmitBug from './components/SubmitBug';
import StickyTabSection from './components/tab/StickyTabSection';
import SkeletonVideoSection from './components/video-section/SkeletonVideoSection';
import { useLoadData } from './hooks/useLoadData';

const CompanySection = React.lazy(() => import('./components/company-section'));
const VideoSection = React.lazy(() => import('./components/video-section'));

export function Main() {
  const { loading, selectedChip, setSelectedChip, lectureList, jdList } = useLoadData();
  const topRef = useRef(null);

  return (
    <div ref={topRef}>
      <Container maxWidth="md" sx={{ pb: 10, position: 'relative' }}>
        <HeaderWithSearchBar setSelectedChip={setSelectedChip} searchOptions={false} />
        <StickyTabSection selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
        <Suspense fallback={<SkeletonVideoSection />}>
          <VideoSection loading={loading} selectedChip={selectedChip} data={lectureList} />
        </Suspense>
        <Suspense fallback={<SkeletonVideoSection />}>
          <CompanySection loading={loading} selectedChip={selectedChip} data={jdList} />
        </Suspense>
        <SubmitBug />
        <BottomNav />
      </Container>
    </div>
  );
}
