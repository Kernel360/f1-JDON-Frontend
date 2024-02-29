import { Box, Typography } from '@mui/material';

function JdBanner() {
  return (
    <Box
      sx={{
        background: '#F5F2F2',
        borderRadius: '10px',
        py: 3.5,
        mb: 3,
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          ml: 3,
          color: '#30190B',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: 2,
        }}
      >
        <span style={{ fontSize: '16px' }}>💡</span> 관심있는 회사를 키워드로 찾아보세요!
      </Typography>
    </Box>
  );
}

export default JdBanner;
