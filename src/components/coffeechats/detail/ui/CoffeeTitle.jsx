import { Typography } from '@mui/material';

import { TitleStyle } from '../styles';

function CoffeeTitle({ title }) {
  return <Typography sx={TitleStyle}>{title}</Typography>;
}
export default CoffeeTitle;
