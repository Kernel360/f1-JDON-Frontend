import VideoCard from 'components/common/card/VideoCard';

import { Grid } from '@mui/material';

import SkeletonVideoSection from './SkeletonVideoSection';

const VideoList = ({ loading, data }) => {
  const handleError = (error) => {
    alert(`오류 발생: ${error.message}`);
  };
  if (loading) {
    return <SkeletonVideoSection />;
  }

  return (
    <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
      {data.map((video, index) => (
        <Grid item xs={12} sm={4} md={4} key={video.lectureId}>
          <VideoCard key={index} data={video} onError={handleError} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoList;
