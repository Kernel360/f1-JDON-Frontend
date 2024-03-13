import { Box } from '@mui/material';
import { infoItemStyle } from './CoffeeChatCardStyle';

function CoffeeInfoItem({ Icon, text, color }) {
  return (
    <Box sx={infoItemStyle}>
      <Icon sx={{ fontSize: 'small', color }} /> {text}
    </Box>
  );
}
export default CoffeeInfoItem;
