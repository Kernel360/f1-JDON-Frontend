import { titleStyle } from 'pages/mainpage/style';
import { MainStyles } from 'pages/PageStyles';

import { Typography } from '@mui/material';

const CompanyTitle = ({ keyword }) => {
  if (keyword.length > 10) {
    keyword = `${keyword.substring(0, 15)}...`;
  }

  return (
    <Typography sx={MainStyles.TypoGraphy}>
      <Typography sx={titleStyle}>{keyword}</Typography>에 관심있는 회사는 여기에요!
    </Typography>
  );
};
export default CompanyTitle;
