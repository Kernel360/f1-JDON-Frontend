import { Typography } from '@mui/material';
import { MainStyles } from 'pages/PageStyles';
import { titleStyle } from 'pages/mainpage/style';
import hot from 'assets/images/hot.svg';

const VideoTitle = ({ keyword }) => (
  <Typography sx={MainStyles.TypoGraphy}>
    <Typography sx={titleStyle}>{keyword}</Typography>
    추천 학습 영상
    <img src={hot} alt="hot" />
  </Typography>
);
export default VideoTitle;
