import { Box, Typography } from '@mui/material';

function DataNone({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '100px 0',
      }}>
      <Typography
        sx={{
          fontSize: '16px',
          color: '#B9B9B9',
          fontWeight: 600,
          textAlign: 'center',
        }}>
        {children}
      </Typography>
    </Box>
  );
}

export default DataNone;
