import React from 'react';

import { InfoItemStyle } from '../styles';

const { Box } = require('@mui/material');

function CoffeeInfoItem({ icon, iconColor, text }) {
  return (
    <Box sx={InfoItemStyle}>
      {React.cloneElement(icon, {
        sx: { fontSize: 'small', color: iconColor },
      })}
      {text}
    </Box>
  );
}
export default CoffeeInfoItem;
