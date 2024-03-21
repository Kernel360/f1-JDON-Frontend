import { useEffect, useState } from 'react';

import { videoContainer } from 'pages/mainpage/style';

import { Box } from '@mui/material';

import DataNone from '../DataNone';
import VideoList from './VideoList';
import VideoTitle from './VideoTitle';

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

  let keyword = selectedChip.keyword;
  if (selectedChip.keyword?.length > 10) {
    keyword = `${selectedChip.keyword.substring(0, 15)}...`;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <VideoTitle keyword={keyword} />
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
