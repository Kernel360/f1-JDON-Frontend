import { Typography } from '@mui/material';
import { MainStyles } from 'pages/PageStyles';
import { titleStyle } from 'pages/mainpage/style';

const CompanyTitle = ({ keyword }) => (
  <Typography sx={MainStyles.TypoGraphy}>
    <Typography sx={titleStyle}>{keyword}</Typography>에 관심있는 회사는 여기에요!
  </Typography>
);
export default CompanyTitle;
