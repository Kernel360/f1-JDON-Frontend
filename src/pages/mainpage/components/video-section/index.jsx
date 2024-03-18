import { Box } from '@mui/material';
import VideoTitle from './VideoTitle';
import VideoList from './VideoList';
import SkeletonVideoSection from './SkeletonVideoSection';
import { videoContainer } from 'pages/mainpage/style';

function VideoSection({ loading, selectedChip, data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <VideoTitle keyword={selectedChip.keyword} />
      <Box display="flex">
        <Box sx={videoContainer}>
          {loading ? <SkeletonVideoSection /> : <VideoList data={data} />}
        </Box>
      </Box>
    </Box>
  );
}
export default VideoSection;
