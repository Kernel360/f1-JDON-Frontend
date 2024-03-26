import hot from 'assets/images/hot.svg';
import { titleStyle } from 'pages/mainpage/style';
import { MainStyles } from 'pages/PageStyles';

import { Typography } from '@mui/material';

const VideoTitle = ({ keyword }) => (
  <Typography sx={MainStyles.TypoGraphy}>
    <Typography sx={titleStyle}>{keyword}</Typography>
    추천 학습 영상
    <img src={hot} alt="hot" />
  </Typography>
);
export default VideoTitle;
