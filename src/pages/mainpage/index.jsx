import { Container } from '@mui/material';
import React, { Suspense, useRef } from 'react';
import BottomNav from 'components/common/BottomNav';
import HeaderWithSearchBar from 'components/common/search-bar/HeaderWithSearchBar';
import { useLoadData } from './hooks/useLoadData';
import StickyTabSection from './components/tab/StickyTabSection';
import ScrollToTop from './components/ScrollToTop';
import SubmitBug from './components/SubmitBug';
import SkeletonVideoSection from './components/video-section/SkeletonVideoSection';
import DeferredComponent from 'components/DeferredComponent';
const CompanySection = React.lazy(() => import('./components/company-section'));
const VideoSection = React.lazy(() => import('./components/video-section'));

export function Main() {
  const { loading, selectedChip, setSelectedChip, lectureList, jdList } = useLoadData();
  const topRef = useRef(null);

  return (
    <div ref={topRef}>
      <Container maxWidth="md" sx={{ pb: 10, position: 'relative' }}>
        <HeaderWithSearchBar setSelectedChip={setSelectedChip} searchOptions={false} />
        <ScrollToTop topRef={topRef} />
        <StickyTabSection selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
        <Suspense
          fallback={
            <DeferredComponent>
              <SkeletonVideoSection />
            </DeferredComponent>
          }>
          <VideoSection loading={loading} selectedChip={selectedChip} data={lectureList} />
        </Suspense>
        <CompanySection selectedChip={selectedChip} data={jdList} />
        <SubmitBug />
        <BottomNav />
      </Container>
    </div>
  );
}
