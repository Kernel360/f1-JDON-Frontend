import { infoTitle } from 'components/coffeechats/create/styles';

import { Box } from '@mui/material';

function InfoItemWrapper({ title, children }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <div style={infoTitle}>{title}</div>
      {children}
    </Box>
  );
}
export default InfoItemWrapper;
