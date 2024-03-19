import { Box } from '@mui/material';
import VideoTitle from './VideoTitle';
import VideoList from './VideoList';
import { videoContainer } from 'pages/mainpage/style';
import { useEffect, useState } from 'react';
import DataNone from '../DataNone';

function VideoSection({ loading, selectedChip, data }) {
  const [isDataNone, setIsDataNone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataNone(true);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Box sx={{ mt: 4 }}>
      <VideoTitle keyword={selectedChip.keyword} />
      <Box display="flex">
        <Box sx={videoContainer}>
          {data.length > 0 ? (
            <VideoList loading={loading} data={data} />
          ) : (
            <DataNone>{isDataNone && '관련된 영상 정보가 존재하지 않습니다.'}</DataNone>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default VideoSection;